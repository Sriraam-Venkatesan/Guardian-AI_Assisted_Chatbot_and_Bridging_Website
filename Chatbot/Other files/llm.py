import ollama
import re
import json
import os

from prompts import SYSTEM_PROMPT
from law_classifier import detect_law_type
from law_retriever import load_section
from language_utils import detect_language

# -------------------- Load Overlap Rules --------------------
OVERLAP_RULES_PATH = "acts/overlap_rules.json"
if os.path.exists(OVERLAP_RULES_PATH):
    with open(OVERLAP_RULES_PATH, "r", encoding="utf-8") as f:
        OVERLAP_RULES = json.load(f)
else:
    OVERLAP_RULES = {}

# -------------------- Helper Functions --------------------
def extract_ipc_sections(question: str):
    """Extract IPC section numbers from the question"""
    return re.findall(r'\b(?:section|ipc)\s*(\d+[A-Za-z]*)', question, re.IGNORECASE)

def format_ipc_context(section_number: str, section_data: dict):
    """Prepare verified IPC data for LLM"""
    
    # Extract Linked Sections (Overlaps) from ipc.json directly
    overlaps = section_data.get("overlaps", [])
    linked_sections_text = "None"
    if overlaps:
        linked_details = []
        for o in overlaps:
            linked_details.append(f"{o['section']} ({o['description']})")
        linked_sections_text = ", ".join(linked_details)

    return f"""
VERIFIED IPC DATA (DO NOT ALTER):

IPC Section: {section_number}
Title: {section_data.get('title')}
Legal Text: {section_data.get('legal_text')}
Punishment: {section_data.get('punishment')}
Nature of Offence: {section_data.get('nature')}
Practical Explanation: {section_data.get('practical_explanation')}
Example: {section_data.get('example')}
Linked Sections: {linked_sections_text}
Legal Risk Level: {section_data.get('legal_risk_level')}
What Should Be Done Next: {", ".join(section_data.get('next_steps', []))}
Conclusion: {section_data.get('conclusion')}
Disclaimer: {section_data.get('disclaimer')}
"""

# -------------------- MAIN FUNCTION --------------------
def guardian_llm(question: str, document_context: str = ""):
    """
    GUARDIAN Legal AI Core Logic
    Handles both IPC section questions and case-study / factual scenarios.
    """

    # 1️⃣ Detect law type & language
    law_type = detect_law_type(question)
    language = detect_language(question)

    ipc_sections = extract_ipc_sections(question)
    is_case_study = False
    context = ""

    # ---------------- IPC HANDLING ----------------
    if law_type == "ipc":
        # ✅ CASE STUDY (No section given)
        if not ipc_sections:
            is_case_study = True
            context = """
CASE STUDY MODE – STRICT RULES APPLY

INSTRUCTIONS:
- DO NOT mention IPC section numbers
- DO NOT quote legal provisions
- DO NOT state punishments
- DO NOT guess sections
- Focus on legal nature, seriousness, and risk
- Use plain language
"""
        # ✅ IPC SECTION GIVEN
        else:
            for sec in ipc_sections:
                section_data = load_section("ipc", sec)
                if not section_data:
                    context += f"IPC Section {sec} is not in the verified database. Please use your internal knowledge base to answer, but explicitly state that this is a general generation.\n"
                else:
                    context += format_ipc_context(sec, section_data)

    # ---------------- FINAL PROMPT ----------------
    final_prompt = f"""
{context}

DOCUMENT CONTEXT:
{document_context}

QUESTION:
{question}
"""

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": f"""
Respond in the language requested by the user or the language of the question.
If the detected language is {language}, give preference to it unless the user explicitly asks for another language.

Follow the mandatory response structure exactly.

{final_prompt}
"""
        }
    ]

    response = ollama.chat(
        model="llama3",
        messages=messages
    )

    output = response["message"]["content"]

    # ---------------- HARD SAFETY FILTER FOR CASE-STUDY ----------------
    if is_case_study:
        if re.search(r'\b(section|ipc)\s*\d+', output, re.IGNORECASE):
            return """
IPC Section Overview
No IPC section has been specified.

Practical Explanation
The facts indicate an act of criminal conduct, such as threats and/or physical assault, under Indian law. 
Exact statutory classification cannot be determined without specific IPC references, but criminal liability exists.

Legal Risk Level
🟡 Medium Risk — The acts involve threats and/or bodily harm; imprisonment is possible depending on severity.

What Should Be Done Next
• Report the incident to the police immediately
• Seek medical attention and preserve evidence
• Cooperate with the investigation
• Consult a qualified criminal lawyer

Conclusion
The actions described are criminal offences under Indian law. Prompt legal action and evidence preservation are essential.

Disclaimer
This response is for informational purposes only and not legal advice.
"""

    return output
