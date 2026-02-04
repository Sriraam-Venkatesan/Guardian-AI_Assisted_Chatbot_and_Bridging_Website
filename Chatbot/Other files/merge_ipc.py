import json
import os

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

try:
    # Load main file
    if os.path.exists('acts/ipc.json'):
        main_ipc = load_json('acts/ipc.json')
    else:
        main_ipc = {}
    print(f"Main IPC loaded: {len(main_ipc)} sections")

    # Load extensions
    parts = ['acts/ipc_extension_part1.json', 'acts/ipc_extension_part2.json', 'acts/ipc_extension_part3.json']
    
    total_added = 0
    for part in parts:
        if os.path.exists(part):
            data = load_json(part)
            count = len(data)
            print(f"Loading {part}: {count} sections")
            main_ipc.update(data)
            total_added += count
        else:
            print(f"Warning: {part} not found")

    # Save merged file
    save_json('acts/ipc.json', main_ipc)
    print(f"Successfully merged. Total sections now: {len(main_ipc)}")

    # Verify key sections exists
    check_sections = ["420", "378", "376", "124A", "304B"]
    print("\nVerifying key sections:")
    for sec in check_sections:
        if sec in main_ipc:
            print(f"✅ Section {sec} found: {main_ipc[sec]['title']}")
        else:
            print(f"❌ Section {sec} NOT FOUND")

except Exception as e:
    print(f"Error: {e}")
