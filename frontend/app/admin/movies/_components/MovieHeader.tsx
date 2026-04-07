'use client';

import { MdAdd } from 'react-icons/md';

export function MovieHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Movie Management
                </h2>
                <p className="text-slate-500 dark:text-[#b99d9d] text-sm mt-1">
                    Manage all movies in your cinema catalog with ease.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
                    <MdAdd className="text-lg" />
                    Add Movie
                </button>
            </div>
        </div>
    );
}