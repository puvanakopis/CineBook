import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { VerifyPasswordResetRequest } from "@/interfaces/authInterface";

export default function ForgotPasswordForm() {
    const { requestPasswordReset, verifyPasswordReset, isLoading, error, clearError } = useAuth();
    const [step, setStep] = useState<"email" | "reset">("email");
    const [email, setEmail] = useState("");
    const [resetData, setResetData] = useState<VerifyPasswordResetRequest>({
        email: "",
        otp: "",
        password: "",
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) clearError();
    };

    const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetData(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await requestPasswordReset({ email });
            setResetData(prev => ({ ...prev, email }));
            setStep("reset");
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerifyReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyPasswordReset(resetData);
            setStep("email");
            setEmail("");
            setResetData({ email: "", otp: "", password: "" });
        } catch (err) {
            console.error(err);
        }
    };

    const handleBack = () => {
        setStep("email");
        setResetData({ email: "", otp: "", password: "" });
        clearError();
    };

    if (step === "reset") {
        return (
            <>
                {/* Heading */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black">Reset Password</h2>
                    <p className="text-gray-500 dark:text-[#b99d9d]">Enter the OTP and your new password</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        {error}
                    </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleVerifyReset} className="flex flex-col gap-5">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold">OTP</span>
                        <input
                            type="text"
                            name="otp"
                            value={resetData.otp}
                            onChange={handleResetChange}
                            placeholder="Enter 6-digit OTP"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none text-center text-lg font-mono"
                            maxLength={6}
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold">New Password</span>
                        <input
                            type="password"
                            name="password"
                            value={resetData.password}
                            onChange={handleResetChange}
                            placeholder="Enter new password"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </label>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="h-12 flex-1 bg-gray-200 dark:bg-[#543b3b] hover:bg-gray-300 dark:hover:bg-[#6b4b4b] text-gray-700 dark:text-gray-300 font-bold rounded-lg flex items-center justify-center gap-2"
                        >
                            <IoArrowBack className="text-sm" />
                            <span>Back</span>
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || resetData.otp.length !== 6 || !resetData.password}
                            className="h-12 flex-1 bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                        >
                            <span>{isLoading ? "Resetting..." : "Reset Password"}</span>
                            {!isLoading && <IoArrowForward className="text-sm" />}
                        </button>
                    </div>
                </form>
            </>
        );
    }

    return (
        <>
            {/* Heading */}
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black">Forgot Password?</h2>
                <p className="text-gray-500 dark:text-[#b99d9d]">Enter your email to reset your password.</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleRequestReset} className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email to reset password"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 h-12 w-full bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                    <span>{isLoading ? "Sending OTP..." : "Send Reset OTP"}</span>
                    {!isLoading && <IoArrowForward className="text-sm" />}
                </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200 dark:border-[#543b3b]" />
                <span className="mx-4 text-xs font-bold text-gray-400 uppercase">Or continue with</span>
                <div className="flex-grow border-t border-gray-200 dark:border-[#543b3b]" />
            </div>

            {/* Social */}
            <div className="grid gap-4">
                <button className="h-12 flex items-center justify-center gap-3 bg-white dark:bg-[#392828] rounded-lg text-sm font-bold">
                    <FcGoogle size={24} />
                    Google
                </button>
            </div>
        </>
    );
}