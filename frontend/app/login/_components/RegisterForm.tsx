import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { SignupRequestOtpRequest } from "@/interfaces/authInterface";

export default function RegisterForm() {
    const { requestSignupOtp, verifyOtpAndSignup, isLoading, error, clearError } = useAuth();
    const [step, setStep] = useState<"details" | "otp">("details");
    const [formData, setFormData] = useState<SignupRequestOtpRequest>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
    });
    const [otp, setOtp] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await requestSignupOtp(formData);
            setStep("otp");
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyOtpAndSignup({ email: formData.email, otp });
            // Success handled by context
        } catch (err) {
            console.error( err);
        }
    };

    const handleBack = () => {
        setStep("details");
        setOtp("");
        clearError();
    };

    if (step === "otp") {
        return (
            <>
                {/* Heading */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-black">Verify Your Email</h2>
                    <p className="text-gray-500 dark:text-[#b99d9d]">Enter the OTP sent to {formData.email}</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        {error}
                    </div>
                )}

                {/* OTP Form */}
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold">OTP</span>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none text-center text-lg font-mono"
                            maxLength={6}
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
                            disabled={isLoading || otp.length !== 6}
                            className="h-12 flex-1 bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                        >
                            <span>{isLoading ? "Verifying..." : "Verify & Sign Up"}</span>
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
                <h2 className="text-3xl font-black">Create Account</h2>
                <p className="text-gray-500 dark:text-[#b99d9d]">Fill in your details to create a new account.</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold">First Name</span>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold">Last Name</span>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </label>
                </div>

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 h-12 w-full bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                    <span>{isLoading ? "Sending OTP..." : "Send OTP"}</span>
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