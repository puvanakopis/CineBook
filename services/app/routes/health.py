from fastapi import APIRouter
from app.schemas.chat import HealthResponse
from app.core.config import get_settings

router = APIRouter()


@router.get("/health", response_model=HealthResponse, summary="Health check")
async def health() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(
        status="ok" if settings.groq_api_key else "degraded — GROQ_API_KEY missing",
    )
