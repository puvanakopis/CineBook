from langchain_core.tools import tool
from typing import Optional
from app.tools.api_client import api_get
from app.utils.helpers import safe_json, truncate
from app.utils.logger import get_logger

logger = get_logger(__name__)


def get_theater_tools(auth_token: Optional[str] = None):
    """Return theater tools bound to the given auth context."""

    @tool
    async def list_theaters() -> str:
        """
        Fetch all theaters from the database.
        Returns theater names, addresses, cities, features (IMAX, Dolby, 4K, recliners, etc.)
        and their screens with shows.
        """
        try:
            theaters = await api_get("/theaters", auth_token=auth_token)
            summary = [
                {
                    "id": t.get("_id"),
                    "name": t.get("name"),
                    "address": t.get("address"),
                    "city": t.get("city"),
                    "phone": t.get("phone"),
                    "features": t.get("features", {}),
                    "amenities": t.get("amenities", []),
                    "screenCount": len(t.get("screens", [])),
                }
                for t in theaters
            ]
            return truncate(safe_json(summary))
        except Exception as e:
            logger.error(f"list_theaters error: {e}")
            return "Error: Unable to fetch theaters at this time."

    @tool
    async def get_theater_details(theater_id: str) -> str:
        """
        Fetch complete details for a specific theater by its ID.
        Includes all screens, show schedules, prices, movie references, features, and reviews.
        Use this when the user asks about a specific theater or its showtimes.
        """
        try:
            theater = await api_get(f"/theaters/{theater_id}", auth_token=auth_token)
            return truncate(safe_json(theater))
        except Exception as e:
            logger.error(f"get_theater_details error: {e}")
            return f"Error: Unable to fetch details for theater ID '{theater_id}'."

    @tool
    async def get_showtimes_for_movie(movie_id: str) -> str:
        """
        Find all theaters and showtimes where a specific movie is playing.
        Searches through all theaters and filters shows matching the given movie_id.
        Returns theater name, screen type, date, startTime, endTime, and ticket price.
        """
        try:
            theaters = await api_get("/theaters", auth_token=auth_token)
            results = []
            for theater in theaters:
                for screen in theater.get("screens", []):
                    matching_shows = [
                        s for s in screen.get("shows", [])
                        if s.get("movie") == movie_id or (
                            isinstance(s.get("movie"), dict) and
                            s["movie"].get("_id") == movie_id
                        )
                    ]
                    if matching_shows:
                        results.append({
                            "theaterId": theater.get("_id"),
                            "theaterName": theater.get("name"),
                            "city": theater.get("city"),
                            "screenId": screen.get("screen_id"),
                            "screenName": screen.get("name"),
                            "screenType": screen.get("type"),
                            "shows": [
                                {
                                    "date": s.get("date"),
                                    "startTime": s.get("startTime"),
                                    "endTime": s.get("endTime"),
                                    "price": s.get("price"),
                                    "currency": s.get("currency", "LKR"),
                                    "status": s.get("status"),
                                }
                                for s in matching_shows
                            ],
                        })
            if not results:
                return f"No showtimes found for movie ID '{movie_id}'."
            return truncate(safe_json(results))
        except Exception as e:
            logger.error(f"get_showtimes_for_movie error: {e}")
            return "Error: Unable to fetch showtimes at this time."

    return [list_theaters, get_theater_details, get_showtimes_for_movie]
