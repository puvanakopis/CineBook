"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaymentHeader from "./_components/PaymentHeader";
import PaymentForm from "./_components/PaymentForm";
import OrderSummary from "./_components/OrderSummary";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentMethod } from "@/interfaces/authInterface";

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
    meta?: any;
}

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, isAuthenticated, fetchUserInfo, isLoading } = useAuth();
    const dataString = searchParams.get('data');

    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [selectedSavedCardId, setSelectedSavedCardId] = useState<string | null>(null);
    const [selectedCardBrand, setSelectedCardBrand] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const cvvRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserInfo();
        }
    }, [isAuthenticated, fetchUserInfo]);

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
                        return { id, row, number, type: 'standard', price: 14, isAvailable: true };
                    }
                    return {
                        id: s.id ?? `${s.row ?? ''}${s.number ?? ''}`,
                        row: s.row ?? (typeof s.id === 'string' ? s.id.replace(/\d+/g, '') : undefined),
                        number: s.number ?? (typeof s.id === 'string' ? parseInt((s.id.match(/\d+/) || [''])[0], 10) : undefined),
                        type: s.type ?? 'standard',
                        price: s.price ?? 14,
                        isAvailable: s.isAvailable ?? true,
                    };
                };

                const parsedSeats = Array.isArray(parsed.seats) ? parsed.seats.map(normalizeSeat).filter(Boolean) : [];
                setOrderData({ ...parsed, seats: parsedSeats });
            } catch (e) {
                console.error("Failed to parse order data", e);
            }
        }
    }, [dataString]);

    useEffect(() => {
        if (orderData && orderData.meta) {
            setFormData((f) => ({ ...f, customerName: orderData.meta.movie?.customerName || f.customerName || '', customerEmail: orderData.meta.movie?.customerEmail || f.customerEmail || '' }));
        }
    }, [orderData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
        if (['cardNumber', 'expiry', 'cardName'].includes(e.target.name)) {
            setSelectedSavedCardId(null);
        }
    };

    const handleSelectSavedMethod = (method: PaymentMethod) => {
        setFormData({
            ...formData,
            cardName: method.cardholderName,
            cardNumber: method.cardNumber,
            expiry: method.expiryDate,
            cvv: "" // CVV is not stored
        });
        setSelectedSavedCardId(method._id);
        setSelectedCardBrand(method.brand);
        
        // Clear card errors when selecting a saved card
        const newErrors = { ...errors };
        delete newErrors.cardName;
        delete newErrors.cardNumber;
        delete newErrors.expiry;
        delete newErrors.cvv;
        setErrors(newErrors);

        // Focus CVV field after a short delay for smooth transition
        setTimeout(() => {
            cvvRef.current?.focus();
        }, 100);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.customerName || !formData.customerName.toString().trim()) newErrors.customerName = "Name is required";
        if (!formData.customerEmail || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(formData.customerEmail))) newErrors.customerEmail = "Valid email is required";
        
        if (paymentMethod === 'card') {
            if (!formData.cardName?.toString().trim()) newErrors.cardName = "Cardholder name is required";
            if (!selectedSavedCardId && !/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
                newErrors.cardNumber = "Invalid card number (16 digits required)";
            }
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Use MM/YY format";
            if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "Invalid CVV (3-4 digits)";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderData || orderData.seats.length === 0) return;
        if (!validateForm()) return;

        setIsProcessing(true);
        setPaymentStatus("idle");
        try {
            const API_BASE = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:4000';

            const paymentDetails = paymentMethod === 'card' 
                ? {
                    method: 'card',
                    provider: 'MockGateway',
                    cardName: formData.cardName,
                    cardNumber: formData.cardNumber.replace(/\s+/g, ''),
                    cvv: formData.cvv,
                    paymentMethodId: selectedSavedCardId
                  }
                : {
                    method: 'cash',
                    provider: 'InPerson',
                  };

            const resp = await fetch(`${API_BASE}/api/payments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderData,
                    paymentDetails,
                    meta: {
                        customerName: formData.customerName,
                        customerEmail: formData.customerEmail,
                        ...(orderData?.meta || {})
                    }
                })
            });

            if (!resp.ok) {
                setIsProcessing(false);
                setPaymentStatus('error');
                return;
            }

            const data = await resp.json();
            setIsProcessing(false);
            setPaymentStatus('success');
            const booking = data.booking || orderData;
            router.push(`/tickets?data=${encodeURIComponent(JSON.stringify(booking))}`);
        } catch (err) {
            console.error('Payment request failed', err);
            setIsProcessing(false);
            setPaymentStatus('error');
        }
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
                movie={orderData?.meta?.movie?.title || "Cyber Chronicles"}
                theater={orderData?.meta?.theater?.name || "Cineplex Downtown"}
                hall={orderData?.meta?.screen?.name || orderData?.meta?.format || "4 - IMAX"}
                date={orderData?.meta?.date || "Today, 14 Oct"}
                time={orderData?.meta?.time || "06:00 PM"}
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
                    paymentMethod={paymentMethod}
                    onMethodChange={setPaymentMethod}
                    savedMethods={user?.paymentMethods || []}
                    onSelectSavedMethod={handleSelectSavedMethod}
                    selectedSavedCardId={selectedSavedCardId}
                    selectedCardBrand={selectedCardBrand}
                    cvvRef={cvvRef}
                    isMethodsLoading={isLoading}
                />

                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <OrderSummary
                        seats={orderData.seats}
                        subtotal={orderData.subtotal}
                        convenienceFee={orderData.convenienceFee}
                        total={orderData.total}
                        meta={orderData.meta}
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
                <Loading message="Preparing payment..." fullHeight={true} />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
