'use client';

import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { adminApi } from '@/services/adminApi';
import { toast } from 'react-hot-toast';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserAdded: () => void;
}

export function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await adminApi.createUser(formData);
            toast.success('User created successfully');
            onUserAdded();
            onClose();
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: 'user'
            });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-[#392828] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#392828]">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New User</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-[#2b1a1a] rounded-lg transition-colors">
                        <MdClose className="text-xl text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">First Name</label>
                            <input
                                required
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Last Name</label>
                            <input
                                required
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Email Address</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Password</label>
                        <input
                            required
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-500 dark:text-[#b99d9d] uppercase tracking-wider">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                        >
                            <option value="user">Customer</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 dark:border-[#392828] text-slate-600 dark:text-[#b99d9d] font-semibold hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
