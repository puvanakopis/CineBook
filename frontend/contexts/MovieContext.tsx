// src/context/MovieContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { movieApi } from "@/services/movieApi";
import {
    MovieContextType,
    Movie,
    CreateMovieRequest,
    UpdateMovieRequest,
} from "@/interfaces/movieInterface";

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
    const getMovieById = async (id: string) => {
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
    };

    // ---------- CREATE MOVIE (Admin only) ----------
    const createMovie = async (data: CreateMovieRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await movieApi.createMovie(data);
            // Add the new movie to the list
            setMovies(prev => [...prev, response.movie]);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- UPDATE MOVIE (Admin only) ----------
    const updateMovie = async (id: string, data: UpdateMovieRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await movieApi.updateMovie(id, data);
            // Update the movie in the list
            setMovies(prev => prev.map(movie =>
                movie._id === id ? response.movie : movie
            ));
            // Update selected movie if it's the same
            if (selectedMovie?._id === id) {
                setSelectedMovie(response.movie);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- DELETE MOVIE (Admin only) ----------
    const deleteMovie = async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await movieApi.deleteMovie(id);
            // Remove the movie from the list
            setMovies(prev => prev.filter(movie => movie._id !== id));
            // Clear selected movie if it's the same
            if (selectedMovie?._id === id) {
                setSelectedMovie(null);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Optional: Auto-fetch movies on mount
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