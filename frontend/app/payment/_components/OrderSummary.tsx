import React from "react";
import Image from "next/image";
import getImage from '@/utils/imageUrl';
import { IoIosStarOutline, IoMdClose } from "react-icons/io";

interface Seat {
    id: string;
    row?: string;
    number?: number;
    type?: "standard" | "vip";
    price?: number;
    isAvailable?: boolean;
}

interface Meta {
    movie?: {
        poster?: string;
        title?: string;
        rating?: number | string;
        date?: string;
        time?: string;
    };
    date?: string;
    time?: string;
}

interface OrderSummaryProps {
    posterUrl?: string;
    title?: string;
    genre?: string;
    duration?: string;
    rating?: number | string;
    selectedSeats?: Seat[];
    onRemoveSeat?: (seatId: string) => void;
    standardCount?: number;
    standardPrice?: number;
    onProceedToPay?: () => void;
    seats?: Seat[];
    subtotal?: number;
    convenienceFee?: number;
    total?: number;
    meta?: Meta;
}

const OrderSummary: React.FC<OrderSummaryProps> = (props) => {
    const {
        posterUrl,
        title,
        rating,
        selectedSeats,
        onRemoveSeat,
        standardCount: scProp,
        onProceedToPay,
        seats,
        subtotal: subtotalProp,
        convenienceFee: convenienceFeeProp,
        total: totalProp,
        meta,
    } = props;

    const seatsList: Seat[] = (selectedSeats ?? seats) || [];
    const convenienceFee = typeof convenienceFeeProp === 'number' ? convenienceFeeProp : (props.convenienceFee ?? 0);
    const subtotal = typeof subtotalProp === 'number' ? subtotalProp : seatsList.reduce((s, x) => s + (x.price ?? 0), 0);
    const total = typeof totalProp === 'number' ? totalProp : subtotal + (convenienceFee || 0);
    const standardCount = typeof scProp === 'number' ? scProp : seatsList.filter(s => s.type === 'standard').length;

    const effectivePoster = posterUrl ?? meta?.movie?.poster;
    const effectiveTitle = title ?? meta?.movie?.title ?? 'Selected Movie';
    const rawRating = rating ?? meta?.movie?.rating;
    let parsedRating: number | undefined;
    if (rawRating == null || rawRating === '') {
        parsedRating = undefined;
    } else if (typeof rawRating === 'number') {
        parsedRating = rawRating;
    } else {
        const n = Number(rawRating);
        parsedRating = Number.isFinite(n) ? n : undefined;
    }
    const ratingNumber = parsedRating;
    const effectiveDate = meta?.date ?? meta?.movie?.date;
    const effectiveTime = meta?.time ?? meta?.movie?.time;

    const imageSrc = effectivePoster
        ? (String(effectivePoster).startsWith("http") ? String(effectivePoster) : getImage(String(effectivePoster), 'movies'))
        : "https://via.placeholder.com/150";

    const formatLKR = (amount: number) =>
        `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className="bg-surface-dark border border-[#392828] rounded-xl overflow-hidden sticky top-24 shadow-2xl">
            <div className="p-6 border-b border-[#392828] bg-black/20 flex gap-4">
                <Image
                    alt={effectiveTitle}
                    src={imageSrc}
                    width={120}
                    height={180}
                    className="rounded-md shadow-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{effectiveTitle}</h3>
                    <p className="text-text-secondary text-xs mb-2">
                        {effectiveDate && <span>  {effectiveDate}{effectiveTime ? ` • ${effectiveTime}` : ''}</span>}
                    </p>
                    <div className="flex items-center gap-1 bg-black/40 w-fit px-2 py-0.5 rounded text-xs border border-white/5">
                        <span className="material-symbols-outlined text-yellow-500 text-sm"><IoIosStarOutline /></span>
                        <span className="text-white font-bold">{ratingNumber != null ? ratingNumber.toFixed(1) : '-'}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Your Selection</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {seatsList.map(seat => (
                            <div
                                key={seat.id}
                                className={`px-3 py-1.5 bg-[#392828] text-white text-sm font-bold rounded flex items-center justify-between gap-2 border ${seat.type === "vip" ? "border-yellow-500/30 shadow-[0_2px_8px_rgba(234,179,8,0.1)]" : "border-primary/30 shadow-[0_2px_8px_rgba(236,19,19,0.1)]"}`}
                            >
                                <div className="flex items-baseline gap-3">
                                    <span>{seat.id}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-normal text-text-secondary">({formatLKR(seat.price ?? 0)})</span>
                                    {onRemoveSeat && (
                                        <button onClick={() => onRemoveSeat(seat.id)} className="hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm"><IoMdClose /></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {seatsList.length === 0 && <p className="text-text-secondary text-sm italic">No seats selected</p>}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#392828] border-dashed">
                    {standardCount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-text-secondary">Seat (x{standardCount})</span>
                            <span className="text-white font-medium">{formatLKR(subtotal)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary">Convenience Fee</span>
                        <span className="text-white font-medium">{formatLKR(convenienceFee)}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#221a1a] border-t border-[#392828]">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="text-text-secondary text-xs uppercase font-bold tracking-wider">Total Amount</span>
                        <p className="text-3xl font-bold text-white mt-1">{formatLKR(total)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
