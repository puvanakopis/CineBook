import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CiLock, CiMail } from "react-icons/ci";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequest } from "@/interfaces/authInterface";
import { useRouter } from "next/navigation";


interface LoginFormProps {
    setActiveTab: (tab: "login" | "register" | "forgot") => void;
}

export default function LoginForm({ setActiveTab }: LoginFormProps) {
    const router = useRouter();

    const { login, isLoading, error, clearError } = useAuth();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData);
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* Heading */}
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black">Welcome Back</h2>
                <p className="text-gray-500 dark:text-[#b99d9d]">Please enter your details to sign in.</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Email</span>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
                            <CiMail size={20} />
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 pl-12 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </div>
                </label>

                <label className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Password</span>
                        <button
                            type="button"
                            onClick={() => setActiveTab("forgot")}
                            className="text-xs font-bold text-primary hover:text-red-400"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
                            <CiLock size={20} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 pl-12 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineVisibility size={20} />}
                        </button>
                    </div>
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 h-12 w-full bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                    <span>{isLoading ? "Signing In..." : "Log In"}</span>
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