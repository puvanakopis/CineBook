'use client';

import { useState } from "react";
import { IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface ChangePasswordProps {
    onUpdatePassword: (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => void;
    isLoading?: boolean;
}

export function ChangePassword({
    onUpdatePassword,
    isLoading = false,
}: ChangePasswordProps) {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onUpdatePassword(formData);

        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section>

            <div className="flex items-center gap-3 mb-8">
                <IoLockClosedOutline className="text-primary text-xl" />

                <h2 className="text-xl font-bold text-white tracking-wider">
                    Password Settings
                </h2>
            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    <div className="space-y-4">

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">

                            <div className="space-y-2 mb-4">
                                <h4 className="text-white font-semibold text-sm tracking-wide">
                                    Current Password
                                </h4>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    placeholder="Enter your current password"
                                    className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                >
                                    {showPasswords.current ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                </button>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">

                                <div className="space-y-2 mb-4">
                                    <h4 className="text-white font-semibold text-sm tracking-wide">
                                        New Password
                                    </h4>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('new')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                    >
                                        {showPasswords.new ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                    </button>
                                </div>

                            </div>

                            <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">

                                <div className="space-y-2 mb-4">
                                    <h4 className="text-white font-semibold text-sm tracking-wide">
                                        Confirm Password
                                    </h4>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                        className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                    >
                                        {showPasswords.confirm ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="pt-2 flex justify-end">

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-6 py-3 rounded-xl bg-primary hover:bg-red-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}