import React from "react";
import { IoIosStarOutline, IoMdClose } from "react-icons/io";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
    isAvailable: boolean;
}

interface SelectSeatsProps {
    seats: Seat[];
    selectedSeats: Seat[];
    onSeatSelect: (seats: Seat[]) => void;
}

const SelectSeats: React.FC<SelectSeatsProps> = ({
    seats,
    selectedSeats,
    onSeatSelect,
}) => {
    const handleSeatClick = (seat: Seat) => {
        if (!seat.isAvailable) return;

        const isSelected = selectedSeats.some((s) => s.id === seat.id);
        let newSelectedSeats: Seat[];

        if (isSelected) {
            newSelectedSeats = selectedSeats.filter((s) => s.id !== seat.id);
        } else {
            newSelectedSeats = [...selectedSeats, seat];
        }

        onSeatSelect(newSelectedSeats);
    };

    const getSeatClasses = (seat: Seat) => {
        const baseClasses = "transition-all flex items-center justify-center";
        const isSelected = selectedSeats.some((s) => s.id === seat.id);

        if (!seat.isAvailable) {
            return `${baseClasses} bg-[#221a1a] opacity-40 cursor-not-allowed text-text-secondary`;
        }

        if (isSelected) {
            if (seat.type === "vip") {
                return `${baseClasses} bg-yellow-500 text-black border border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] font-bold text-sm transform scale-110`;
            }
            return `${baseClasses} bg-primary text-white shadow-[0_0_10px_rgba(236,19,19,0.5)] font-bold text-xs transform scale-105`;
        }

        if (seat.type === "vip") {
            return `${baseClasses} bg-[#392828] border border-yellow-500/30 text-yellow-500/50 hover:bg-yellow-500/20 hover:text-yellow-500 hover:border-yellow-500`;
        }

        return `${baseClasses} bg-[#392828] border-b-2 border-transparent hover:bg-primary/40 hover:border-primary group relative`;
    };

    const getSeatSize = (type: "standard" | "vip") => {
        return type === "vip" ? "w-10 h-9 rounded-t-lg" : "w-8 h-8 rounded-t-md";
    };

    const renderSeatContent = (seat: Seat) => {
        if (!seat.isAvailable) {
            return <span className="material-symbols-outlined text-sm"><IoMdClose /></span>;
        }

        if (selectedSeats.some((s) => s.id === seat.id)) {
            if (seat.type === "vip") {
                return <span className="font-bold text-sm">{seat.number}</span>;
            }
            return <span className="font-bold text-xs">{seat.number}</span>;
        }

        if (seat.type === "vip") {
            return <span className="material-symbols-outlined text-sm"><IoIosStarOutline /></span>;
        }

        return null;
    };

    const seatsByRow = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) acc[seat.row] = [];
        acc[seat.row].push(seat);
        return acc;
    }, {} as Record<string, Seat[]>);

    const rows = Object.keys(seatsByRow).sort();

    const splitIntoGroups = (rowSeats: Seat[], isVipRow: boolean) => {
        const groups: Seat[][] = [];
        if (!isVipRow) {
            if (rowSeats.length >= 8) {
                groups.push(rowSeats.slice(0, 2));
                groups.push(rowSeats.slice(2, 6));
                groups.push(rowSeats.slice(6, 8));
            } else {
                groups.push(rowSeats);
            }
        } else {
            if (rowSeats.length >= 8) {
                groups.push(rowSeats.slice(0, 2));
                groups.push(rowSeats.slice(2, 6));
                groups.push(rowSeats.slice(6, 8));
            } else {
                groups.push(rowSeats);
            }
        }
        return groups.filter(g => g.length > 0);
    };

    return (
        <div className="flex-1 w-full bg-surface-dark/30 rounded-2xl border border-[#392828] p-6 lg:p-10 relative overflow-hidden">
            <div className="flex flex-col items-center mb-16 relative">
                <div className="w-3/4 h-24 bg-gradient-to-b from-primary/10 to-transparent absolute -top-10 blur-2xl rounded-full"></div>
                <div className="w-[80%] h-4 border-t-[4px] border-primary/40 rounded-t-[50%] shadow-[0_-8px_20px_rgba(236,19,19,0.2)]"></div>
                <p className="text-text-secondary/50 text-xs font-medium uppercase tracking-[0.2em] mt-6">
                    Screen
                </p>
            </div>

            <div className="overflow-x-auto pb-12 flex justify-center">
                <div className="min-w-[600px] flex flex-col items-center gap-4 select-none">
                    <div className="flex flex-col gap-3 w-full items-center mb-4">
                        {rows.map((row) => {
                            const rowSeats = seatsByRow[row];
                            const isVipRow = rowSeats[0]?.type === "vip";
                            const groups = splitIntoGroups(rowSeats, isVipRow);
                            const gapClass = isVipRow ? "gap-3" : "gap-2";

                            return (
                                <div key={row} className="flex items-center gap-8">
                                    <span className="w-4 text-text-secondary text-xs font-bold text-right">
                                        {row}
                                    </span>
                                    {groups.map((group, groupIdx) => (
                                        <div key={groupIdx} className={`flex ${gapClass}`}>
                                            {group.map((seat) => (
                                                <button
                                                    key={seat.id}
                                                    onClick={() => handleSeatClick(seat)}
                                                    className={`${getSeatSize(seat.type)} ${getSeatClasses(seat)}`}
                                                    title={`${seat.row}${seat.number} - $${seat.price}`}
                                                    disabled={!seat.isAvailable}
                                                >
                                                    {renderSeatContent(seat)}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-full h-px bg-[#392828] my-2"></div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[#392828] border border-white/10"></div>
                            <span className="text-sm text-text-secondary font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-primary shadow-lg shadow-primary/30"></div>
                            <span className="text-sm text-text-secondary font-medium">Selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[#221a1a] flex items-center justify-center text-text-secondary/50 border border-white/5">
                                <span className="material-symbols-outlined text-sm"><IoMdClose /></span>
                            </div>
                            <span className="text-sm text-text-secondary font-medium">Booked</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-[#392828] border border-yellow-500 text-yellow-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xs"><IoIosStarOutline /></span>
                            </div>
                            <span className="text-sm text-text-secondary font-medium">VIP ($20)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectSeats;