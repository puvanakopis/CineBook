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
    seats: Array<string | { id?: string; row?: string; number?: number }>;
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
        bg: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        border: 'border-emerald-500/20'
    },
    pending: {
        icon: IoTime,
        text: 'Payment Pending',
        bg: 'bg-amber-500/10',
        textColor: 'text-amber-400',
        border: 'border-amber-500/20'
    },
    cancelled: {
        icon: IoCloseCircle,
        text: 'Cancelled',
        bg: 'bg-red-500/10',
        textColor: 'text-red-400',
        border: 'border-red-500/20'
    }
};

export function BookingCard({
    booking,
    onCancel,
    onModify,
    onViewTicket,
    onCompletePayment
}: BookingCardProps) {

    const status = statusConfig[booking.status];
    const StatusIcon = status.icon;

    const seatsLabel = Array.isArray(booking.seats)
        ? booking.seats
            .map(s => typeof s === 'string' ? s : (s.id ?? (s.row && s.number ? `${s.row}${s.number}` : '')))
            .filter(Boolean)
            .join(', ')
        : String(booking.seats || '');

    return (
        <div className="bg-[#1a1414] p-6 rounded-xl border border-[#392828] shadow-2xl">

            <div className="flex flex-col lg:flex-row gap-6">

                {/* Poster */}
                <div className="relative w-full lg:w-52 h-56 rounded-lg overflow-hidden border border-[#392828]">
                    <Image
                        src={booking.poster}
                        alt={booking.movieTitle}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                        {booking.format}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between gap-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {booking.movieTitle}
                            </h3>

                            <p className="text-text-secondary text-sm mt-1">
                                {booking.genres.join(', ')} • {booking.duration}
                            </p>
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${status.bg} ${status.border}`}>
                            <StatusIcon className={`text-base ${status.textColor}`} />
                            <span className={status.textColor}>
                                {status.text}
                            </span>
                        </div>

                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <IoCalendarOutline /> Date
                            </p>
                            <p className="text-white font-semibold">{booking.date}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <IoTimeOutline /> Time
                            </p>
                            <p className="text-white font-semibold">{booking.time}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <IoLocationOutline /> Theater
                            </p>
                            <p className="text-white font-semibold">{booking.theater}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <MdOutlineEventSeat /> Seats
                            </p>
                            <p className="text-white font-semibold">{seatsLabel}</p>
                        </div>

                    </div>

                    <div className="h-px bg-[#392828]" />

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                        <span className="text-xs font-mono text-text-secondary">
                            REF: <span className="text-white">{booking.reference}</span>
                        </span>

                        <div className="flex flex-wrap gap-3">

                            {booking.status !== 'cancelled' && (
                                <>
                                    <button
                                        onClick={() => onModify(booking.id)}
                                        className="text-sm text-text-secondary hover:text-white"
                                    >
                                        Modify
                                    </button>

                                    <button
                                        onClick={() => onCancel(booking.id)}
                                        className="text-sm text-primary hover:text-red-400"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            {booking.status === 'confirmed' && (
                                <button
                                    onClick={() => onViewTicket(booking.id)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2"
                                >
                                    <IoQrCodeOutline />
                                    Ticket
                                </button>
                            )}

                            {booking.status === 'pending' && (
                                <button
                                    onClick={() => onCompletePayment(booking.id)}
                                    className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold"
                                >
                                    Pay Now
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}