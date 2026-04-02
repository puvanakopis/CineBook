'use client';

import { Sidebar } from "@/components/Sidebar";
import { SecurityHeader } from "./_components/SecurityHeader";
import { ChangePassword } from "./_components/ChangePassword";
import { TwoFactorAuth } from "./_components/TwoFactorAuth";
import { AccountManagement } from "./_components/AccountManagement";

export default function Security() {
    const handleUpdatePassword = (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
        console.log('Update password:', data);
        // Implement password update logic
    };

    const handleToggle2FA = (enabled: boolean) => {
        console.log('2FA toggled:', enabled);
        // Implement 2FA toggle logic
    };

    const handleDeactivateAccount = () => {
        console.log('Deactivate account');
        // Implement account deactivation logic
    };

    return (
        <div className="flex flex-1 w-full mx-auto">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-10">
                    <SecurityHeader />

                    <div className="space-y-12">
                        <ChangePassword onUpdatePassword={handleUpdatePassword} />
                        <TwoFactorAuth onToggle2FA={handleToggle2FA} />
                        <AccountManagement onDeactivateAccount={handleDeactivateAccount} />
                    </div>
                </div>
            </main>
        </div>
    );
}