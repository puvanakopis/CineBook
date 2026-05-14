'use client';

import { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";

interface TwoFactorAuthProps {
    onToggle2FA: (enabled: boolean) => void;
}

export function TwoFactorAuth({
    onToggle2FA,
}: TwoFactorAuthProps) {

    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        const newState = !isEnabled;

        setIsEnabled(newState);
        onToggle2FA(newState);
    };

    return (
        <section>

            <div className="flex items-center gap-3 mb-8">
                <IoShieldCheckmarkOutline className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Security Settings
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                    <div className="flex-1 space-y-5">

                        <div className="space-y-2">

                            <h4 className="text-white font-semibold text-sm tracking-wide">
                                Two-Factor Authentication
                            </h4>

                            <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
                                Add an extra layer of protection to your account. When enabled,
                                you&apos;ll be required to verify your identity using a one-time
                                security code during sign in.
                            </p>

                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">

                            <MdOutlineInfo className="text-sm" />

                            <span className="tracking-wide uppercase">
                                Highly Recommended
                            </span>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 mt-1 ${isEnabled
                            ? 'bg-primary justify-end'
                            : 'bg-[#1a1414] border border-[#392828] justify-start'
                            }`}
                    >

                        <div
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${isEnabled
                                ? 'bg-white'
                                : 'bg-white/30'
                                }`}
                        />

                    </button>

                </div>

            </div>

        </section>
    );
}