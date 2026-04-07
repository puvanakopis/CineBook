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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const isAuth = authApi.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const userData = await authApi.getCurrentUser();
                    console.log(userData);
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
            console.log(response.user);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};