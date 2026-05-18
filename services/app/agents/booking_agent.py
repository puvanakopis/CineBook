from typing import Optional
from app.agents.base_agent import build_agent, build_chat_history
from app.tools.booking_tools import get_booking_tools
from app.core.prompt import BOOKING_AGENT_PROMPT
from app.utils.logger import get_logger

logger = get_logger(__name__)


async def run_booking_agent(
    message: str,
    auth_token: Optional[str] = None,
    chat_history: Optional[list[dict]] = None,
) -> str:

    tools = get_booking_tools(auth_token=auth_token)
    executor = build_agent(
        system_prompt=BOOKING_AGENT_PROMPT,
        tools=tools,
        agent_name="booking_agent",
    )

    history = build_chat_history(chat_history or [])

    try:
        result = await executor.ainvoke({
            "input": message,
            "chat_history": history,
        })
        return result.get("output", "I couldn't retrieve booking information.")
    except Exception as e:
        logger.error(f"Booking agent error: {e}")
        return "The booking service is currently unavailable. Please try again shortly."
