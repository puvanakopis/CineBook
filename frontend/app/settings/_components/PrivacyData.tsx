'use client';

import { MdLock } from 'react-icons/md';

interface PrivacyDataProps {
    dataSharing: boolean;
    onDataSharingChange: (value: boolean) => void;
}

export function PrivacyData({
    dataSharing,
    onDataSharingChange,
}: PrivacyDataProps) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <MdLock className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Privacy & Data
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl space-y-10">

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                            Data Preferences
                        </h3>
                    </div>

                    <div className="space-y-4">

                        <div className="flex items-start justify-between gap-6 p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-1 max-w-md">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Usage Data Sharing
                                </h4>

                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Allow Midnight Cinema to collect anonymized browsing data to improve movie recommendations and personalized ticket offers.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => onDataSharingChange(!dataSharing)}
                                className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-300 ${dataSharing
                                        ? 'bg-primary justify-end'
                                        : 'bg-surface-dark border border-[#392828] justify-start'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${dataSharing ? 'bg-white' : 'bg-white/30'
                                        }`}
                                />
                            </button>

                        </div>

                    </div>
                </div>

                <div className="pt-6 border-t border-[#392828] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="flex items-start gap-3">
                        <MdLock className="text-primary text-lg mt-0.5" />

                        <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                            Your personal information is protected using industry-standard
                            AES-256 encryption and secure data handling practices.
                        </p>
                    </div>

                    <a
                        href="#"
                        className="text-sm font-semibold text-primary tracking-wide hover:underline underline-offset-4"
                    >
                        Read Privacy Policy
                    </a>
                </div>
            </div>
        </section>
    );
}