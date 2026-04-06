
export interface User {
    email: string;
    role: 'user' | 'admin';
    firstName: string;
    lastName: string;
}

export interface SignupRequestOtpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

export interface SignupRequestOtpResponse {
    message: string;
    email: string;
}

export interface VerifyOtpAndSignupRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpAndSignupResponse {
    message: string;
    token?: string;
    user?: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    message: string;
    email: string;
}

export interface VerifyPasswordResetRequest {
    email: string;
    otp: string;
    password: string;
}

export interface VerifyPasswordResetResponse {
    message: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: unknown;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    // Signup
    requestSignupOtp: (data: SignupRequestOtpRequest) => Promise<void>;
    verifyOtpAndSignup: (data: VerifyOtpAndSignupRequest) => Promise<void>;
    
    // Login
    login: (data: LoginRequest) => Promise<void>;
    
    // Password Reset
    requestPasswordReset: (data: ForgotPasswordRequest) => Promise<void>;
    verifyPasswordReset: (data: VerifyPasswordResetRequest) => Promise<void>;
    
    // Logout
    logout: () => void;
    
    // Utility
    clearError: () => void;
}