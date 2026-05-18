from pydantic import BaseModel, Field
from typing import Optional


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|bot)$",
                      description="'user', 'assistant', or 'bot'")
    content: str = Field(..., min_length=1)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000,
                         description="User's message")
    auth_token: Optional[str] = Field(
        None,
        description="JWT Bearer token from the Node.js backend (for authenticated endpoints)",
    )
    chat_history: Optional[list[ChatMessage]] = Field(
        default=None,
        max_length=20,
        description="Recent conversation turns for context (up to 20 messages)",
    )


class ChatResponse(BaseModel):
    agent: str = Field(..., description="Which sub-agent handled the request")
    message: str = Field(..., description="Original user message")
    response: str = Field(..., description="AI-generated response")


class HealthResponse(BaseModel):
    status: str
    version: str = "1.0.0"
