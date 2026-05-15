'use client';

export function HeroSection() {
    return (
        <div className="relative overflow-hidden min-h-[180px]">
            <div className="relative z-10 flex flex-col justify-center h-full">
                <h2 className="text-white text-3xl font-bold mb-2">Welcome back, Admin</h2>
                <p className="text-gray-300 max-w-lg mb-6">
                    Here&apos;s what&apos;s happening in your theaters today. You have 4 upcoming shows in the next hour.
                </p>
            </div>
        </div>
    );
}