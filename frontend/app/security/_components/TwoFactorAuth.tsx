'use client';

import { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";

interface TwoFactorAuthProps {
    onToggle2FA: (enabled: boolean) => void;
}

export function TwoFactorAuth({ onToggle2FA }: TwoFactorAuthProps) {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        onToggle2FA(newState);
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <IoShieldCheckmarkOutline className="text-primary text-2xl" />
                    <h3 className="text-white text-xl font-bold">Two-Factor Authentication</h3>
                </div>
            </div>
            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            Add an extra layer of security to your account. When enabled, you&apos;ll need to provide a unique code from your authenticator app or SMS to sign in.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                                <MdOutlineInfo className="text-sm" />
                                <span className="uppercase tracking-wider">Highly Recommended</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isEnabled}
                                onChange={handleToggle}
                            />
                            <div className="relative w-11 h-6 bg-[#291e1e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}