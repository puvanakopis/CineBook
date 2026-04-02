'use client';

import { MdPersonAdd } from 'react-icons/md';

export function UserHeader() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-surface-dark min-h-[180px] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent" />

            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center h-full">
                <h1 className="text-white text-3xl font-bold mb-2">Users</h1>
                <p className="text-gray-300 max-w-lg mb-6">
                    Manage cinema staff and customer accounts, monitor activity, and handle permissions.
                </p>
                <div className="flex gap-3">
                    <button className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/30 flex items-center gap-2">
                        <MdPersonAdd className="text-[20px]" />
                        Add New User
                    </button>
                </div>
            </div>
        </div>
    );
}
