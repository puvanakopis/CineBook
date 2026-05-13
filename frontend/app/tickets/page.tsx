"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TicketHeader from "./_components/TicketHeader";
import TicketCard from "./_components/TicketCard";
import Loading from "@/components/Loading";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { toast } from "react-hot-toast";

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
    meta?: {
        movie?: {
            title?: string;
            poster?: string;
            rating?: number | string;
        };
        theater?: {
            name?: string;
        };
        screen?: {
            name?: string;
        };
        date?: string;
        time?: string;
        format?: string;
    };
}

function TicketsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dataString = searchParams.get('data');

    const [orderData, setOrderData] = useState<OrderData | null>(null);

    const movieDetails = {
        title: orderData?.meta?.movie?.title || (orderData as any)?.movieTitle || "Movie Title",
        theater: orderData?.meta?.theater?.name || (orderData as any)?.theaterName || "Cinema",
        screen: orderData?.meta?.screen?.name || orderData?.meta?.format || "Hall",
        date: orderData?.meta?.date || ((orderData as any)?.dateTime ? new Date((orderData as any).dateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "Date"),
        time: orderData?.meta?.time || (orderData as any)?.showTime || "Time",
        poster: orderData?.meta?.movie?.poster || (orderData as any)?.poster || ""
    };

    const bookingId = (orderData as any)?._id || (orderData as any)?.payment?.transactionId || "CBK-PENDING";

    useEffect(() => {
        if (dataString) {
            try {
                const parsed = JSON.parse(decodeURIComponent(dataString));
                const normalizeSeat = (s: any) => {
                    if (!s) return null;
                    if (typeof s === 'string') {
                        const id = s;
                        const row = id.replace(/\d+/g, '') || id.charAt(0);
                        const numMatch = id.match(/\d+/);
                        const number = numMatch ? parseInt(numMatch[0], 10) : undefined;
                        return { id, row, number, type: 'standard', price: 14 };
                    }
                    return {
                        id: s.id ?? `${s.row ?? ''}${s.number ?? ''}`,
                        row: s.row ?? (typeof s.id === 'string' ? s.id.replace(/\d+/g, '') : undefined),
                        number: s.number ?? (typeof s.id === 'string' ? parseInt((s.id.match(/\d+/) || [''])[0], 10) : undefined),
                        type: s.type ?? 'standard',
                        price: s.price ?? 14,
                    };
                };

                const parsedSeats = Array.isArray(parsed.seats) ? parsed.seats.map(normalizeSeat).filter(Boolean) : [];
                setOrderData({ ...parsed, seats: parsedSeats });
            } catch (e) {
                console.error("Failed to parse order data", e);
            }
        }
    }, [dataString]);

    const handlePrintSingle = async (seatId: string) => {
        const element = document.getElementById(`ticket-${seatId}`);
        if (!element) return;

        const loadingToast = toast.loading("Generating your E-Ticket PDF...");

        try {
            const dataUrl = await htmlToImage.toPng(element, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: "#0F0F0F",
                cacheBust: true,
            });

            // Create a temporary PDF just to get image properties
            const tempPdf = new jsPDF();
            const imgProps = tempPdf.getImageProperties(dataUrl);

            // Calculate dimensions to fit the ticket exactly
            const ticketWidth = 200; // mm
            const ticketHeight = (imgProps.height * ticketWidth) / imgProps.width;

            const pdf = new jsPDF({
                orientation: imgProps.width > imgProps.height ? "landscape" : "portrait",
                unit: "mm",
                format: [ticketWidth, ticketHeight],
            });

            pdf.addImage(dataUrl, "PNG", 0, 0, ticketWidth, ticketHeight);
            pdf.save(`${bookingId}_${seatId}.pdf`);
            toast.success("E-Ticket downloaded successfully!", { id: loadingToast });
        } catch (error: any) {
            console.error("Error generating PDF:", error);
            toast.error(`Failed to generate PDF: ${error.message || "Unknown error"}`, { id: loadingToast });
        }
    };

    const handleDownloadAll = async () => {
        if (!orderData) return;

        const loadingToast = toast.loading("Generating your E-Tickets PDF...");

        try {
            // Initialize jsPDF
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4", // Default, will be overridden by pages
            });

            // Remove the first empty page
            pdf.deletePage(1);

            const tickets = orderData.seats;
            let capturedCount = 0;

            for (let i = 0; i < tickets.length; i++) {
                const seat = tickets[i];
                const element = document.getElementById(`ticket-${seat.id}`);

                if (element) {
                    const dataUrl = await htmlToImage.toPng(element, {
                        quality: 1.0,
                        pixelRatio: 2,
                        backgroundColor: "#0F0F0F",
                        cacheBust: true,
                    });

                    const imgProps = pdf.getImageProperties(dataUrl);

                    const ticketWidth = 200;
                    const ticketHeight = (imgProps.height * ticketWidth) / imgProps.width;

                    // Add page with correct dimensions
                    pdf.addPage([ticketWidth, ticketHeight], imgProps.width > imgProps.height ? "landscape" : "portrait");
                    pdf.addImage(dataUrl, "PNG", 0, 0, ticketWidth, ticketHeight);
                    capturedCount++;
                }
            }

            if (capturedCount === 0) {
                throw new Error("No ticket elements found to capture.");
            }

            // Save the PDF with the booking ID
            pdf.save(`${bookingId}.pdf`);
            toast.success("E-Tickets downloaded successfully!", { id: loadingToast });
        } catch (error: any) {
            console.error("Error generating PDF:", error);
            toast.error(`Failed to generate PDF: ${error.message || "Unknown error"}`, { id: loadingToast });
        }
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
            <TicketHeader onPrintAll={handleDownloadAll} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {orderData.seats.map((seat) => (
                    <TicketCard
                        key={seat.id}
                        seat={seat}
                        movieDetails={movieDetails}
                        bookingId={bookingId}
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
                <Loading inline size="sm" />
            </div>
        }>
            <TicketsContent />
        </Suspense>
    );
}
