import json
import os

def load_section(act_name, section_number):
    """
    Load a specific section from the act JSON.
    """
    path = f"acts/{act_name}.json"
    if not os.path.exists(path):
        return None

    with open(path, "r", encoding="utf-8") as f:
        act_data = json.load(f)
        return act_data.get(str(section_number))
