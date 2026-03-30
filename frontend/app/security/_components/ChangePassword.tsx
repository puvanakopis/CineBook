'use client';

import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";

interface ChangePasswordProps {
    onUpdatePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
}

export function ChangePassword({ onUpdatePassword }: ChangePasswordProps) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdatePassword(formData);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <IoLockClosedOutline className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Update Password</h3>
            </div>
            <div className="bg-[#291e1e]/30 p-6 rounded-xl border border-[#392828]/50">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter your current password"
                            className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full rounded-lg bg-surface-dark border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}