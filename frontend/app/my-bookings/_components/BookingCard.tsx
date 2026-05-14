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
import { Booking } from "@/interfaces/bookingInterface";
import { getImage } from "@/utils/imageUrl";

interface BookingCardProps {
    booking: Booking;
    onCancel: (id: string) => void;
    onModify: (id: string) => void;
    onViewTicket: (id: string) => void;
    onCompletePayment: (id: string) => void;
}

const statusConfig = {
    Confirmed: {
        icon: IoCheckmarkCircle,
        text: 'Confirmed',
        bg: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        border: 'border-emerald-500/20'
    },
    Cancelled: {
        icon: IoCloseCircle,
        text: 'Cancelled',
        bg: 'bg-red-500/10',
        textColor: 'text-red-400',
        border: 'border-red-500/20'
    },
    Completed: {
        icon: IoCheckmarkCircle,
        text: 'Completed',
        bg: 'bg-blue-500/10',
        textColor: 'text-blue-400',
        border: 'border-blue-500/20'
    }
};

export function BookingCard({
    booking,
    onCancel,
    onModify,
    onViewTicket,
    onCompletePayment
}: BookingCardProps) {

    const status = statusConfig[booking.status] || statusConfig.Pending;
    const StatusIcon = status.icon;

    const seatsLabel = Array.isArray(booking.seats)
        ? booking.seats
            .map(s => typeof s === 'string' ? s : (s.id || (s.row && s.number ? `${s.row}${s.number}` : '')))
            .filter(Boolean)
            .join(', ')
        : 'No seats';

    const bookingDate = new Date(booking.dateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const bookingTime = booking.showTime || new Date(booking.dateTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const bookingId = (booking._id || booking.id) as string;

    return (
        <div className="bg-[#1a1414] p-6 rounded-xl border border-[#392828] shadow-2xl">

            <div className="flex flex-col lg:flex-row gap-6">

                {/* Poster */}
                <div className="relative w-full lg:w-52 h-56 rounded-lg overflow-hidden border border-[#392828]">
                    <Image
                        src={(getImage(booking.poster || '') as string) || '/placeholder-poster.jpg'}
                        alt={booking.movieTitle}
                        fill
                        className="object-cover"
                    />

                    {booking.format && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                            {booking.format}
                        </div>
                    )}
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
                                {booking.genres?.join(', ') || 'N/A'} • {booking.duration || 'N/A'}
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
                            <p className="text-white font-semibold">{bookingDate}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <IoTimeOutline /> Time
                            </p>
                            <p className="text-white font-semibold">{bookingTime}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary flex items-center gap-1">
                                <IoLocationOutline /> Theater
                            </p>
                            <p className="text-white font-semibold">{booking.theaterName}</p>
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
                            REF: <span className="text-white">{bookingId}</span>
                        </span>

                        <div className="flex flex-wrap gap-3">

                            {booking.status === 'Confirmed' && (
                                <>
                                    <button
                                        onClick={() => onModify(bookingId)}
                                        className="text-sm text-text-secondary hover:text-white"
                                    >
                                        Modify
                                    </button>

                                    <button
                                        onClick={() => onCancel(bookingId)}
                                        className="text-sm text-primary hover:text-red-400"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                            {(booking.status === 'Confirmed' || booking.status === 'Completed') && (
                                <button
                                    onClick={() => onViewTicket(bookingId)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2"
                                >
                                    <IoQrCodeOutline />
                                    Ticket
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}