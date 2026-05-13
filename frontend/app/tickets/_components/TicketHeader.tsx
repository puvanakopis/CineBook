import { FiDownload } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface TicketHeaderProps {
    onPrintAll: () => void;
}

export default function TicketHeader({ onPrintAll }: TicketHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#392828] gap-4 print:hidden">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <button
                        onClick={() => router.push("/")}
                        className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-base">
                            <IoMdArrowBack />
                        </span>
                        Back to Home
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-white mt-2">
                    Your E-Tickets
                </h1>

                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                    Present these tickets at the theater entrance.
                </p>
            </div>

            <div className="flex flex-col items-end">
                <button
                    onClick={onPrintAll}
                    className="px-4 py-3 bg-[var(--color-primary)] hover:bg-[#d01010] text-white font-medium rounded-lg shadow-lg flex items-center gap-2 transition-colors"
                >
                    <FiDownload className="text-lg" />
                    Download All as PDF
                </button>
            </div>
        </div>
    );
}