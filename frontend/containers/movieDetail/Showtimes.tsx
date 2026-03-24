"use client";

import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaWheelchair } from "react-icons/fa";
import { Theater, TimeSlot } from "@/interface/movie";

interface ShowtimesProps {
    theaters: Theater[];
    selectedDate: string;
    allDates: string[];
    onDateSelect: (date: string) => void;
    formatDateDisplay: (dateString: string) => { day: string; month: string; weekday: string };
    getShowtimesForDate: (theater: Theater, date: string) => { standard: TimeSlot[]; imax3d: TimeSlot[] };
}

const Showtimes = ({
    theaters,
    selectedDate,
    allDates,
    onDateSelect,
    formatDateDisplay,
    getShowtimesForDate
}: ShowtimesProps) => {
    return (
        <section className="w-full mx-auto px-4 md:px-20 lg:px-30 py-12 relative z-20" id="showtimes">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white border-l-4 border-primary pl-4">
                        Showtimes
                    </h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {allDates.map((date) => {
                            const { day, month, weekday } = formatDateDisplay(date);
                            return (
                                <button
                                    key={date}
                                    onClick={() => onDateSelect(date)}
                                    className={`flex flex-col items-center justify-center min-w-[80px] h-16 rounded-lg border transition-all ${selectedDate === date
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                        : 'bg-surface-dark text-text-secondary border-[#392828] hover:border-primary hover:text-white'
                                        }`}
                                >
                                    <span className="text-xs font-medium opacity-80">{month}</span>
                                    <span className="text-xl font-bold">{day}</span>
                                    <span className="text-xs font-medium">{weekday}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Theater Listings */}
                <div className="space-y-6">
                    {theaters.map((theater) => {
                        const { standard, imax3d } = getShowtimesForDate(theater, selectedDate);
                        const hasShowtimes = standard.length > 0 || imax3d.length > 0;

                        if (!hasShowtimes) return null;

                        return (
                            <div
                                key={theater.theater_id}
                                className="bg-surface-dark rounded-xl border border-[#392828] p-6"
                            >
                                {/* Theater Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#392828] pb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <MdOutlineTheaterComedy className="text-primary" />
                                            {theater.name}
                                        </h3>
                                        <p className="text-text-secondary text-sm mt-1 ml-8">{theater.address}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                                        <span className="flex items-center gap-1">
                                            {theater.features.mTicket ? (
                                                <FaRegCheckCircle className="text-green-500" />
                                            ) : (
                                                <MdOutlineCancel className="text-text-secondary/50" />
                                            )}
                                            M-Ticket
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {theater.features.foodBeverage ? (
                                                <MdOutlineFastfood className="text-yellow-500" />
                                            ) : (
                                                <MdOutlineCancel className="text-text-secondary/50" />
                                            )}
                                            F&B
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {theater.features.parking ? (
                                                <FaParking className="text-blue-500" />
                                            ) : (
                                                <MdOutlineCancel className="text-text-secondary/50" />
                                            )}
                                            Parking
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {theater.features.wheelchair ? (
                                                <FaWheelchair className="text-purple-500" />
                                            ) : (
                                                <MdOutlineCancel className="text-text-secondary/50" />
                                            )}
                                            Wheelchair
                                        </span>
                                    </div>
                                </div>

                                {/* Showtimes */}
                                <div className="space-y-4">
                                    {/* Standard Showtimes */}
                                    {standard.length > 0 && (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <span className="text-xs font-bold text-text-secondary uppercase w-16">
                                                Standard
                                            </span>
                                            <div className="flex flex-wrap gap-3">
                                                {standard.map((showtime, index) => (
                                                    <button
                                                        key={index}
                                                        disabled={showtime.isSoldOut}
                                                        className={`group px-4 py-2 rounded border transition-all text-sm font-medium ${showtime.isSoldOut
                                                            ? 'opacity-50 cursor-not-allowed bg-[#221a1a] border-[#392828]'
                                                            : 'border-[#392828] bg-[#221a1a] hover:bg-primary hover:border-primary'
                                                            }`}
                                                    >
                                                        <span className={showtime.isSoldOut ? 'text-white/50' : 'text-white'}>
                                                            {showtime.time}
                                                        </span>
                                                        <div className="text-[10px] text-text-secondary group-hover:text-white/80 mt-0.5">
                                                            {showtime.isSoldOut ? 'Sold Out' : `${showtime.currency} ${showtime.price.toFixed(2)}`}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* IMAX 3D Showtimes */}
                                    {imax3d.length > 0 && (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <span className="text-xs font-bold text-primary uppercase w-16">
                                                IMAX 3D
                                            </span>
                                            <div className="flex flex-wrap gap-3">
                                                {imax3d.map((showtime, index) => (
                                                    <button
                                                        key={index}
                                                        disabled={showtime.isSoldOut}
                                                        className={`group px-4 py-2 rounded border transition-all text-sm font-medium ${showtime.isSoldOut
                                                            ? 'opacity-50 cursor-not-allowed bg-[#221a1a] border-[#392828]'
                                                            : 'border-[#392828] bg-[#221a1a] hover:bg-primary hover:border-primary'
                                                            }`}
                                                    >
                                                        <span className={showtime.isSoldOut ? 'text-white/50' : 'text-white'}>
                                                            {showtime.time}
                                                        </span>
                                                        <div className="text-[10px] text-text-secondary group-hover:text-white/80 mt-0.5">
                                                            {showtime.isSoldOut ? 'Sold Out' : `${showtime.currency} ${showtime.price.toFixed(2)}`}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Showtimes;