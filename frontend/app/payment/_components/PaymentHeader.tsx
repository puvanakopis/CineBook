import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentHeader({ movie, theater, hall, date, time }: { movie?: string, theater?: string, hall?: string, date?: string, time?: string }) {
    const router = useRouter();
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#392828] gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <button
                        onClick={() => router.back()}
                        className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-base"><IoMdArrowBack /></span>
                        Back to Seat Selection
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-white mt-2">Checkout</h1>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                    {movie || "Cyber Chronicles"} • {date || "Today, 14 Oct"} • {time || "06:00 PM"}
                </p>
            </div>
            <div className="flex flex-col items-end">
                <div className="px-4 py-2 bg-[var(--color-surface-dark)] border border-[#392828] rounded-lg shadow-lg flex items-center gap-3">
                    <div className="text-right">
                        <span className="block text-xs text-[var(--color-text-secondary)] uppercase font-bold tracking-wider">Theater</span>
                        <span className="block text-white font-bold">{theater || "Cineplex Downtown"}</span>
                    </div>
                    <div className="h-8 w-px bg-[#392828]"></div>
                    <div className="text-right">
                        <span className="block text-xs text-[var(--color-text-secondary)] uppercase font-bold tracking-wider">Hall</span>
                        <span className="block text-white font-bold">{hall || "4 - IMAX"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
