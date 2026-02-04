import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_chat(message, speed, api_key=""):
    url = f"{BASE_URL}/chat"
    payload = {
        "message": message,
        "speed": speed,
        "api_key": api_key
    }
    headers = {'Content-Type': 'application/json'}
    
    try:
        print(f"\n--- Testing Speed: {speed} ---")
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print("Response:", data.get("response")[:100] + "...") # Print first 100 chars
            return True
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

if __name__ == "__main__":
    print("WARNING: This script requires app.py to be running on port 5000 separately.")
    
    # 1. Test Detailed Mode (Local)
    test_chat("Tell me about IPC 302", "Detailed")

    # 2. Test Fast Mode (Gemini) - Expects Failure without API Key
    test_chat("Tell me about IPC 302", "Fast")
