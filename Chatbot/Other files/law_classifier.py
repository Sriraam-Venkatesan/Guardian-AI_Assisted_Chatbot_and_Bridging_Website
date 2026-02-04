def detect_law_type(question: str):
    q = question.lower()

    if "posco" in q or "child" in q:
        return "posco"
    if "sexual harassment" in q or "workplace" in q:
        return "sexual_harassment"
    if "ipc" in q or "offence" in q or "crime" in q:
        return "ipc"
    if "crpc" in q or "arrest" in q or "bail" in q:
        return "crpc"
    if "cpc" in q or "civil suit" in q:
        return "cpc"
    if "cyber" in q or "it act" in q:
        return "it_act"
    if "constitution" in q or "article" in q:
        return "constitution"
    if "contract" in q or "agreement" in q:
        return "contract_act"

    return "general_law"
