import axios from "axios";
import Cookies from "js-cookie";
import {
    Movie,
    CreateMovieRequest,
    CreateMovieResponse,
    UpdateMovieRequest,
    UpdateMovieResponse,
    DeleteMovieResponse,
    GetMoviesResponse
} from "@/interfaces/movieInterface";

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

export const movieApi = {
    getMovies: async (): Promise<GetMoviesResponse> => {
        const res = await api.get<GetMoviesResponse>("/api/movies");
        return res.data;
    },

    getMovieById: async (id: string): Promise<Movie> => {
        const res = await api.get<Movie>(`/api/movies/${id}`);
        return res.data;
    },

    createMovie: async (data: CreateMovieRequest): Promise<CreateMovieResponse> => {
        const res = await api.post<CreateMovieResponse>("/api/movies", data);
        return res.data;
    },

    updateMovie: async (id: string, data: UpdateMovieRequest): Promise<UpdateMovieResponse> => {
        const res = await api.put<UpdateMovieResponse>(`/api/movies/${id}`, data);
        return res.data;
    },

    deleteMovie: async (id: string): Promise<DeleteMovieResponse> => {
        const res = await api.delete<DeleteMovieResponse>(`/api/movies/${id}`);
        return res.data;
    },
};