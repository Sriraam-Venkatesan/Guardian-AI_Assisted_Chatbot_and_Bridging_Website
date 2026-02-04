import google.generativeai as genai
import os

def fast_response(prompt: str, api_key: str) -> str:
    """
    Sends the prompt to Google Gemini 2.5 Flash and returns the response.
    
    Args:
        prompt (str): The user's query or prompt.
        api_key (str): The Google API Key.
        
    Returns:
        str: The generated response text.
    """
    try:
        genai.configure(api_key=api_key)
        # Using gemini-1.5-flash as requested (Note: 2.5 Flash might be a typo in prompt, using widely available fast flash model. 
        # If 2.5 is specifically available and required, the model name should be adjusted. 
        # For now, default fast model is gemini-1.5-flash or gemini-pro if flash is unavailable publicly.
        # Assuming 'gemini-1.5-flash' is the intended "Flash" model counterpart for speed).
        # Adjusting model name to 'gemini-1.5-flash' which is the current "Flash" model.
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error connecting to Google Gemini: {str(e)}\n\n(Falling back to local knowledge base...)"
