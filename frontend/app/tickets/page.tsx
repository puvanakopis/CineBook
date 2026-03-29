"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TicketHeader from "./_components/TicketHeader";
import TicketCard from "./_components/TicketCard";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    price: number;
}

interface OrderData {
    seats: Seat[];
    subtotal: number;
    convenienceFee: number;
    total: number;
}

function TicketsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dataString = searchParams.get('data');

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [printingSeatId, setPrintingSeatId] = useState<string | null>(null);

    const movieDetails = {
        title: "Cyber Chronicles",
        theater: "Cineplex Downtown",
        hall: "4 - IMAX",
        date: "Today, 14 Oct",
        time: "06:00 PM",
        poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvw3Iq9pJqFd1KivIB51tyO1jy9jFbSkN9w08LctmE4KQXEiNLL2yzrMxjBatyPAPV9NEVdX11bhodeSTfRGLyKJHA4fSd3Foe0XjO3Fk75KIucJBXiGPV6fygqBWrnEdBlXY_9uNVbAn-yHDYhHlqtuAQfOrgfX1lUj6xdN6mlM0fSQlSofP8HzAUn_YWB_w6Gm3PceYzpZIFwMWYzVpkvX4x7zA1Gap3y4rqW7Rm920Jf2f7h0haie6n_FKgdYFzBWN5aat_76mm"
    };

    useEffect(() => {
        if (dataString) {
            try {
                const parsed = JSON.parse(decodeURIComponent(dataString));
                setOrderData(parsed);
            } catch (e) {
                console.error("Failed to parse order data", e);
            }
        }
    }, [dataString]);

    const handlePrintSingle = (seatId: string) => {
        setPrintingSeatId(seatId);
        setTimeout(() => {
            window.print();
            setPrintingSeatId(null);
        }, 100);
    };

    const handlePrintAll = () => {
        setPrintingSeatId(null);
        setTimeout(() => {
            window.print();
        }, 100);
    };

    if (!orderData || orderData.seats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 print:hidden">
                <h2 className="text-2xl font-bold text-white mb-4">No tickets found</h2>
                <p className="text-[var(--color-text-secondary)] mb-8">It seems you haven't completed a booking yet.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-[var(--color-primary)] hover:bg-[#d01010] text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                    Go to Homepage
                </button>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8">
            <TicketHeader onPrintAll={handlePrintAll} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {orderData.seats.map((seat) => (
                    <TicketCard
                        key={seat.id}
                        seat={seat}
                        movieDetails={movieDetails}
                        printingSeatId={printingSeatId}
                        onPrintSingle={handlePrintSingle}
                    />
                ))}
            </div>
        </div>
    );
}

export default function TicketsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[var(--color-input-bg)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
            </div>
        }>
            <TicketsContent />
        </Suspense>
    );
}
