import PyPDF2
import docx

def read_document(file):
    text = ""

    if file.name.endswith(".pdf"):
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() or ""

    elif file.name.endswith(".docx"):
        doc = docx.Document(file)
        for p in doc.paragraphs:
            text += p.text + "\n"

    elif file.name.endswith(".txt"):
        text = file.read().decode("utf-8")

    return text[:3500]
