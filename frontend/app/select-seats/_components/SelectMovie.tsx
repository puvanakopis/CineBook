import React from "react";
import Image from "next/image";
import { IoIosStarOutline, IoMdClose } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
    isAvailable: boolean;
}

interface SelectMovieProps {
    posterUrl: string;
    title: string;
    genre: string;
    duration: string;
    rating: number;
    selectedSeats: Seat[];
    onRemoveSeat: (seatId: string) => void;
    standardCount: number;
    vipCount: number;
    convenienceFee: number;
    total: number;
    onProceedToPay: () => void;
}

const SelectMovie: React.FC<SelectMovieProps> = ({
    posterUrl,
    title,
    genre,
    duration,
    rating,
    selectedSeats,
    onRemoveSeat,
    standardCount,
    vipCount,
    convenienceFee,
    total,
    onProceedToPay,
}) => {
    // Helper to format numbers as LKR
    const formatLKR = (amount: number) =>
        `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <div className="bg-surface-dark border border-[#392828] rounded-xl overflow-hidden sticky top-24 shadow-2xl">
            <div className="p-6 border-b border-[#392828] bg-black/20 flex gap-4">
                <Image
                    alt={title}
                    src={posterUrl}
                    width={120}
                    height={180}
                    className="rounded-md shadow-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{title}</h3>
                    <p className="text-text-secondary text-xs mb-2">
                        {genre} • {duration}
                    </p>
                    <div className="flex items-center gap-1 bg-black/40 w-fit px-2 py-0.5 rounded text-xs border border-white/5">
                        <span className="material-symbols-outlined text-yellow-500 text-sm"><IoIosStarOutline /></span>
                        <span className="text-white font-bold">{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                        Your Selection
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {selectedSeats.map(seat => (
                            <div
                                key={seat.id}
                                className={`px-3 py-1.5 bg-[#392828] text-white text-sm font-bold rounded flex items-center justify-between gap-2 border ${seat.type === "vip"
                                    ? "border-yellow-500/30 shadow-[0_2px_8px_rgba(234,179,8,0.1)]"
                                    : "border-primary/30 shadow-[0_2px_8px_rgba(236,19,19,0.1)]"
                                    }`}
                            >
                                {seat.id}{" "}
                                <span className="text-xs font-normal text-text-secondary">
                                    ({formatLKR(seat.price)})
                                </span>
                                <button
                                    onClick={() => onRemoveSeat(seat.id)}
                                    className="hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm"><IoMdClose /></span>
                                </button>
                            </div>
                        ))}
                        {selectedSeats.length === 0 && (
                            <p className="text-text-secondary text-sm italic">No seats selected</p>
                        )}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#392828] border-dashed">
                    {standardCount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-text-secondary">Standard Seat (x{standardCount})</span>
                            <span className="text-white font-medium">
                                {formatLKR(standardCount * 14)}
                            </span>
                        </div>
                    )}
                    {vipCount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-text-secondary">VIP Seat (x{vipCount})</span>
                            <span className="text-white font-medium">
                                {formatLKR(vipCount * 20)}
                            </span>
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
                        <span className="text-text-secondary text-xs uppercase font-bold tracking-wider">
                            Total Amount
                        </span>
                        <p className="text-3xl font-bold text-white mt-1">{formatLKR(total)}</p>
                    </div>
                </div>
                <button
                    className={`w-full py-4 bg-primary text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 group text-lg ${selectedSeats.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-700 hover:shadow-primary/30"
                        }`}
                    disabled={selectedSeats.length === 0}
                    onClick={onProceedToPay}
                >
                    Proceed to Pay
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        <IoArrowForward />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SelectMovie;