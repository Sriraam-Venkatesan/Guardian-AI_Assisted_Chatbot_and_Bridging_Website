# language_utils.py
import re

# ----------------- Common words for Romanized detection -----------------
HINGLISH_WORDS = [
    "kya", "hai", "tum", "main", "mera", "nahi", "kaise", "kahan", "kyun", "ho", "raha", "gaya"
]

TANGLISH_WORDS = [
    "enna", "irukku", "vaanga", "sollu", "poi", "adi", "vandhu", "kanna", "thaan", "pudi"
]

TELUGU_ROMAN_WORDS = [
    "emi", "cheppu", "vachindi", "chusara", "nenu", "meeru", "ledu"
]

def detect_language(text: str) -> str:
    """
    Detect Indian language from text.
    Returns ISO-like code or Hinglish/Tanglish.
    """
    text = text.lower()

    # ---------------- Native script detection ----------------
    if re.search(r'[\u0900-\u097F]', text):
        return "hi"  # Hindi / Devanagari
    if re.search(r'[\u0B80-\u0BFF]', text):
        return "ta"  # Tamil
    if re.search(r'[\u0C00-\u0C7F]', text):
        return "te"  # Telugu
    if re.search(r'[\u0C80-\u0CFF]', text):
        return "kn"  # Kannada
    if re.search(r'[\u0D00-\u0D7F]', text):
        return "ml"  # Malayalam
    if re.search(r'[\u0980-\u09FF]', text):
        return "bn"  # Bengali
    if re.search(r'[\u0A00-\u0A7F]', text):
        return "pa"  # Punjabi
    if re.search(r'[\u0900-\u097F]', text):
        return "mr"  # Marathi
    if re.search(r'[\u0A80-\u0AFF]', text):
        return "gu"  # Gujarati
    if re.search(r'[\u0B00-\u0B7F]', text):
        return "or"  # Odia
    if re.search(r'[\u0980-\u098F]', text):
        return "as"  # Assamese

    # ---------------- Romanized detection ----------------
    words = re.findall(r'\b\w+\b', text)
    hinglish_count = sum(1 for w in words if w in HINGLISH_WORDS)
    tanglish_count = sum(1 for w in words if w in TANGLISH_WORDS)
    telugu_roman_count = sum(1 for w in words if w in TELUGU_ROMAN_WORDS)

    counts = {
        "Hinglish": hinglish_count,
        "Tanglish": tanglish_count,
        "TeluguRoman": telugu_roman_count
    }

    max_lang = max(counts, key=counts.get)
    if counts[max_lang] > 1:  # at least 2 words detected
        return max_lang

    # ---------------- Default ----------------
    return "en"  # fallback English
