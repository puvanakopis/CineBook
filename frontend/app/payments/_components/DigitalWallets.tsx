'use client';

import { IoWalletOutline } from "react-icons/io5";
import { SiGooglepay } from "react-icons/si";
import { FaApplePay } from "react-icons/fa";

interface DigitalWalletsProps {
    onConnectWallet: (wallet: string) => void;
}

export function DigitalWallets({ onConnectWallet }: DigitalWalletsProps) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <IoWalletOutline className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Digital Wallets</h3>
            </div>
            <div className="bg-[#291e1e]/30 rounded-xl border border-[#392828]/50 p-6">
                <p className="text-text-secondary text-sm mb-6">
                    Connect for one-tap checkout
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => onConnectWallet('Apple Pay')}
                        className="flex items-center justify-center gap-3 rounded-lg border border-[#392828] bg-[#1f1818] px-6 py-3 text-white transition-all hover:border-primary/40 hover:bg-[#251c1c] hover:-translate-y-0.5"
                    >
                        <FaApplePay className="text-primary text-2xl" />
                        <span className="font-bold text-sm">Apple Pay</span>
                    </button>
                    <button
                        onClick={() => onConnectWallet('Google Pay')}
                        className="flex items-center justify-center gap-3 rounded-lg border border-[#392828] bg-[#1f1818] px-6 py-3 text-white transition-all hover:border-primary/40 hover:bg-[#251c1c] hover:-translate-y-0.5"
                    >
                        <SiGooglepay className="text-primary text-2xl" />
                        <span className="font-bold text-sm">Google Pay</span>
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                        More wallets coming soon
                    </p>
                </div>
            </div>
        </section>
    );
}