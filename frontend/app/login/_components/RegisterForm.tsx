import { FcGoogle } from "react-icons/fc";
import { IoArrowForward } from "react-icons/io5";

export default function RegisterForm() {
    return (
        <>
            {/* Heading */}
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black">Create Account</h2>
                <p className="text-gray-500 dark:text-[#b99d9d]">Fill in your details to create a new account.</p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Email</span>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Password</span>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Confirm Password</span>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full h-12 bg-white dark:bg-[#392828] border border-gray-200 dark:border-transparent rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                </label>

                <button
                    type="button"
                    className="mt-2 h-12 w-full bg-primary hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
                >
                    <span>Create Account</span>
                    <IoArrowForward className="text-sm" />
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