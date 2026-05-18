from langchain_classic.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.tools import BaseTool
from typing import Optional
from app.core.llm import get_llm
from app.utils.logger import get_logger

logger = get_logger(__name__)


def build_agent(
    system_prompt: str,
    tools: list[BaseTool],
    agent_name: str = "agent",
) -> AgentExecutor:

    llm = get_llm()

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder("chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ])

    agent = create_tool_calling_agent(llm=llm, tools=tools, prompt=prompt)

    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        max_iterations=5,
        handle_parsing_errors=True,
        return_intermediate_steps=False,
    )

    logger.info(f"Built agent '{agent_name}' with {len(tools)} tools.")
    return executor


def build_chat_history(history: list[dict]) -> list:
    messages = []
    for msg in history:
        role = msg.get("role", "")
        content = msg.get("content", "")
        # Handle 'bot' as 'assistant' for internal model consistency
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role in ["assistant", "bot"]:
            messages.append(AIMessage(content=content))
    return messages
