import httpx
from typing import Any, Optional
from app.core.config import get_settings
from app.utils.logger import get_logger

logger = get_logger(__name__)

TIMEOUT = httpx.Timeout(15.0)


def _build_headers(auth_token: Optional[str] = None) -> dict:
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    if auth_token:
        token = auth_token if auth_token.startswith("Bearer ") else f"Bearer {auth_token}"
        headers["Authorization"] = token
    return headers


async def api_get(
    path: str,
    params: Optional[dict] = None,
    auth_token: Optional[str] = None,
) -> Any:
    settings = get_settings()
    url = f"{settings.node_api_base_url.rstrip('/')}/{path.lstrip('/')}"
    logger.debug(f"GET {url} params={params}")
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            resp = await client.get(url, params=params, headers=_build_headers(auth_token))
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP {e.response.status_code} on GET {url}: {e.response.text}")
        raise
    except Exception as e:
        logger.error(f"Network error on GET {url}: {e}")
        raise


async def api_post(
    path: str,
    body: dict,
    auth_token: Optional[str] = None,
) -> Any:
    settings = get_settings()
    url = f"{settings.node_api_base_url}{path}"
    logger.debug(f"POST {url} body={body}")
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            resp = await client.post(url, json=body, headers=_build_headers(auth_token))
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP {e.response.status_code} on POST {url}: {e.response.text}")
        raise
    except Exception as e:
        logger.error(f"Network error on POST {url}: {e}")
        raise
