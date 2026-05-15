'use client';

import { Sidebar } from "@/components/Sidebar";
import { SecurityHeader } from "./_components/SecurityHeader";
import { ChangePassword } from "./_components/ChangePassword";
import { AccountManagement } from "./_components/AccountManagement";
import { SecurityNotifications } from "./_components/SecurityNotifications";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

export default function Security() {
    const { updatePassword, deactivateAccount, error, clearError, userInfo, updateUserInfo, isLoading } = useAuth();
    const router = useRouter();

    const handleUpdatePassword = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
        try {
            clearError();
            if (data.newPassword !== data.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            await updatePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            toast.success("Password updated successfully");
        } catch (err) {
            toast.error(error || "Failed to update password");
            console.error('Update password error:', err);
        }
    };

    const handleDeactivateAccount = async () => {
        if (confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
            try {
                clearError();
                await deactivateAccount();
                toast.success("Account deactivated successfully");
                router.push("/");
            } catch (err) {
                toast.error(error || "Failed to deactivate account");
                console.error('Deactivate account error:', err);
            }
        }
    };

    const handleUpdateNotifications = async (notifications: boolean) => {
        try {
            clearError();
            
            // Get current preferences or default
            const currentPreferences = userInfo?.preferences || {
                theme: "dark",
                favoriteGenres: [],
                preferredCinema: "",
            };

            await updateUserInfo({
                preferences: {
                    ...currentPreferences,
                    notifications
                }
            });
            
            toast.success("Notification settings updated");
        } catch (err) {
            toast.error("Failed to update notification settings");
            console.error('Update notifications error:', err);
        }
    };

    if (isLoading) {
        return <Loading message="Loading security settings..." />;
    }

    return (
        <div className="flex w-full min-h-screen bg-[#0b0909]">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">
                    <SecurityHeader />

                    <div className="space-y-12">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}
                        <ChangePassword onUpdatePassword={handleUpdatePassword} isLoading={isLoading} />
                        <SecurityNotifications 
                            notifications={userInfo?.preferences?.notifications} 
                            onUpdate={handleUpdateNotifications} 
                        />
                        <AccountManagement onDeactivateAccount={handleDeactivateAccount} isLoading={isLoading} />
                    </div>
                </div>
            </main>
        </div>
    );
}
