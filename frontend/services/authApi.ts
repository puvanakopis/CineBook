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
    requestSignupOtp: async (data: SignupRequestOtpRequest): Promise<SignupRequestOtpResponse> => {
        const res = await api.post<SignupRequestOtpResponse>("/api/auth/signup/request-otp", data);
        return res.data;
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
};
