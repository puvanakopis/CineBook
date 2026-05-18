from langchain_groq import ChatGroq
from app.core.config import get_settings

_llm_instance = None


def get_llm() -> ChatGroq:
    global _llm_instance
    if _llm_instance is None:
        settings = get_settings()
        _llm_instance = ChatGroq(
            api_key=settings.groq_api_key,
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            max_tokens=1024,
        )
    return _llm_instance
