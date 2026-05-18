from typing import Optional
from app.core.llm import get_llm
from app.core.prompt import ROUTER_SYSTEM_PROMPT
from app.agents.movie_agent import run_movie_agent
from app.agents.theater_agent import run_theater_agent
from app.agents.booking_agent import run_booking_agent
from app.agents.user_agent import run_user_agent
from app.utils.logger import get_logger
from langchain_core.messages import HumanMessage, SystemMessage

logger = get_logger(__name__)

AGENT_MAP = {
    "movie_agent": run_movie_agent,
    "theater_agent": run_theater_agent,
    "booking_agent": run_booking_agent,
    "user_agent": run_user_agent,
}


async def classify_intent(message: str) -> str:

    llm = get_llm()
    try:
        response = await llm.ainvoke([
            SystemMessage(content=ROUTER_SYSTEM_PROMPT),
            HumanMessage(content=message),
        ])
        agent_name = response.content.strip().lower().replace(" ", "_")
        if agent_name not in AGENT_MAP:
            logger.warning(f"Router returned unknown agent '{agent_name}', defaulting to movie_agent")
            return "movie_agent"
        logger.info(f"Routed '{message[:60]}...' → {agent_name}")
        return agent_name
    except Exception as e:
        logger.error(f"Router classification error: {e}, defaulting to movie_agent")
        return "movie_agent"


async def route_and_run(
    message: str,
    auth_token: Optional[str] = None,
    chat_history: Optional[list[dict]] = None,
) -> dict:

    agent_name = await classify_intent(message)
    agent_fn = AGENT_MAP[agent_name]

    logger.info(f"Dispatching to {agent_name}")

    response = await agent_fn(
        message=message,
        auth_token=auth_token,
        chat_history=chat_history,
    )

    return {
        "agent": agent_name,
        "message": message,
        "response": response,
    }
