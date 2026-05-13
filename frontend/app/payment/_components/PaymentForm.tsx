"use client";

import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import Loading from "@/components/Loading";

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
    onMethodChange
}: PaymentFormProps) {
    return (
        <div className="flex-1 w-full bg-surface-dark rounded-xl border border-[#392828] shadow-2xl overflow-hidden transition-all duration-300">
            {/* Payment Methods Header */}
            <div className="p-6 border-b border-[#392828] bg-black/20">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => onMethodChange('card')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-[#392828] bg-black/20 hover:border-primary/50'}`}
                    >
                        <FaCreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-text-secondary'}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${paymentMethod === 'card' ? 'text-white' : 'text-text-secondary'}`}>Card Payment</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => onMethodChange('cash')}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-[#392828] bg-black/20 hover:border-primary/50'}`}
                    >
                        <FaMoneyBillWave className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-primary' : 'text-text-secondary'}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${paymentMethod === 'cash' ? 'text-white' : 'text-text-secondary'}`}>Cash at Counter</span>
                    </button>
                </div>
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
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName || ''}
                        onChange={onInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-black/20 border ${errors.customerName ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail || ''}
                        onChange={onInputChange}
                        placeholder="you@example.com"
                        className={`w-full bg-black/20 border ${errors.customerEmail ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                </div>

                {paymentMethod === 'card' && (
                    <>
                        <div className="relative flex items-center pt-4">
                            <div className="flex-grow border-t border-[#392828]"></div>
                            <span className="flex-shrink-0 mx-4 text-text-secondary text-sm">Card Details</span>
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
                                ? `Pay LKR ${totalAmount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : `Confirm Reservation`
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}