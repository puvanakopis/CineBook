import axios from "axios";
import Cookies from "js-cookie";
import {
    Booking,
    CreateBookingPayload,
    CreateBookingResponse,
    GetBookingsResponse,
    CancelBookingResponse,
} from "@/interfaces/bookingInterface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("token");
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("unauthorized"));
            }
        }
        return Promise.reject(error);
    }
);

export const bookingApi = {
    getBookings: async (): Promise<GetBookingsResponse> => {
        const res = await api.get<GetBookingsResponse>("/api/bookings");
        return res.data;
    },

    getMyBookings: async (): Promise<GetBookingsResponse> => {
        const res = await api.get<GetBookingsResponse>("/api/bookings/me");
        return res.data;
    },

    getBookingById: async (id: string): Promise<Booking> => {
        const res = await api.get<Booking>(`/api/bookings/${id}`);
        return res.data;
    },

    createBooking: async (data: CreateBookingPayload): Promise<CreateBookingResponse> => {
        const res = await api.post<CreateBookingResponse>("/api/bookings", data);
        return res.data;
    },

    cancelBooking: async (id: string): Promise<CancelBookingResponse> => {
        const res = await api.post<CancelBookingResponse>(`/api/bookings/${id}/cancel`);
        return res.data;
    },

    getBookedSeats: async (params: {
        movieId?: string;
        theaterId?: string;
        screenId?: string;
        date?: string;
        showTime?: string;
    }): Promise<string[]> => {
        const res = await api.get<string[]>("/api/bookings/booked-seats", { params });
        return res.data;
    },
};

