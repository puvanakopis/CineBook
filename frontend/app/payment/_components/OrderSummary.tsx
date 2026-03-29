import React from "react";
import Image from "next/image";
import { IoIosStarOutline } from "react-icons/io";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
}

interface OrderSummaryProps {
    seats: Seat[];
    subtotal: number;
    convenienceFee: number;
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ seats, subtotal, convenienceFee, total }) => {
    const formatLKR = (amount: number) =>
        `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const standardCount = seats.filter(s => s.type === "standard").length;
    const vipCount = seats.filter(s => s.type === "vip").length;

    return (
        <div className="bg-[var(--color-surface-dark)] border border-[#392828] rounded-xl overflow-hidden sticky top-24 shadow-2xl">
            <div className="p-6 border-b border-[#392828] bg-black/20 flex gap-4">
                <Image
                    alt="Cyber Chronicles"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvw3Iq9pJqFd1KivIB51tyO1jy9jFbSkN9w08LctmE4KQXEiNLL2yzrMxjBatyPAPV9NEVdX11bhodeSTfRGLyKJHA4fSd3Foe0XjO3Fk75KIucJBXiGPV6fygqBWrnEdBlXY_9uNVbAn-yHDYhHlqtuAQfOrgfX1lUj6xdN6mlM0fSQlSofP8HzAUn_YWB_w6Gm3PceYzpZIFwMWYzVpkvX4x7zA1Gap3y4rqW7Rm920Jf2f7h0haie6n_FKgdYFzBWN5aat_76mm"
                    width={120}
                    height={180}
                    className="rounded-md shadow-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">Cyber Chronicles</h3>
                    <p className="text-[var(--color-text-secondary)] text-xs mb-2">
                        Sci-Fi • 2h 15m
                    </p>
                    <div className="flex items-center gap-1 bg-black/40 w-fit px-2 py-0.5 rounded text-xs border border-white/5">
                        <span className="material-symbols-outlined text-yellow-500 text-sm"><IoIosStarOutline /></span>
                        <span className="text-white font-bold">8.9</span>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                        Order Details
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {seats.map(seat => (
                            <div
                                key={seat.id}
                                className={`px-3 py-1.5 bg-[#392828] text-white text-sm font-bold rounded flex items-center justify-between gap-2 border ${seat.type === "vip"
                                    ? "border-yellow-500/30 shadow-[0_2px_8px_rgba(234,179,8,0.1)]"
                                    : "border-primary/30 shadow-[0_2px_8px_rgba(236,19,19,0.1)]"
                                    }`}
                            >
                                {seat.id} <span className="text-xs font-normal text-[var(--color-text-secondary)] capitalize">({seat.type})</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#392828] border-dashed">
                    {standardCount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[var(--color-text-secondary)]">Standard Seat (x{standardCount})</span>
                            <span className="text-white font-medium">{formatLKR(standardCount * 14)}</span>
                        </div>
                    )}
                     {vipCount > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[var(--color-text-secondary)]">VIP Seat (x{vipCount})</span>
                            <span className="text-white font-medium">{formatLKR(vipCount * 20)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[var(--color-text-secondary)]">Convenience Fee</span>
                        <span className="text-white font-medium">{formatLKR(convenienceFee)}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#221a1a] border-t border-[#392828]">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[var(--color-text-secondary)] text-xs uppercase font-bold tracking-wider">
                            Total Amount
                        </span>
                        <p className="text-3xl font-bold text-[var(--color-primary)] mt-1">{formatLKR(total)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
