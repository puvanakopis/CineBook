'use client';

import { MdAdd } from 'react-icons/md';
import { FaRegCalendarAlt } from "react-icons/fa";


export function HeroSection() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-surface-dark min-h-[180px] shadow-xl">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGpAdmctuwjRQz1SrIRLYe9u4r5x9JYqfypS9OxD9WnwQd0Cpg9qSNX3e5yw3R1oc0_6adLy06CscGi4Qu2FRw-4eOiwfX1WwJYO28M541Uu-vh9ghaOOKr6nOUnfbZx0_UB87pdcDTFsHUaowS6Bm-BKv-ITuV4iCuBmM639AA5QhjUPnFrXvZM37FIxR7EN5AgZobXNZieBpffx5IjCgy5XeHFc4WFXEEoj3sLtWfElKDd17mnXs6C_vW34q6fINttvW1PXNJ2E2")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent" />

            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center h-full">
                <h2 className="text-white text-3xl font-bold mb-2">Welcome back, Admin</h2>
                <p className="text-gray-300 max-w-lg mb-6">
                    Here&apos;s what&apos;s happening in your theaters today. You have 4 upcoming shows in the next hour.
                </p>
                <div className="flex gap-3">
                    <button className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/30 flex items-center gap-2">
                        <MdAdd className="text-[20px]" />
                        Add Movie
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2">
                        <FaRegCalendarAlt className="text-[20px]" />
                        Schedule Show
                    </button>
                </div>
            </div>
        </div>
    );
}