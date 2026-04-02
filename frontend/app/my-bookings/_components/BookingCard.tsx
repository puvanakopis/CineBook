'use client';

import Image from "next/image";
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoLocationOutline,
    IoQrCodeOutline,
    IoCheckmarkCircle,
    IoTime,
    IoCloseCircle
} from "react-icons/io5";
import { MdOutlineEventSeat } from "react-icons/md";

interface Booking {
    id: string;
    movieTitle: string;
    genres: string[];
    duration: string;
    poster: string;
    date: string;
    time: string;
    theater: string;
    seats: string[];
    status: 'confirmed' | 'pending' | 'cancelled';
    format: string;
    reference: string;
}

interface BookingCardProps {
    booking: Booking;
    onCancel: (id: string) => void;
    onModify: (id: string) => void;
    onViewTicket: (id: string) => void;
    onCompletePayment: (id: string) => void;
}

const statusConfig = {
    confirmed: {
        icon: IoCheckmarkCircle,
        text: 'Confirmed',
        color: 'emerald',
        bgClass: 'bg-emerald-500/10',
        textClass: 'text-emerald-500',
        borderClass: 'border-emerald-500/20'
    },
    pending: {
        icon: IoTime,
        text: 'Payment Pending',
        color: 'amber',
        bgClass: 'bg-amber-500/10',
        textClass: 'text-amber-500',
        borderClass: 'border-amber-500/20'
    },
    cancelled: {
        icon: IoCloseCircle,
        text: 'Cancelled',
        color: 'red',
        bgClass: 'bg-red-500/10',
        textClass: 'text-red-500',
        borderClass: 'border-red-500/20'
    }
};

export function BookingCard({ booking, onCancel, onModify, onViewTicket, onCompletePayment }: BookingCardProps) {
    const statusInfo = statusConfig[booking.status];
    const StatusIcon = statusInfo.icon;

    return (
        <div className="group relative overflow-hidden bg-[#291e1e]/30 rounded-2xl border border-[#392828] shadow-lg hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row h-full">
                {/* Poster Section */}
                <div className="w-full md:w-56 h-48 md:h-auto bg-gray-900 shrink-0 relative overflow-hidden">
                    <Image
                        src={booking.poster}
                        alt={booking.movieTitle}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md">
                            {booking.format}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow p-6 md:p-8 flex flex-col justify-between gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors">
                                {booking.movieTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                                <span>{booking.genres.join(', ')}</span>
                                <span className="w-1 h-1 bg-text-secondary rounded-full"></span>
                                <span>{booking.duration}</span>
                            </div>
                        </div>

                        <div className={`flex items-center gap-2 ${statusInfo.bgClass} px-3 py-1.5 rounded-lg text-xs font-bold border ${statusInfo.borderClass}`}>
                            <StatusIcon className="text-base" />
                            <span className={statusInfo.textClass}>{statusInfo.text}</span>
                        </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                <IoCalendarOutline className="text-sm" /> Date
                            </span>
                            <span className="text-white font-bold text-lg">{booking.date}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                <IoTimeOutline className="text-sm" /> Time
                            </span>
                            <span className="text-white font-bold text-lg">{booking.time}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                <IoLocationOutline className="text-sm" /> Theater
                            </span>
                            <span className="text-white font-bold text-lg">{booking.theater}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                <MdOutlineEventSeat className="text-sm" /> Seats
                            </span>
                            <span className="text-white font-bold text-lg">{booking.seats.join(', ')}</span>
                        </div>
                    </div>

                    <div className="h-px bg-[#392828]"></div>

                    {/* Actions Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full md:w-auto text-xs font-mono text-text-secondary bg-black/20 px-3 py-2 rounded border border-[#392828]">
                            REF: <span className="text-white font-bold">{booking.reference}</span>
                        </div>

                        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                            {booking.status !== 'cancelled' && (
                                <>
                                    <button
                                        onClick={() => onModify(booking.id)}
                                        className="w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-text-secondary hover:text-white transition-colors border border-transparent hover:border-[#392828] rounded-lg"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => onCancel(booking.id)}
                                        className="w-full sm:w-auto px-4 py-2.5 text-sm font-bold text-primary hover:text-red-400 transition-colors border border-transparent hover:border-primary/20 rounded-lg"
                                    >
                                        Cancel Booking
                                    </button>
                                </>
                            )}

                            {booking.status === 'confirmed' && (
                                <button
                                    onClick={() => onViewTicket(booking.id)}
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary hover:bg-red-700 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                >
                                    <IoQrCodeOutline className="text-xl" />
                                    View Ticket
                                </button>
                            )}

                            {booking.status === 'pending' && (
                                <button
                                    onClick={() => onCompletePayment(booking.id)}
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    Complete Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}