'use client';

interface AccountManagementProps {
    onDeactivateAccount: () => void;
}

export function AccountManagement({ onDeactivateAccount }: AccountManagementProps) {
    return (
        <section>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-xl font-bold">Account Management</h3>
            </div>
            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <p className="text-text-secondary text-sm mb-6">
                    Permanently remove your account and all associated data from Midnight Cinema. This action cannot be undone.
                </p>
                <button
                    onClick={onDeactivateAccount}
                    className="px-6 py-2.5 rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:bg-error-container/20 font-bold text-sm transition-all"
                >
                    Deactivate Account
                </button>
            </div>
        </section>
    );
}