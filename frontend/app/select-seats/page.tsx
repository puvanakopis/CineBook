"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { theaterApi } from '@/services/theaterApi';
import SelectSeatsHeader from "./_components/SelectSeatsHeader";
import SeatSelection from "./_components/SelectSeats";
import MovieInfoPanel from "./_components/SelectMovie";

interface Seat {
    id: string;
    row: string;
    number: number;
    type: "standard";
    price: number;
    isAvailable: boolean;
}

const defaultStandardPrice = 14;

const generateSeats = (standardPrice: number): Seat[] => {
    const rows = [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
        { id: 'F' },
    ];

    const seats: Seat[] = [];
    rows.forEach((r) => {
        for (let i = 1; i <= 8; i++) {
            seats.push({
                id: `${r.id}${i}`,
                row: r.id,
                number: i,
                type: 'standard',
                price: standardPrice,
                isAvailable: Math.random() > 0.1,
            });
        }
    });
    return seats;
};

export default function SelectSeatsPage() {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [seats, setSeats] = useState<Seat[]>(generateSeats(defaultStandardPrice));
    const [standardPrice, setStandardPrice] = useState<number>(defaultStandardPrice);

    const router = useRouter();
    const searchParams = useSearchParams();
    const dataParam = searchParams?.get("data");
    let payload: any = null;
    try {
        if (dataParam) payload = JSON.parse(decodeURIComponent(dataParam));
    } catch (e) {
        console.error("Failed to parse data parameter", e);
        payload = null;
    }

    const standardCount = selectedSeats.filter(seat => seat.type === "standard").length;
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = 100;
    const total = subtotal + convenienceFee;

    const removeSeat = (seatId: string) => {
        setSelectedSeats(prev => prev.filter(seat => seat.id !== seatId));
    };

    useEffect(() => {
        const fetchPricing = async () => {
            if (!payload || !payload.theater?.id) return;
            try {
                const th = await theaterApi.getTheaterById(payload.theater.id);
                let foundPrice: number | null = null;
                (th.screens || []).forEach((screen) => {
                    (screen.shows || []).forEach((show) => {
                        const movieId = typeof show.movie === 'object' && show.movie._id ? show.movie._id : String(show.movie);
                        if (!foundPrice && payload.movie?.id && movieId === String(payload.movie.id) && show.date === payload.date) {
                            foundPrice = show.price;
                        }
                    });
                });

                if (foundPrice !== null) {
                    const sPrice = foundPrice;
                    setStandardPrice(sPrice);
                    setSeats(generateSeats(sPrice));
                }
            } catch (err) {
                console.error('Failed to fetch theater pricing', err);
            }
        };

        fetchPricing();
    }, [dataParam]);

    const handleProceedToPay = () => {
        if (selectedSeats.length === 0) return;
        const orderData = {
            seats: selectedSeats,
            subtotal,
            convenienceFee,
            total,
            // include original payload so payment page/backend can access movie/theater meta
            meta: payload
        };
        const searchString = encodeURIComponent(JSON.stringify(orderData));
        router.push(`/payment?data=${searchString}`);
    };

    return (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8">
            <SelectSeatsHeader
                movie={payload?.movie?.title || "Cyber Chronicles"}
                theater={payload?.theater?.name || "Cineplex Downtown"}
                hall={payload?.format || "4 - IMAX"}
                date={payload?.date || "Today, 14 Oct"}
                time={payload?.time || "06:00 PM"}
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div className="flex-1 w-full">
                    <SeatSelection
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={setSelectedSeats}
                    />
                </div>

                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <MovieInfoPanel
                        posterUrl={payload?.movie?.poster || "https://via.placeholder.com/150"}
                        title={payload?.movie?.title || "Cyber Chronicles"}
                        genre={payload?.movie?.genres?.join(", ") || "Sci-Fi"}
                        duration={payload?.movie?.duration || "2h 15m"}
                        date={payload?.date}
                        time={payload?.time}
                        rating={payload?.movie?.rating || 8.9}
                        selectedSeats={selectedSeats}
                        onRemoveSeat={removeSeat}
                        standardCount={standardCount}
                        standardPrice={standardPrice}
                        convenienceFee={convenienceFee}
                        total={total}
                        onProceedToPay={handleProceedToPay}
                    />
                </div>
            </div>
        </div>
    );
}