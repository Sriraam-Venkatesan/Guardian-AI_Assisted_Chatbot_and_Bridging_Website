import uvicorn
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
import os
import logging

# Import the existing logic
from llm import guardian_llm

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Data model for chat request
class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("static/index.html", "r", encoding="utf-8") as f:
        return f.read()

# CHANGED: Removed 'async' to make this a standard def.
# FastAPI runs standard def path operations in a threadpool, 
# which prevents the synchronous guardian_llm call from blocking the event loop.
@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        user_message = request.message
        logger.info(f"Received message: {user_message}")
        
        # Call the existing LLM logic
        response_text = guardian_llm(
            question=user_message,
            document_context=""
        )
        logger.info(f"Generated response: {response_text[:50]}...") # Log first 50 chars
        return JSONResponse(content={"response": response_text})
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
