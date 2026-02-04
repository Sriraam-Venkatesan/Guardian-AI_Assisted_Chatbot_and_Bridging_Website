from flask import Flask, render_template, request, jsonify, session
import llm
import law_retriever
import section_extractor
import os
import google_gemini

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def home():
    if 'history' not in session:
        session['history'] = []
    # Keep last 5 for sidebar summary
    recent_history = session['history'][-5:] if len(session['history']) > 5 else session['history']
    return render_template('index.html', history=recent_history)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message")
    speed = data.get("speed", "Detailed")
    api_key = data.get("api_key", "")

    if not user_input:
        return jsonify({"response": "Please enter a question."})

    response_text = ""
    
    # 1. Fast Mode (Gemini)
    if speed == "Fast":
        server_api_key = os.environ.get("GOOGLE_API_KEY") 
        effective_api_key = api_key if api_key else server_api_key
        
        if effective_api_key:
            gemini_prompt = f"""
            You are a Legal Assistant Chatbot for Indian Law (IPC). 
            Response structure:
            1. IPC Section Overview
            2. Legal Provision
            3. Punishment
            4. Nature of Offence
            5. Practical Explanation
            6. Example
            7. Linked Sections
            8. Legal Risk Level
            9. What Should Be Done Next
            10. Conclusion
            11. Disclaimer: "This response is for informational purposes only..."
            
            User Query: {user_input}
            """
            response_text = google_gemini.fast_response(gemini_prompt, effective_api_key)
        else:
             response_text = "⚠️ Fast Mode requires a Google API Key. Please provide it in Settings or switch to Detailed Mode."

    # 2. Detailed Mode (Local LLM)
    else:
        # The local LLM logic handles section extraction and formatting
        response_text = llm.guardian_llm(user_input, "acts/ipc.json")

    # 3. Update History
    if 'history' not in session:
        session['history'] = []
    
    summary = user_input[:30] + "..." if len(user_input) > 30 else user_input
    session['history'].append({'summary': summary, 'user': user_input, 'bot': response_text})
    session.modified = True
    
    return jsonify({"response": response_text})

@app.route('/clear_history', methods=['POST'])
def clear_history():
    session.pop('history', None)
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
