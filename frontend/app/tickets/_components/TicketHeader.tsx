import { FiDownload } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface TicketHeaderProps {
    onPrintAll: () => void;
}

export default function TicketHeader({ onPrintAll }: TicketHeaderProps) {
    const router = useRouter();

    return (
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:hidden">
            <div>
                <button
                    onClick={() => router.push('/')}
                    className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm flex items-center gap-1 mb-4"
                >
                    <IoMdArrowBack className="text-base" />
                    Back to Home
                </button>
                <h1 className="text-3xl font-bold text-white mb-2">Your E-Tickets</h1>
                <p className="text-[var(--color-text-secondary)]">Present these tickets at the theater entrance.</p>
            </div>

            <button
                onClick={onPrintAll}
                className="bg-[var(--color-primary)] hover:bg-[#d01010] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg flex items-center gap-2"
            >
                <FiDownload className="text-lg" />
                Download All as PDF
            </button>
        </div>
    );
}
