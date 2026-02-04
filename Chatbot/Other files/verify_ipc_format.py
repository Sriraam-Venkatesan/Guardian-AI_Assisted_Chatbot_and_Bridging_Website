from llm import format_ipc_context
from law_retriever import load_section
import json

# Manually load section 302 to see what it looks like
section_data = load_section("ipc", "302")
print("--- RAW JSON DATA ---")
print(json.dumps(section_data, indent=2))

# Format it using the updated function
formatted_text = format_ipc_context("302", section_data)
print("\n--- FORMATTED CONTEXT ---")
try:
    print(formatted_text)
except UnicodeEncodeError:
    print(formatted_text.encode('utf-8').decode('utf-8', 'ignore'))
