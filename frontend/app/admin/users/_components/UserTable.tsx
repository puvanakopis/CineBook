'use client';

import { User } from '@/interfaces/userInterfaces';
import { MdEdit, MdBlock, MdCheckCircleOutline, MdDelete } from 'react-icons/md';
import { useState, useMemo, useEffect } from 'react';
import Pagination from '../../_components/Pagination';

interface UserTableProps {
    users: User[];
    onToggleStatus: (userId: string, currentStatus: boolean) => void;
    onDeleteUser: (userId: string) => void;
}

export function UserTable({ users, onToggleStatus, onDeleteUser }: UserTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return users.slice(startIndex, startIndex + itemsPerPage);
    }, [users, currentPage]);

    // Reset to first page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [users.length]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden h-fit">
            <div className="overflow-x-auto scrollbar-none">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-[#1a0f0f]">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">User</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Joined</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Bookings</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-center gap-3">
                                            {user.profilePicture ? (
                                                <img 
                                                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${user.profilePicture}`} 
                                                    alt={user.firstName}
                                                    className="size-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {user.firstName.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                                    {user.firstName} {user.lastName}
                                                </h4>
                                                <p className="text-xs text-slate-500 dark:text-[#b99d9d]">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' :
                                            user.role === 'manager' ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-slate-500/10 text-slate-400'
                                            }`}>
                                            {user.role === 'admin' ? 'Admin' : user.role === 'manager' ? 'Manager' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                        {user.totalBookings || 0}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.isActive
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                            <span className={`size-1.5 rounded-full ${user.isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                            {user.isActive ? 'Active' : 'Suspended'}
                                        </span>
                                        {user.lastActive && (
                                            <p className="text-[10px] text-slate-500 dark:text-[#b99d9d] mt-1 ml-1">
                                                {user.lastActive}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2b1a1a] text-slate-500 dark:text-[#b99d9d] transition-colors" title="Edit User">
                                                <MdEdit className="text-lg" />
                                            </button>
                                            {user.isActive ? (
                                                <button 
                                                    onClick={() => onToggleStatus(user._id, user.isActive)}
                                                    className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors" 
                                                    title="Suspend User"
                                                >
                                                    <MdBlock className="text-lg" />
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => onToggleStatus(user._id, user.isActive)}
                                                    className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-500 transition-colors" 
                                                    title="Activate User"
                                                >
                                                    <MdCheckCircleOutline className="text-lg" />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => onDeleteUser(user._id)}
                                                className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors" 
                                                title="Delete User"
                                            >
                                                <MdDelete className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                    No users match the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
            />
        </section>
    );
}
