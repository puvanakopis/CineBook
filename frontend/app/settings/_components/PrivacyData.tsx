'use client';

import { MdLock } from 'react-icons/md';

interface PrivacyDataProps {
    dataSharing: boolean;
    onDataSharingChange: (value: boolean) => void;
}

export function PrivacyData({ dataSharing, onDataSharingChange }: PrivacyDataProps) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <MdLock className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Privacy & Data</h3>
            </div>

            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="max-w-lg">
                            <h4 className="text-lg font-semibold mb-1">Usage Data Sharing</h4>
                            <p className="text-sm text-text-secondary/80">
                                Allow Midnight Cinema to collect anonymized browsing data to improve your movie recommendations and personalized ticket offers.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-white/70  tracking-widest">
                                {dataSharing ? 'Enabled' : 'Disabled'}
                            </span>
                            <button
                                onClick={() => onDataSharingChange(!dataSharing)}
                                className={`w-14 h-7 rounded-full p-1 flex items-center transition-all ${dataSharing
                                        ? 'bg-primary justify-end'
                                        : 'bg-[#1e1616] justify-start border border-[#392828]'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full transition-all ${dataSharing ? 'bg-white' : 'bg-white/20'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#392828] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <MdLock className="text-primary text-base" />
                            <span>Your data is secured with industry standards AES-256 encryption.</span>
                        </div>
                        <a href="#" className="text-xs font-bold text-primary  tracking-[0.15em] hover:underline decoration-dashed underline-offset-4">
                            Read Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}