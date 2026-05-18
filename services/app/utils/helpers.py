import json
from typing import Any


def safe_json(data: Any) -> str:
    """Serialize data to a compact JSON string for tool responses."""
    try:
        return json.dumps(data, ensure_ascii=False, default=str)
    except Exception:
        return str(data)


def truncate(text: str, max_chars: int = 3000) -> str:
    """Prevent oversized tool responses from bloating the context window."""
    if len(text) <= max_chars:
        return text
    return text[:max_chars] + f"\n\n... [truncated — {len(text) - max_chars} chars omitted]"


def format_movie(movie: dict) -> str:
    """Human-readable one-liner for a movie."""
    genres = ", ".join(movie.get("genres", []))
    return (
        f"**{movie.get('title', 'Unknown')}** "
        f"({movie.get('duration', '?')} min | {genres} | "
        f"{'Now Showing' if movie.get('isNowShowing') else 'Upcoming'})"
    )


def format_theater(theater: dict) -> str:
    """Human-readable one-liner for a theater."""
    return (
        f"**{theater.get('name', 'Unknown')}** — "
        f"{theater.get('address', '')}, {theater.get('city', '')}"
    )
