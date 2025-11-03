"""
FastAPI wrapper for Google ADK Portfolio Agent
Provides REST API for Next.js frontend integration
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from pathlib import Path

# Load environment
from dotenv import load_dotenv
load_dotenv()

# Import the ADK agent
from portfolio_agent_adk.agent import root_agent

app = FastAPI(title="Portfolio AI Agent API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    message: str
    conversation_id: Optional[str] = None

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Portfolio AI Agent",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "agent": "John Igbokwe Portfolio Assistant"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message to the portfolio agent and get a response.
    
    Args:
        request: ChatRequest with message and optional conversation history
        
    Returns:
        ChatResponse with agent's reply
    """
    try:
        # Convert conversation history to format expected by ADK
        messages = []
        for msg in request.conversation_history:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Add current user message
        messages.append({"role": "user", "content": request.message})
        
        # Generate response using ADK agent
        # Note: ADK's generate_content expects a specific format
        response = await root_agent.generate_content(
            messages[-1]["content"],
            stream=False
        )
        
        # Extract the text response
        response_text = response.text if hasattr(response, 'text') else str(response)
        
        return ChatResponse(
            message=response_text,
            conversation_id=None
        )
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

