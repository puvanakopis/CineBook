from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.agents.router_agent import route_and_run
from app.utils.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)


@router.post("/chat", response_model=ChatResponse, summary="Send a message to the AI agent")
async def chat(request: ChatRequest) -> ChatResponse:

    logger.info(f"Chat request: '{request.message[:80]}' | auth={'yes' if request.auth_token else 'no'}")

    history = [m.model_dump() for m in (request.chat_history or [])]

    result = await route_and_run(
        message=request.message,
        auth_token=request.auth_token,
        chat_history=history,
    )

    return ChatResponse(**result)
