"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { movieApi } from "@/services/movieApi";
import { MovieContextType, Movie, CreateMoviePayload, UpdateMoviePayload, } from "@/interfaces/movieInterface";

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovie = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovie must be used within a MovieProvider");
    }
    return context;
};

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
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

    const clearError = () => {
        setError(null);
    };

    const clearSelectedMovie = () => {
        setSelectedMovie(null);
    };

    // ---------- GET ALL MOVIES ----------
    const getMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await movieApi.getMovies();
            setMovies(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ---------- GET MOVIE BY ID ----------
    const getMovieById = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await movieApi.getMovieById(id);
            setSelectedMovie(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ---------- CREATE MOVIE (Admin only) ----------
    const createMovie = useCallback(async (data: CreateMoviePayload) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await movieApi.createMovie(data);
            setMovies(prev => [...prev, response.movie]);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ---------- UPDATE MOVIE (Admin only) ----------
    const updateMovie = useCallback(async (id: string, data: UpdateMoviePayload) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await movieApi.updateMovie(id, data);
            setMovies(prev => prev.map(movie =>
                movie._id === id ? response.movie : movie
            ));
            if (selectedMovie?._id === id) {
                setSelectedMovie(response.movie);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [selectedMovie]);

    // ---------- DELETE MOVIE (Admin only) ----------
    const deleteMovie = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await movieApi.deleteMovie(id);
            setMovies(prev => prev.filter(movie => movie._id !== id));
            if (selectedMovie?._id === id) {
                setSelectedMovie(null);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [selectedMovie]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <MovieContext.Provider
            value={{
                movies,
                selectedMovie,
                isLoading,
                error,
                getMovies,
                getMovieById,
                createMovie,
                updateMovie,
                deleteMovie,
                clearError,
                clearSelectedMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};