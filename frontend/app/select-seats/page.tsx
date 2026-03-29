"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectSeatsHeader from "./_components/SelectSeatsHeader";
import SeatSelection from "./_components/SelectSeats";
import MovieInfoPanel from "./_components/SelectMovie";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
    isAvailable: boolean;
}

const initialSeats: Seat[] = [
    // Row A
    { id: "A1", row: "A", number: 1, type: "standard", price: 14, isAvailable: true },
    { id: "A2", row: "A", number: 2, type: "standard", price: 14, isAvailable: true },
    { id: "A3", row: "A", number: 3, type: "standard", price: 14, isAvailable: false },
    { id: "A4", row: "A", number: 4, type: "standard", price: 14, isAvailable: false },
    { id: "A5", row: "A", number: 5, type: "standard", price: 14, isAvailable: true },
    { id: "A6", row: "A", number: 6, type: "standard", price: 14, isAvailable: true },
    { id: "A7", row: "A", number: 7, type: "standard", price: 14, isAvailable: true },
    { id: "A8", row: "A", number: 8, type: "standard", price: 14, isAvailable: true },
    // Row B
    { id: "B1", row: "B", number: 1, type: "standard", price: 14, isAvailable: true },
    { id: "B2", row: "B", number: 2, type: "standard", price: 14, isAvailable: true },
    { id: "B3", row: "B", number: 3, type: "standard", price: 14, isAvailable: true },
    { id: "B4", row: "B", number: 4, type: "standard", price: 14, isAvailable: true },
    { id: "B5", row: "B", number: 5, type: "standard", price: 14, isAvailable: true },
    { id: "B6", row: "B", number: 6, type: "standard", price: 14, isAvailable: true },
    { id: "B7", row: "B", number: 7, type: "standard", price: 14, isAvailable: true },
    { id: "B8", row: "B", number: 8, type: "standard", price: 14, isAvailable: true },
    // Row C
    { id: "C1", row: "C", number: 1, type: "standard", price: 14, isAvailable: true },
    { id: "C2", row: "C", number: 2, type: "standard", price: 14, isAvailable: true },
    { id: "C3", row: "C", number: 3, type: "standard", price: 14, isAvailable: false },
    { id: "C4", row: "C", number: 4, type: "standard", price: 14, isAvailable: true },
    { id: "C5", row: "C", number: 5, type: "standard", price: 14, isAvailable: true },
    { id: "C6", row: "C", number: 6, type: "standard", price: 14, isAvailable: true },
    { id: "C7", row: "C", number: 7, type: "standard", price: 14, isAvailable: false },
    { id: "C8", row: "C", number: 8, type: "standard", price: 14, isAvailable: false },
    // Row D
    { id: "D1", row: "D", number: 1, type: "standard", price: 14, isAvailable: true },
    { id: "D2", row: "D", number: 2, type: "standard", price: 14, isAvailable: true },
    { id: "D3", row: "D", number: 3, type: "standard", price: 14, isAvailable: true },
    { id: "D4", row: "D", number: 4, type: "standard", price: 14, isAvailable: true },
    { id: "D5", row: "D", number: 5, type: "standard", price: 14, isAvailable: true },
    { id: "D6", row: "D", number: 6, type: "standard", price: 14, isAvailable: true },
    { id: "D7", row: "D", number: 7, type: "standard", price: 14, isAvailable: true },
    { id: "D8", row: "D", number: 8, type: "standard", price: 14, isAvailable: true },
    // Row E - VIP
    { id: "E1", row: "E", number: 1, type: "vip", price: 20, isAvailable: true },
    { id: "E2", row: "E", number: 2, type: "vip", price: 20, isAvailable: true },
    { id: "E3", row: "E", number: 3, type: "vip", price: 20, isAvailable: true },
    { id: "E4", row: "E", number: 4, type: "vip", price: 20, isAvailable: true },
    { id: "E5", row: "E", number: 5, type: "vip", price: 20, isAvailable: true },
    { id: "E6", row: "E", number: 6, type: "vip", price: 20, isAvailable: true },
    { id: "E7", row: "E", number: 7, type: "vip", price: 20, isAvailable: false },
    { id: "E8", row: "E", number: 8, type: "vip", price: 20, isAvailable: false },
    // Row F - VIP
    { id: "F1", row: "F", number: 1, type: "vip", price: 20, isAvailable: true },
    { id: "F2", row: "F", number: 2, type: "vip", price: 20, isAvailable: true },
    { id: "F3", row: "F", number: 3, type: "vip", price: 20, isAvailable: true },
    { id: "F4", row: "F", number: 4, type: "vip", price: 20, isAvailable: true },
    { id: "F5", row: "F", number: 5, type: "vip", price: 20, isAvailable: true },
    { id: "F6", row: "F", number: 6, type: "vip", price: 20, isAvailable: true },
    { id: "F7", row: "F", number: 7, type: "vip", price: 20, isAvailable: true },
    { id: "F8", row: "F", number: 8, type: "vip", price: 20, isAvailable: true },
];

export default function SelectSeatsPage() {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const router = useRouter();

    const standardCount = selectedSeats.filter(seat => seat.type === "standard").length;
    const vipCount = selectedSeats.filter(seat => seat.type === "vip").length;
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = 3.5;
    const total = subtotal + convenienceFee;

    const removeSeat = (seatId: string) => {
        setSelectedSeats(prev => prev.filter(seat => seat.id !== seatId));
    };

    const handleProceedToPay = () => {
        if(selectedSeats.length === 0) return;
        const orderData = {
            seats: selectedSeats,
            subtotal,
            convenienceFee,
            total
        };
        const searchString = encodeURIComponent(JSON.stringify(orderData));
        router.push(`/payment?data=${searchString}`);
    };

    return (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8">
            <SelectSeatsHeader
                movie="Cyber Chronicles"
                theater="Cineplex Downtown"
                hall="4 - IMAX"
                date="Today, 14 Oct"
                time="06:00 PM"
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div className="flex-1 w-full">
                    <SeatSelection
                        seats={initialSeats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={setSelectedSeats}
                    />
                </div>

                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <MovieInfoPanel
                        posterUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDvw3Iq9pJqFd1KivIB51tyO1jy9jFbSkN9w08LctmE4KQXEiNLL2yzrMxjBatyPAPV9NEVdX11bhodeSTfRGLyKJHA4fSd3Foe0XjO3Fk75KIucJBXiGPV6fygqBWrnEdBlXY_9uNVbAn-yHDYhHlqtuAQfOrgfX1lUj6xdN6mlM0fSQlSofP8HzAUn_YWB_w6Gm3PceYzpZIFwMWYzVpkvX4x7zA1Gap3y4rqW7Rm920Jf2f7h0haie6n_FKgdYFzBWN5aat_76mm"
                        title="Cyber Chronicles"
                        genre="Sci-Fi"
                        duration="2h 15m"
                        rating={8.9}
                        selectedSeats={selectedSeats}
                        onRemoveSeat={removeSeat}
                        standardCount={standardCount}
                        vipCount={vipCount}
                        convenienceFee={convenienceFee}
                        total={total}
                        onProceedToPay={handleProceedToPay}
                    />
                </div>
            </div>
        </div>
    );
}