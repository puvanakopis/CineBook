from typing import Optional
from app.agents.base_agent import build_agent, build_chat_history
from app.tools.user_tools import get_user_tools
from app.core.prompt import USER_AGENT_PROMPT
from app.utils.logger import get_logger

logger = get_logger(__name__)


async def run_user_agent(
    message: str,
    auth_token: Optional[str] = None,
    chat_history: Optional[list[dict]] = None,
) -> str:

    tools = get_user_tools(auth_token=auth_token)
    executor = build_agent(
        system_prompt=USER_AGENT_PROMPT,
        tools=tools,
        agent_name="user_agent",
    )

    history = build_chat_history(chat_history or [])

    try:
        result = await executor.ainvoke({
            "input": message,
            "chat_history": history,
        })
        return result.get("output", "I couldn't retrieve your profile information.")
    except Exception as e:
        logger.error(f"User agent error: {e}")
        return "The user service is currently unavailable. Please try again shortly."
