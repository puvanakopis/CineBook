'use client';

import { IoWalletOutline } from "react-icons/io5";
import { SiGooglepay } from "react-icons/si";

interface DigitalWalletsProps {
    onConnectWallet: (wallet: string) => void;
}

export function DigitalWallets({ onConnectWallet }: DigitalWalletsProps) {
    return (
        <section className="rounded-3xl border border-[#392828] bg-[#291e1e]/70 p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">
                        Digital Wallets
                    </p>
                    <h3 className="text-lg font-bold text-white mt-2">Connect a wallet</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                        onClick={() => onConnectWallet('Apple Pay')}
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#392828] bg-[#1f1818] px-6 py-4 text-white transition hover:border-primary/40 hover:bg-[#251c1c]"
                    >
                        <IoWalletOutline className="text-primary text-xl" />
                        <span className="font-bold">Apple Pay</span>
                    </button>
                    <button
                        onClick={() => onConnectWallet('Google Pay')}
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#392828] bg-[#1f1818] px-6 py-4 text-white transition hover:border-primary/40 hover:bg-[#251c1c]"
                    >
                        <SiGooglepay className="text-primary text-xl" />
                        <span className="font-bold">Google Pay</span>
                    </button>
                </div>
            </div>
        </section>
    );
}