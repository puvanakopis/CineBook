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
    User
} from "@/interfaces/authInterface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Auto attach JWT
api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("token");
            Cookies.remove("user");
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("unauthorized"));
            }
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    // -------- REQUEST SIGNUP OTP --------
    requestSignupOtp: async (data: SignupRequestOtpRequest): Promise<SignupRequestOtpResponse> => {
        const res = await api.post<SignupRequestOtpResponse>("/api/auth/signup/request-otp", data);
        return res.data;
    },

    // -------- VERIFY OTP AND COMPLETE SIGNUP --------
    verifyOtpAndSignup: async (data: VerifyOtpAndSignupRequest): Promise<VerifyOtpAndSignupResponse> => {
        const res = await api.post<VerifyOtpAndSignupResponse>("/api/auth/signup/verify-otp", data);

        // Store token and user in cookies after successful signup
        if (res.data.token) {
            Cookies.set("token", res.data.token, { expires: 7 });
            Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
        }

        return res.data;
    },

    // -------- LOGIN --------
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const res = await api.post<LoginResponse>("/api/auth/login", data);

        // Store token and user in cookies
        if (res.data.token) {
            Cookies.set("token", res.data.token, { expires: 7 });
            Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
        }

        return res.data;
    },

    // -------- REQUEST PASSWORD RESET OTP --------
    requestPasswordReset: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
        const res = await api.post<ForgotPasswordResponse>("/api/auth/forgot-password/request-otp", data);
        return res.data;
    },

    // -------- VERIFY PASSWORD RESET OTP --------
    verifyPasswordReset: async (data: VerifyPasswordResetRequest): Promise<VerifyPasswordResetResponse> => {
        const res = await api.post<VerifyPasswordResetResponse>("/api/auth/forgot-password/verify-otp", data);
        return res.data;
    },

    // -------- LOGOUT --------
    logout: (): void => {
        Cookies.remove("token");
        Cookies.remove("user");
    },

    // -------- GET CURRENT USER FROM COOKIES --------
    getCurrentUser: (): User | null => {
        const userStr = Cookies.get("user");
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    // -------- GET TOKEN --------
    getToken: (): string | undefined => {
        return Cookies.get("token");
    },

    // -------- CHECK IF AUTHENTICATED --------
    isAuthenticated: (): boolean => {
        return !!Cookies.get("token");
    },
};