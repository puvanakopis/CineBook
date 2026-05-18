from langchain_core.tools import tool
from typing import Optional
from app.tools.api_client import api_get
from app.utils.helpers import safe_json, truncate
from app.utils.logger import get_logger

logger = get_logger(__name__)


def get_user_tools(auth_token: Optional[str] = None):
    """Return user tools bound to the given auth context."""

    @tool
    async def get_current_user() -> str:
        """
        Fetch the currently authenticated user's profile.
        Returns firstName, lastName, email, role, phone, preferences, and payment methods
        (card numbers are partially masked — only last 4 digits shown).
        Requires auth token.
        """
        try:
            data = await api_get("/auth/me", auth_token=auth_token)
            user = data.get("user", data)

            # Mask payment card numbers for safety
            if "paymentMethods" in user:
                for method in user["paymentMethods"]:
                    if "cardNumber" in method:
                        method["cardNumber"] = f"**** **** **** {method.get('lastFour', '????')}"

            return safe_json(user)
        except Exception as e:
            logger.error(f"get_current_user error: {e}")
            return "Error: Unable to fetch user profile. Please ensure you are logged in."

    @tool
    async def get_my_bookings() -> str:
        """
        Fetch the booking history for the currently authenticated user.
        Returns a list of bookings with movie title, theater, date, seats, total price,
        payment status, and booking status.
        Requires auth token.
        """
        try:
            bookings = await api_get("/bookings/me", auth_token=auth_token)
            if not bookings:
                return "You have no bookings yet."

            summary = [
                {
                    "bookingId": b.get("_id"),
                    "movieTitle": b.get("movieTitle"),
                    "theaterName": b.get("theaterName"),
                    "dateTime": b.get("dateTime"),
                    "showTime": b.get("showTime"),
                    "seats": [s.get("id") for s in b.get("seats", [])],
                    "seatCount": len(b.get("seats", [])),
                    "totalPrice": b.get("totalPrice"),
                    "currency": "LKR",
                    "paymentStatus": b.get("payment", {}).get("status"),
                    "bookingStatus": b.get("status"),
                    "format": b.get("format"),
                }
                for b in bookings
            ]
            return truncate(safe_json(summary))
        except Exception as e:
            logger.error(f"get_my_bookings error: {e}")
            return "Error: Unable to fetch your bookings. Please ensure you are logged in."

    return [get_current_user, get_my_bookings]
