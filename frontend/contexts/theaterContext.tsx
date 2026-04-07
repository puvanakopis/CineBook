"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { theaterApi } from "@/services/theaterApi";
import {
    TheaterContextType,
    Theater,
    CreateTheaterPayload,
    UpdateTheaterPayload
} from "@/interfaces/theaterInterface";

const TheaterContext = createContext<TheaterContextType | undefined>(undefined);

export const useTheater = () => {
    const context = useContext(TheaterContext);
    if (!context) throw new Error("useTheater must be used within a TheaterProvider");
    return context;
};

interface TheaterProviderProps {
    children: ReactNode;
}

export const TheaterProvider: React.FC<TheaterProviderProps> = ({ children }) => {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
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
    const clearSelectedTheater = () => setSelectedTheater(null);

    const getTheaters = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await theaterApi.getTheaters();
            setTheaters(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getTheaterById = async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await theaterApi.getTheaterById(id);
            setSelectedTheater(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const createTheater = async (data: CreateTheaterPayload) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await theaterApi.createTheater(data);
            setTheaters(prev => [...prev, response.theater]);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateTheater = async (id: string, data: UpdateTheaterPayload) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await theaterApi.updateTheater(id, data);
            setTheaters(prev => prev.map(t => t._id === id ? response.theater : t));
            if (selectedTheater?._id === id) setSelectedTheater(response.theater);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTheater = async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await theaterApi.deleteTheater(id);
            setTheaters(prev => prev.filter(t => t._id !== id));
            if (selectedTheater?._id === id) setSelectedTheater(null);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { getTheaters(); }, [getTheaters]);

    return (
        <TheaterContext.Provider
            value={{
                theaters,
                selectedTheater,
                isLoading,
                error,
                getTheaters,
                getTheaterById,
                createTheater,
                updateTheater,
                deleteTheater,
                clearError,
                clearSelectedTheater,
            }}
        >
            {children}
        </TheaterContext.Provider>
    );
};