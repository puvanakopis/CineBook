"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { bookingApi } from "@/services/bookingApi";
import {
    BookingContextType,
    Booking,
    CreateBookingPayload,
} from "@/interfaces/bookingInterface";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be used within a BookingProvider");
    return context;
};

interface BookingProviderProps {
    children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [myBookings, setMyBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        const error = err as AxiosError<{ message: string }> | Error;
        if ("response" in error && error.response?.data?.message) {
            setError(error.response.data.message);
        } else if ("message" in error) {
            setError(error.message || "Something went wrong");
        } else {
            setError("Something went wrong");
        }
    };

    const clearError = () => setError(null);
    const clearSelectedBooking = () => setSelectedBooking(null);

    const getBookings = useCallback(async () => {
        const token = Cookies.get("token");
        if (!token) return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingApi.getBookings();
            setBookings(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getMyBookings = useCallback(async () => {
        const token = Cookies.get("token");
        if (!token) return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingApi.getMyBookings();
            setMyBookings(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getBookingById = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await bookingApi.getBookingById(id);
            setSelectedBooking(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createBooking = useCallback(async (data: CreateBookingPayload) => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await bookingApi.createBooking(data);
            setBookings(prev => [...prev, res.booking]);
            setMyBookings(prev => [...prev, res.booking]);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const cancelBooking = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await bookingApi.cancelBooking(id);
            if (res.booking) {
                setBookings(prev => prev.map(b => b._id === id ? res.booking as Booking : b));
                setMyBookings(prev => prev.map(b => b._id === id ? res.booking as Booking : b));
                if (selectedBooking?._id === id) setSelectedBooking(res.booking as Booking);
            } else {
                setBookings(prev => prev.filter(b => b._id !== id));
                setMyBookings(prev => prev.filter(b => b._id !== id));
                if (selectedBooking?._id === id) setSelectedBooking(null);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [selectedBooking]);

    useEffect(() => { getBookings(); }, [getBookings]);

    return (
        <BookingContext.Provider
            value={{
                bookings,
                myBookings,
                selectedBooking,
                isLoading,
                error,
                getBookings,
                getMyBookings,
                getBookingById,
                createBooking,
                cancelBooking,
                clearError,
                clearSelectedBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
