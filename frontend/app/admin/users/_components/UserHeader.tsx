export function UserHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    User Management
                </h2>
                <p className="text-slate-500 dark:text-[#b99d9d] text-sm mt-1">
                    Manage cinema staff and customer accounts with ease.
                </p>
            </div>
        </div>
    );
}