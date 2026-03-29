"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import PaymentHeader from "./_components/PaymentHeader";
import PaymentForm from "./_components/PaymentForm";
import OrderSummary from "./_components/OrderSummary";

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

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dataString = searchParams.get('data');

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.cardName.trim()) newErrors.cardName = "Name is required";
        if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) newErrors.cardNumber = "Invalid card number (16 digits required)";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Use MM/YY format";
        if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "Invalid CVV (3-4 digits)";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderData || orderData.seats.length === 0) return;
        if (!validateForm()) return;

        setIsProcessing(true);
        setPaymentStatus("idle");

        // Mock API call delay
        setTimeout(() => {
            if (Math.random() > 0.1) {
                router.push(`/tickets?data=${encodeURIComponent(JSON.stringify(orderData))}`);
            } else {
                setIsProcessing(false);
                setPaymentStatus("error");
            }
        }, 2500);
    };



    if (!orderData || orderData.seats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-2xl font-bold text-white mb-4">No seats selected</h2>
                <p className="text-[var(--color-text-secondary)] mb-8">Please go back and select seats before proceeding to payment.</p>
                <button
                    onClick={() => router.push('/select-seats')}
                    className="bg-[var(--color-input-bg)] hover:bg-[var(--color-surface-dark)] border border-[var(--color-text-secondary)] text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                    Go to Seat Selection
                </button>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-8">
            <PaymentHeader 
                movie="Cyber Chronicles"
                theater="Cineplex Downtown"
                hall="4 - IMAX"
                date="Today, 14 Oct"
                time="06:00 PM"
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                
                <PaymentForm 
                    formData={formData}
                    errors={errors}
                    isProcessing={isProcessing}
                    paymentStatus={paymentStatus}
                    totalAmount={orderData.total}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                />

                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <OrderSummary 
                        seats={orderData.seats}
                        subtotal={orderData.subtotal}
                        convenienceFee={orderData.convenienceFee}
                        total={orderData.total}
                    />
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[var(--color-input-bg)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
