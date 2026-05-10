import axios from "axios";
import Cookies from "js-cookie";
import {
    Theater,
    CreateTheaterPayload,
    UpdateTheaterPayload,
    CreateTheaterResponse,
    UpdateTheaterResponse,
    DeleteTheaterResponse,
    GetTheatersResponse,
    CreateTheaterRequest,
    UpdateTheaterRequest,
} from "@/interfaces/theaterInterface";

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

const buildFormData = (payload: CreateTheaterRequest | UpdateTheaterRequest): FormData => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, typeof item === "object" ? JSON.stringify(item) : String(item)));
        } else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });
    return formData;
};

const shouldSendMultipart = (data: CreateTheaterPayload | UpdateTheaterPayload): data is FormData | CreateTheaterRequest | UpdateTheaterRequest => {
    return data instanceof FormData || (data !== null && typeof data === "object" && "image" in data && data.image instanceof File);
};

export const theaterApi = {
    getTheaters: async (): Promise<GetTheatersResponse> => {
        const res = await api.get<GetTheatersResponse>("/api/theaters");
        return res.data;
    },

    getTheaterById: async (id: string): Promise<Theater> => {
        const res = await api.get<Theater>(`/api/theaters/${id}`);
        return res.data;
    },

    createTheater: async (data: CreateTheaterPayload): Promise<CreateTheaterResponse> => {
        if (shouldSendMultipart(data)) {
            const payload = data instanceof FormData ? data : buildFormData(data);
            const res = await api.post<CreateTheaterResponse>("/api/theaters", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        }
        const res = await api.post<CreateTheaterResponse>("/api/theaters", data);
        return res.data;
    },

    updateTheater: async (id: string, data: UpdateTheaterPayload): Promise<UpdateTheaterResponse> => {
        if (shouldSendMultipart(data)) {
            const payload = data instanceof FormData ? data : buildFormData(data);
            const res = await api.put<UpdateTheaterResponse>(`/api/theaters/${id}`, payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        }
        const res = await api.put<UpdateTheaterResponse>(`/api/theaters/${id}`, data);
        return res.data;
    },

    deleteTheater: async (id: string): Promise<DeleteTheaterResponse> => {
        const res = await api.delete<DeleteTheaterResponse>(`/api/theaters/${id}`);
        return res.data;
    },
};