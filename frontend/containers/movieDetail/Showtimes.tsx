"use client";

import { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaWheelchair } from "react-icons/fa";

interface Showtime {
    time: string;
    price: number;
    currency: string;
    isSoldOut?: boolean;
}

interface Theater {
    theater_id: string;
    name: string;
    address: string;
    features: {
        mTicket: boolean;
        foodBeverage: boolean;
        parking: boolean;
        wheelchair: boolean;
    };
    showtimes: {
        standard: Showtime[];
        imax3d?: Showtime[];
    };
}

interface ShowtimesProps {
    theaters: Theater[];
}

const Showtimes = ({ theaters }: ShowtimesProps) => {
    const [selectedDate, setSelectedDate] = useState('14');

    const dates = [
        { day: '14', month: 'OCT', weekday: 'Today' },
        { day: '15', month: 'OCT', weekday: 'Sat' },
        { day: '16', month: 'OCT', weekday: 'Sun' },
        { day: '17', month: 'OCT', weekday: 'Mon' },
    ];

    return (
        <section className="w-full mx-auto px-4 md:px-20 lg:px-30 py-12 relative z-20" id="showtimes">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white border-l-4 border-primary pl-4">
                        Showtimes
                    </h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {dates.map((date) => (
                            <button
                                key={date.day}
                                onClick={() => setSelectedDate(date.day)}
                                className={`flex flex-col items-center justify-center min-w-[80px] h-16 rounded-lg border transition-all ${selectedDate === date.day
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                    : 'bg-surface-dark text-text-secondary border-[#392828] hover:border-primary hover:text-white'
                                    }`}
                            >
                                <span className="text-xs font-medium opacity-80">{date.month}</span>
                                <span className="text-xl font-bold">{date.day}</span>
                                <span className="text-xs font-medium">{date.weekday}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theater Listings */}
                <div className="space-y-6">
                    {theaters.map((theater) => (
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
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <span className="text-xs font-bold text-text-secondary uppercase w-16">
                                        Standard
                                    </span>
                                    <div className="flex flex-wrap gap-3">
                                        {theater.showtimes.standard.map((showtime, index) => (
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

                                {/* IMAX 3D Showtimes */}
                                {theater.showtimes.imax3d && (
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <span className="text-xs font-bold text-primary uppercase w-16">
                                            IMAX 3D
                                        </span>
                                        <div className="flex flex-wrap gap-3">
                                            {theater.showtimes.imax3d.map((showtime, index) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Showtimes;