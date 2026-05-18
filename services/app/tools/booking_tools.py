from langchain_core.tools import tool
from typing import Optional
from app.tools.api_client import api_get, api_post
from app.utils.helpers import safe_json, truncate
from app.utils.logger import get_logger

logger = get_logger(__name__)


def get_booking_tools(auth_token: Optional[str] = None):
    """Return booking tools bound to the given auth context."""

    @tool
    async def get_booked_seats(
        movie_id: str,
        theater_id: str,
        screen_id: str,
        date: str,
        show_time: str,
    ) -> str:
        """
        Fetch already-booked seat IDs for a specific show.
        Required: movie_id, theater_id, screen_id, date (YYYY-MM-DD), show_time (e.g. '14:30').
        Returns a list of seat IDs that are NOT available for booking.
        """
        try:
            params = {
                "movieId": movie_id,
                "theaterId": theater_id,
                "screenId": screen_id,
                "date": date,
                "showTime": show_time,
            }
            booked = await api_get("/bookings/booked-seats", params=params, auth_token=auth_token)
            if not booked:
                return "All seats are available for this show."
            return safe_json({"bookedSeatIds": booked})
        except Exception as e:
            logger.error(f"get_booked_seats error: {e}")
            return "Error: Unable to check seat availability at this time."

    @tool
    async def get_all_bookings(customer_email: str) -> str:
        """
        Fetch bookings. If called by an admin, optionally filter by customer_email.
        Returns booking list with status, seats, total price, and payment info.
        Requires admin auth token.
        """
        try:
            params = {}
            if customer_email:
                params["email"] = customer_email
            bookings = await api_get("/bookings", params=params, auth_token=auth_token)
            return truncate(safe_json(bookings))
        except Exception as e:
            logger.error(f"get_all_bookings error: {e}")
            return "Error: Unable to fetch bookings. Ensure you are logged in as admin."

    @tool
    async def get_booking_by_id(booking_id: str) -> str:
        """
        Fetch a specific booking by its ID.
        Returns full booking details including seats, payment, and status.
        """
        try:
            booking = await api_get(f"/bookings/{booking_id}", auth_token=auth_token)
            return safe_json(booking)
        except Exception as e:
            logger.error(f"get_booking_by_id error: {e}")
            return f"Error: Unable to find booking '{booking_id}'."

    @tool
    async def cancel_booking(booking_id: str) -> str:
        """
        Cancel a booking by its ID. Only works if the user owns the booking.
        Returns confirmation or error message.
        Requires user to be authenticated (auth_token must be provided).
        """
        try:
            result = await api_post(
                f"/bookings/{booking_id}/cancel", body={}, auth_token=auth_token
            )
            return safe_json(result)
        except Exception as e:
            logger.error(f"cancel_booking error: {e}")
            return f"Error: Unable to cancel booking '{booking_id}'. Ensure you are logged in."

    @tool
    async def create_booking(
        movie_id: str,
        movie_title: str,
        theater_id: str,
        theater_name: str,
        customer_name: str,
        customer_email: str,
        date_time: str,
        seats: list[dict],
        total_price: float,
        show_time: str,
    ) -> str:
        """
        Create a new booking for a movie.
        Required: movie_id, movie_title, theater_id, theater_name, customer_name, customer_email, 
        date_time (ISO string), seats (list of {id, row, number, type, price}), total_price, show_time.
        Requires user auth token.
        """
        try:
            body = {
                "movieId": movie_id,
                "movieTitle": movie_title,
                "theaterId": theater_id,
                "theaterName": theater_name,
                "customerName": customer_name,
                "customerEmail": customer_email,
                "dateTime": date_time,
                "seats": seats,
                "totalPrice": total_price,
                "showTime": show_time,
            }
            result = await api_post("/bookings", body=body, auth_token=auth_token)
            return safe_json(result)
        except Exception as e:
            logger.error(f"create_booking error: {e}")
            return "Error: Unable to create booking. Ensure you are logged in and details are correct."

    @tool
    async def get_my_bookings() -> str:
        """
        Fetch bookings for the currently logged-in user.
        Requires user auth token.
        """
        try:
            bookings = await api_get("/bookings/me", auth_token=auth_token)
            return truncate(safe_json(bookings))
        except Exception as e:
            logger.error(f"get_my_bookings error: {e}")
            return "Error: Unable to fetch your bookings. Ensure you are logged in."

    return [get_booked_seats, get_all_bookings, get_booking_by_id, cancel_booking, create_booking, get_my_bookings]
