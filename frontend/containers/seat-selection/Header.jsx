import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';

export default function Header({ movie, theater, hall, date, time }) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#392828] gap-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Link
                        href="/movies"
                        className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-base"><IoMdArrowBack /></span>
                        Back
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-white">Select Seats</h1>
                <p className="text-text-secondary text-sm mt-1">
                    {movie} • {date} • {time}
                </p>
            </div>
            <div className="flex flex-col items-end">
                <div className="px-4 py-2 bg-surface-dark border border-[#392828] rounded-lg shadow-lg flex items-center gap-3">
                    <div className="text-right">
                        <span className="block text-xs text-text-secondary uppercase font-bold tracking-wider">Theater</span>
                        <span className="block text-white font-bold">{theater}</span>
                    </div>
                    <div className="h-8 w-px bg-[#392828]"></div>
                    <div className="text-right">
                        <span className="block text-xs text-text-secondary uppercase font-bold tracking-wider">Hall</span>
                        <span className="block text-white font-bold">{hall}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}