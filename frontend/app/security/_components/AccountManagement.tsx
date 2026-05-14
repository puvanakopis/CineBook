'use client';

import { IoWarningOutline } from "react-icons/io5";

interface AccountManagementProps {
    onDeactivateAccount: () => void;
}

export function AccountManagement({
    onDeactivateAccount,
}: AccountManagementProps) {

    return (
        <section>

            <div className="flex items-center gap-3 mb-8">

                <IoWarningOutline className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Account Management
                </h2>

            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">

                    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">

                        <div className="space-y-3 flex-1">

                            <h4 className="text-white font-semibold text-sm tracking-wide">
                                Deactivate Account
                            </h4>

                            <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
                                Permanently remove your Midnight Cinema account and erase all
                                associated personal data, booking history, saved preferences,
                                and account information. This action cannot be reversed once confirmed.
                            </p>

                            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">

                                <IoWarningOutline className="text-sm" />

                                <span className="uppercase tracking-wide">
                                    Permanent Action
                                </span>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onDeactivateAccount}
                            className="px-6 py-3 rounded-xl border border-[#4a2f2f] bg-[#241818] text-red-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 text-sm font-semibold tracking-wide transition-all duration-300"
                        >
                            Deactivate Account
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}