'use client';

import { MdWarning } from 'react-icons/md';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    movieTitle?: string;
}

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    movieTitle,
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

                <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-xl max-w-md w-full p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                            <MdWarning className="text-2xl text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Delete Movie</h2>
                    </div>

                    <p className="text-slate-600 dark:text-[#b99d9d] mb-6">
                        Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{movieTitle}</span>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-[#392828] text-slate-700 dark:text-[#b99d9d] hover:bg-gray-50 dark:hover:bg-[#1f1212] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}