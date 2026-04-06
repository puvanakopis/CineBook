'use client';

import { User } from '@/interfaces/user';
import { MdEdit, MdBlock, MdCheckCircleOutline } from 'react-icons/md';

interface UserTableProps {
    users: User[];
}

export function UserTable({ users }: UserTableProps) {
    return (
        <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden h-fit">
            <div className="p-6 border-b border-gray-200 dark:border-[#392828] flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Users</h3>
                    <p className="text-sm text-slate-500 dark:text-[#b99d9d] mt-1">
                        View and manage all registered accounts in the system.
                    </p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold">
                    {users.length} results
                </span>
            </div>

            <div className="overflow-x-auto">
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
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</h4>
                                                <p className="text-xs text-slate-500 dark:text-[#b99d9d]">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400' :
                                                user.role === 'Manager' ? 'bg-blue-500/10 text-blue-400' :
                                                    'bg-slate-500/10 text-slate-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                        {user.joinDate}
                                    </td>
                                    <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                        {user.totalBookings}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                            <span className={`size-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                            {user.status}
                                        </span>
                                        <p className="text-[10px] text-slate-500 dark:text-[#b99d9d] mt-1 ml-1">
                                            {user.lastActive}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2b1a1a] text-slate-500 dark:text-[#b99d9d] transition-colors" title="Edit User">
                                                <MdEdit className="text-lg" />
                                            </button>
                                            {user.status === 'Active' ? (
                                                <button className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors" title="Suspend User">
                                                    <MdBlock className="text-lg" />
                                                </button>
                                            ) : (
                                                <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-500 transition-colors" title="Activate User">
                                                    <MdCheckCircleOutline className="text-lg" />
                                                </button>
                                            )}
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
        </section>
    );
}
