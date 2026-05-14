"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AxiosError } from "axios";
import { authApi } from "@/services/authApi";

import {
    AuthContextType,
    User,
    SignupRequestOtpRequest,
    VerifyOtpAndSignupRequest,
    LoginRequest,
    ForgotPasswordRequest,
    VerifyPasswordResetRequest
} from "@/interfaces/authInterface";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    requestSignupOtp: (data: SignupRequestOtpRequest) => Promise<void>;
    verifyOtpAndSignup: (data: VerifyOtpAndSignupRequest) => Promise<void>;
    login: (data: LoginRequest) => Promise<void>;
    requestPasswordReset: (data: ForgotPasswordRequest) => Promise<void>;
    verifyPasswordReset: (data: VerifyPasswordResetRequest) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    userInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        profilePicture?: string;
        preferences: {
            theme: string;
            notifications: boolean;
            favoriteGenres: string[];
            preferredCinema: string;
        };
        createdAt: string;
    } | null;
    fetchUserInfo: () => Promise<void>;
    updateUserInfo: (data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        preferences: {
            theme: string;
            notifications: boolean;
            favoriteGenres: string[];
            preferredCinema: string;
        };
    }) => Promise<void>;
    uploadProfilePicture: (file: File) => Promise<void>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<AuthContextType["userInfo"]>(null);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const isAuth = authApi.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const userData = await authApi.getCurrentUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        const handleUnauthorized = () => {
            setUser(null);
            setIsAuthenticated(false);
        };

        initializeUser();
        window.addEventListener("unauthorized", handleUnauthorized);
        return () => window.removeEventListener("unauthorized", handleUnauthorized);
    }, []);

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

    // ---------- REQUEST SIGNUP OTP ----------
    const requestSignupOtp = async (data: SignupRequestOtpRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            await authApi.requestSignupOtp(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- VERIFY OTP AND SIGNUP ----------
    const verifyOtpAndSignup = async (data: VerifyOtpAndSignupRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authApi.verifyOtpAndSignup(data);

            if (response.token && response.user) {
                setUser(response.user);
                setIsAuthenticated(true);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- LOGIN ----------
    const login = async (data: LoginRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authApi.login(data);
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- REQUEST PASSWORD RESET ----------
    const requestPasswordReset = async (data: ForgotPasswordRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            await authApi.requestPasswordReset(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- VERIFY PASSWORD RESET ----------
    const verifyPasswordReset = async (data: VerifyPasswordResetRequest) => {
        try {
            setIsLoading(true);
            setError(null);
            await authApi.verifyPasswordReset(data);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // ---------- LOGOUT ----------
    const logout = () => {
        authApi.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const fetchUserInfoHandler = React.useCallback(async () => {
        try {
            const data = await authApi.fetchUserInfo();
            setUserInfo(data);
            setUser(data);
        } catch (err) {
            console.error("Error fetching user info:", err);
        }
    }, []);

    const updateUserInfoHandler = React.useCallback(async (data: any) => {
        try {
            const updatedData = await authApi.updateUserInfo(data);
            setUserInfo(updatedData);
            setUser(updatedData);
        } catch (err) {
            console.error("Error updating user info:", err);
            handleError(err);
        }
    }, []);

    const uploadProfilePictureHandler = async (file: File) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await authApi.uploadProfilePicture(file);
            if (response.user) {
                setUser(response.user);
                setUserInfo(response.user);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                error,
                requestSignupOtp,
                verifyOtpAndSignup,
                login,
                requestPasswordReset,
                verifyPasswordReset,
                logout,
                clearError,
                userInfo,
                fetchUserInfo: fetchUserInfoHandler,
                updateUserInfo: updateUserInfoHandler,
                uploadProfilePicture: uploadProfilePictureHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};