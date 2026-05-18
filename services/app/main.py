from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, health
from app.utils.logger import get_logger

logger = get_logger(__name__)

app = FastAPI(
    title="CineBook AI Agent",
    description=(
        "Multi-agent AI system for the CineBook movie booking platform. "
        "Powered by LangChain + Groq LLM (LLaMA 3.3 70B). "
        "Routes queries to specialized sub-agents: movies, theaters, bookings, and users."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])


@app.on_event("startup")
async def startup_event():
    logger.info("CineBook AI Agent is starting up...")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("CineBook AI Agent is shutting down.")
