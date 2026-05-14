import axios from "axios";
import Cookies from "js-cookie";
import {
    SignupRequestOtpRequest,
    SignupRequestOtpResponse,
    VerifyOtpAndSignupRequest,
    VerifyOtpAndSignupResponse,
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    VerifyPasswordResetRequest,
    VerifyPasswordResetResponse,
} from "@/interfaces/authInterface";

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

export const authApi = {
    googleAuthUrl: (): string => {
        return `${API_BASE_URL}/api/auth/google`;
    },

    requestSignupOtp: async (data: SignupRequestOtpRequest): Promise<SignupRequestOtpResponse> => {
        try {
            const res = await api.post<SignupRequestOtpResponse>("/api/auth/signup/request-otp", data);
            return res.data;
        } catch (err: unknown) {
            let message = "Request failed";
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            } else if (typeof err === "string") {
                message = err;
            }
            throw new Error(message);
        }
    },

    verifyOtpAndSignup: async (data: VerifyOtpAndSignupRequest): Promise<VerifyOtpAndSignupResponse> => {
        const res = await api.post<VerifyOtpAndSignupResponse>("/api/auth/signup/verify-otp", data);

        if (res.data.token) {
            Cookies.set("token", res.data.token, { expires: 7 });
        }

        return res.data;
    },

    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const res = await api.post<LoginResponse>("/api/auth/login", data);

        if (res.data.token) {
            Cookies.set("token", res.data.token, { expires: 7 });
        }

        return res.data;
    },

    requestPasswordReset: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
        const res = await api.post<ForgotPasswordResponse>("/api/auth/forgot-password/request-otp", data);
        return res.data;
    },

    verifyPasswordReset: async (data: VerifyPasswordResetRequest): Promise<VerifyPasswordResetResponse> => {
        const res = await api.post<VerifyPasswordResetResponse>("/api/auth/forgot-password/verify-otp", data);
        return res.data;
    },

    logout: (): void => {
        Cookies.remove("token");
    },

    getToken: (): string | undefined => {
        return Cookies.get("token");
    },

    isAuthenticated: (): boolean => {
        return !!Cookies.get("token");
    },

    getCurrentUser: async () => {
        const res = await api.get("/api/auth/me");
        return res.data.user;
    },

    fetchUserInfo: async (): Promise<any> => {
        const response = await api.get("/api/auth/me");
        return response.data.user;
    },

    updateUserInfo: async (data: any): Promise<any> => {
        const response = await api.put("/api/auth/me", data);
        return response.data.user;
    },
    uploadProfilePicture: async (file: File): Promise<any> => {
        const formData = new FormData();
        formData.append("profilePicture", file);
        const response = await api.post("/api/auth/upload-dp", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    addPaymentMethod: async (data: any): Promise<any> => {
        const response = await api.post("/api/auth/payment-methods", data);
        return response.data;
    },
    getPaymentMethods: async (): Promise<any> => {
        const response = await api.get("/api/auth/payment-methods");
        return response.data;
    },
    updatePaymentMethod: async (id: string, data: any): Promise<any> => {
        const response = await api.put(`/api/auth/payment-methods/${id}`, data);
        return response.data;
    },
    deletePaymentMethod: async (id: string): Promise<any> => {
        const response = await api.delete(`/api/auth/payment-methods/${id}`);
        return response.data;
    },
};

export const fetchUserInfo = authApi.fetchUserInfo;
export const updateUserInfo = authApi.updateUserInfo;
