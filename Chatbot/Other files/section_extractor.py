import re

def extract_ipc_section(query: str) -> str:
    """
    Extracts IPC section number from user query.
    Handles formats: "Section 302", "IPC 302", "302", "ipc 302"
    """
    # Normalize input
    query = query.lower().strip()
    
    # Pattern 1: Explicit "Section" or "IPC" followed by number
    match = re.search(r'\b(section|ipc)\s*(\w+)', query)
    if match:
        return match.group(2)
        
    # Pattern 2: Just a number (if it looks like a section query)
    # If the query is ONLY a number
    if re.fullmatch(r'\d+[a-zA-Z]*', query):
        return query
        
    # Pattern 3: Number inside the text if keywords present
    # Additional robust check for something like "tell me about 302"
    match = re.search(r'\b(\d+[a-zA-Z]*)\b', query)
    if match and ("tell" in query or "about" in query or "punishment" in query):
        return match.group(1)

    return None
