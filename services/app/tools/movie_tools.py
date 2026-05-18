from langchain_core.tools import tool
from typing import Optional
from app.tools.api_client import api_get
from app.utils.helpers import safe_json, truncate
from app.utils.logger import get_logger

logger = get_logger(__name__)


def get_movie_tools(auth_token: Optional[str] = None):
    """Return movie tools bound to the given auth context."""

    @tool
    async def list_movies(filter_type: str) -> str:
        """
        Fetch all movies from the database.
        filter_type options: 'all', 'now_showing', 'upcoming'
        Returns a JSON list of movies with title, genres, duration, languages, and status.
        """
        try:
            movies = await api_get("/movies", auth_token=auth_token)
            if filter_type == "now_showing":
                movies = [m for m in movies if m.get("isNowShowing")]
            elif filter_type == "upcoming":
                movies = [m for m in movies if m.get("isUpcoming")]

            summary = [
                {
                    "id": m.get("_id"),
                    "title": m.get("title"),
                    "genres": m.get("genres", []),
                    "duration": m.get("duration"),
                    "languages": m.get("languages", []),
                    "formats": m.get("formats"),
                    "isNowShowing": m.get("isNowShowing"),
                    "isUpcoming": m.get("isUpcoming"),
                    "releaseDate": m.get("releaseDate"),
                }
                for m in movies
            ]
            return truncate(safe_json(summary))
        except Exception as e:
            logger.error(f"list_movies error: {e}")
            return "Error: Unable to fetch movies at this time."

    @tool
    async def get_movie_details(movie_id: str) -> str:
        """
        Fetch full details for a specific movie by its ID.
        Includes synopsis, cast, reviews, trailer URL, and available showtimes at theaters.
        Use this when the user asks about a specific movie.
        """
        try:
            movie = await api_get(f"/movies/{movie_id}", auth_token=auth_token)
            return truncate(safe_json(movie))
        except Exception as e:
            logger.error(f"get_movie_details error: {e}")
            return f"Error: Unable to fetch details for movie ID '{movie_id}'."

    @tool
    async def search_movies_by_genre(genre: str) -> str:
        """
        List movies that belong to a specific genre (e.g. 'Action', 'Drama', 'Comedy').
        Returns matching movies with their basic info.
        """
        try:
            movies = await api_get("/movies", auth_token=auth_token)
            genre_lower = genre.lower()
            matched = [
                {
                    "id": m.get("_id"),
                    "title": m.get("title"),
                    "genres": m.get("genres", []),
                    "duration": m.get("duration"),
                    "isNowShowing": m.get("isNowShowing"),
                }
                for m in movies
                if any(g.lower() == genre_lower for g in m.get("genres", []))
            ]
            if not matched:
                return f"No movies found in genre '{genre}'."
            return truncate(safe_json(matched))
        except Exception as e:
            logger.error(f"search_movies_by_genre error: {e}")
            return "Error: Unable to search movies at this time."

    return [list_movies, get_movie_details, search_movies_by_genre]
