import axios from "axios";
import Cookies from "js-cookie";

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

export interface ChatMessage {
    sender: "bot" | "user";
    text: string;
}

export interface ChatRequest {
    message: string;
    chat_history?: ChatMessage[];
    auth_token?: string;
}

export interface ChatResponse {
    response: string;
    sender: string;
    metadata?: any;
}

export const chatApi = {
    sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
        const token = Cookies.get("token");
        const response = await api.post("/api/chat", {
            ...data,
            auth_token: data.auth_token || token
        });
        return response.data;
    },
};
