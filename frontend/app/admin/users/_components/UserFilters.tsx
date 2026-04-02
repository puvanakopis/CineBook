'use client';

interface UserFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedRole: string;
    setSelectedRole: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    roles: string[];
    statuses: string[];
}

export function UserFilters({
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
    roles,
    statuses,
}: UserFiltersProps) {
    return (
        <aside className="space-y-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] p-6 shadow-sm h-fit">
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold">
                            User filters
                        </p>
                        <p className="text-sm text-slate-400 dark:text-[#b99d9d]">
                            Search by name or email, and filter by role or status.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Search users
                    </label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Name or email"
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Role
                    </label>
                    <select
                        value={selectedRole}
                        onChange={(event) => setSelectedRole(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option>All Roles</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold block">
                        Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        className="w-full rounded-2xl border border-gray-200 dark:border-[#392828] bg-slate-100 dark:bg-[#120a0a] px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option>All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </aside>
    );
}
