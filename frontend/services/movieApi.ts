import axios from "axios";
import Cookies from "js-cookie";
import {
    Movie,
    CreateMovieRequest,
    CreateMovieResponse,
    UpdateMovieRequest,
    UpdateMovieResponse,
    DeleteMovieResponse,
    GetMoviesResponse,
    CreateMoviePayload,
    UpdateMoviePayload,
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

const buildFormData = (payload: CreateMovieRequest | UpdateMovieRequest): FormData => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(key, typeof item === "object" ? JSON.stringify(item) : String(item));
            });
        } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });

    return formData;
};

const shouldSendMultipart = (data: CreateMoviePayload | UpdateMoviePayload): data is FormData | CreateMovieRequest | UpdateMovieRequest => {
    return (
        data instanceof FormData ||
        (data !== null && typeof data === "object" && "poster" in data && data.poster instanceof File)
    );
};

export const movieApi = {
    getMovies: async (): Promise<GetMoviesResponse> => {
        const res = await api.get<GetMoviesResponse>("/api/movies");
        return res.data;
    },

    getMovieById: async (id: string): Promise<Movie> => {
        const res = await api.get<Movie>(`/api/movies/${id}`);
        return res.data;
    },

    createMovie: async (data: CreateMoviePayload): Promise<CreateMovieResponse> => {
        if (shouldSendMultipart(data)) {
            const payload = data instanceof FormData ? data : buildFormData(data);
            const res = await api.post<CreateMovieResponse>("/api/movies", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        }

        const res = await api.post<CreateMovieResponse>("/api/movies", data);
        return res.data;
    },

    updateMovie: async (id: string, data: UpdateMoviePayload): Promise<UpdateMovieResponse> => {
        if (shouldSendMultipart(data)) {
            const payload = data instanceof FormData ? data : buildFormData(data);
            const res = await api.put<UpdateMovieResponse>(`/api/movies/${id}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        }

        const res = await api.put<UpdateMovieResponse>(`/api/movies/${id}`, data);
        return res.data;
    },

    deleteMovie: async (id: string): Promise<DeleteMovieResponse> => {
        const res = await api.delete<DeleteMovieResponse>(`/api/movies/${id}`);
        return res.data;
    },
};