"use client";

import { FaCreditCard, FaMoneyBillWave, FaUser, FaEnvelope, FaInfoCircle, FaRegCreditCard } from "react-icons/fa";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import Loading from "@/components/Loading";
import { PaymentMethod } from "@/interfaces/authInterface";

interface PaymentFormProps {
    formData: {
        cardName: string;
        cardNumber: string;
        expiry: string;
        cvv: string;
        customerName?: string;
        customerEmail?: string;
    };
    errors: Record<string, string>;
    isProcessing: boolean;
    paymentStatus: "idle" | "success" | "error";
    totalAmount: number;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    paymentMethod: string;
    onMethodChange: (method: string) => void;
    savedMethods?: PaymentMethod[];
    onSelectSavedMethod?: (method: PaymentMethod) => void;
    selectedSavedCardId?: string | null;
    selectedCardBrand?: string | null;
    cvvRef?: React.RefObject<HTMLInputElement | null>;
    isMethodsLoading?: boolean;
}

export default function PaymentForm({
    formData,
    errors,
    isProcessing,
    paymentStatus,
    totalAmount,
    onInputChange,
    onSubmit,
    paymentMethod,
    onMethodChange,
    savedMethods = [],
    onSelectSavedMethod,
    selectedSavedCardId,
    selectedCardBrand,
    cvvRef,
    isMethodsLoading
}: PaymentFormProps) {
    const getCardBrandIcon = (brand: string) => {
        switch (brand.toLowerCase()) {
            case 'visa': return <SiVisa className="w-8 h-8 text-[#1A1F71]" />;
            case 'mastercard': return <SiMastercard className="w-8 h-8 text-[#EB001B]" />;
            case 'amex': return <SiAmericanexpress className="w-8 h-8 text-[#007BC1]" />;
            default: return <FaRegCreditCard className="w-6 h-6 text-text-secondary" />;
        }
    };
    return (
        <div className="flex-1 w-full bg-surface-dark rounded-xl border border-[#392828] shadow-2xl overflow-hidden transition-all duration-300">
            {/* Payment Methods Header */}
            <div className="p-6 border-b border-[#392828] bg-black/20">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => onMethodChange('card')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(236,19,19,0.1)]' : 'border-[#392828] bg-black/20 hover:border-primary/50'}`}
                    >
                        <FaCreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-text-secondary'}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${paymentMethod === 'card' ? 'text-white' : 'text-text-secondary'}`}>Card Payment</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onMethodChange('cash')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(236,19,19,0.1)]' : 'border-[#392828] bg-black/20 hover:border-primary/50'}`}
                    >
                        <FaMoneyBillWave className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-primary' : 'text-text-secondary'}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${paymentMethod === 'cash' ? 'text-white' : 'text-text-secondary'}`}>Cash at Counter</span>
                    </button>
                </div>
                <p className="text-[10px] text-text-secondary text-center uppercase tracking-[0.2em] font-medium opacity-80">
                    {paymentMethod === 'card' 
                        ? "Secure 256-bit encrypted card payment" 
                        : "Reservation valid until 15 mins before showtime"}
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="p-6 md:p-8 space-y-6">
                    {paymentStatus === "error" && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl flex items-start gap-3">
                            <MdErrorOutline className="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold">Payment Failed</p>
                                <p className="text-sm opacity-90">There was an issue processing your payment. Please try again or use a different card.</p>
                            </div>
                        </div>
                    )}

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-[#392828]"></div>
                        <span className="flex-shrink-0 mx-4 text-text-secondary text-sm">Customer Details</span>
                        <div className="flex-grow border-t border-[#392828]"></div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName || ''}
                                onChange={onInputChange}
                                placeholder="John Doe"
                                className={`w-full bg-black/20 border ${errors.customerName ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl pl-12 pr-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                        </div>
                        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
                            <input
                                type="email"
                                name="customerEmail"
                                value={formData.customerEmail || ''}
                                onChange={onInputChange}
                                placeholder="you@example.com"
                                className={`w-full bg-black/20 border ${errors.customerEmail ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl pl-12 pr-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                        </div>
                        {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                    </div>

                    {paymentMethod === 'cash' && (
                        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                            <FaInfoCircle className="text-primary mt-0.5" />
                            <div className="text-xs text-text-secondary leading-relaxed">
                                <p className="text-white font-bold mb-1">Pay at Cinema Counter</p>
                                <p>Your tickets will be reserved. Please present your booking ID at the counter to make the payment and collect your tickets.</p>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'card' && (
                        <>
                            {savedMethods.length > 0 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Saved Payment Methods</label>
                                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full">Secure</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {isMethodsLoading ? (
                                            <div className="col-span-full py-8 flex flex-col items-center justify-center bg-black/20 rounded-xl border border-[#392828] border-dashed">
                                                <Loading inline size="sm" />
                                                <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] mt-3">Fetching saved cards...</p>
                                            </div>
                                        ) : (
                                            savedMethods.map((method) => (
                                                <button
                                                    key={method._id}
                                                    type="button"
                                                    onClick={() => onSelectSavedMethod?.(method)}
                                                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 group ${selectedSavedCardId === method._id ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(236,19,19,0.1)]' : 'border-[#392828] bg-black/20 hover:border-primary/40'}`}
                                                >
                                                    <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${selectedSavedCardId === method._id ? 'bg-white/10' : ''}`}>
                                                        {getCardBrandIcon(method.brand)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-bold truncate tracking-tight">{method.cardholderName}</p>
                                                        <p className="text-text-secondary text-xs font-medium mt-0.5 tracking-wider">•••• {method.lastFour}</p>
                                                    </div>
                                                    {selectedSavedCardId === method._id && (
                                                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                        </div>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="relative flex items-center pt-4">
                                <div className="flex-grow border-t border-[#392828]"></div>
                                <span className="flex-shrink-0 mx-4 text-text-secondary text-sm">
                                    {savedMethods.length > 0 ? "Or Enter New Details" : "Card Details"}
                                </span>
                                <div className="flex-grow border-t border-[#392828]"></div>
                            </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Cardholder Name</label>
                            <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={onInputChange}
                                placeholder="John Doe"
                                className={`w-full bg-black/20 border ${errors.cardName ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                            {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Card Number</label>
                            <div className="relative">
                                <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={onInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    className={`w-full bg-black/20 border ${errors.cardNumber ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl pl-12 pr-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                                />
                            </div>
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={onInputChange}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className={`w-full bg-black/20 border ${errors.expiry ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                                />
                                {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    ref={cvvRef}
                                    value={formData.cvv}
                                    onChange={onInputChange}
                                    placeholder="123"
                                    maxLength={4}
                                    className={`w-full bg-black/20 border ${errors.cvv ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                                />
                                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                            </div>
                        </div>
                    </>
                )}

                </div>

                <div className="p-6 bg-[#221a1a] border-t border-[#392828]">
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-4 bg-primary text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 group text-lg ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 hover:shadow-primary/30"}`}
                    >
                        {isProcessing ? (
                            <>
                                <Loading inline size="sm" />
                                Processing...
                            </>
                        ) : (
                            paymentMethod === 'card' 
                                ? (selectedSavedCardId 
                                    ? `Pay with ${selectedCardBrand || 'Saved'} Card •••• ${savedMethods.find(m => m._id === selectedSavedCardId)?.lastFour || ''}`
                                    : `Pay LKR ${totalAmount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
                                : `Confirm Reservation`
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}