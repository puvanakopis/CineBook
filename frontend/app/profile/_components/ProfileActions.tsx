'use client';

export function ProfileActions() {
    const handleSave = () => {
        console.log("Saving changes...");
    };

    const handleCancel = () => {
        console.log("Cancelling changes...");
    };

    return (
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
            <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#392828] text-text-secondary hover:text-white hover:bg-[#291e1e] font-bold text-sm transition-all"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
            >
                Save Changes
            </button>
        </div>
    );
}