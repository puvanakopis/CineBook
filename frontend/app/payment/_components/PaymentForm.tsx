"use client";

import { FaCreditCard, FaApplePay, FaGooglePay } from "react-icons/fa";
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
        <div className="flex-1 w-full bg-[#291e1e]/30 rounded-xl border border-[#392828] shadow-lg hover:shadow-primary/5 transition-all duration-300 p-6 md:p-8">
            {paymentStatus === "error" && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl flex items-start gap-3 mb-6">
                    <MdErrorOutline className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Payment Failed</p>
                        <p className="text-sm opacity-90">There was an issue processing your payment. Please try again or use a different card.</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row mb-8">
                <div className="flex items-center gap-3">
                    <label className="text-sm text-[var(--color-text-secondary)]">Payment method:</label>
                    <label className={`px-3 py-2 rounded-xl border ${paymentMethod === 'card' ? 'border-primary' : 'border-[#392828]'} cursor-pointer`}>
                        <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => onMethodChange('card')} className="mr-2" /> Card
                    </label>
                    <label className={`px-3 py-2 rounded-xl border ${paymentMethod === 'cash' ? 'border-primary' : 'border-[#392828]'} cursor-pointer`}>
                        <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => onMethodChange('cash')} className="mr-2" /> Cash
                    </label>
                </div>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-black/80 text-white py-3 px-4 rounded-xl border border-[#392828] transition-colors">
                    <FaApplePay className="w-10 h-10" />
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black py-3 px-4 rounded-xl border border-[#392828] transition-colors">
                    <FaGooglePay className="w-10 h-10" />
                </button>
            </div>

                <div className="relative flex items-center py-5 mb-4">
                    <div className="flex-grow border-t border-[#392828]"></div>
                    <span className="flex-shrink-0 mx-4 text-[var(--color-text-secondary)] text-sm">or pay with card</span>
                    <div className="flex-grow border-t border-[#392828]"></div>
                </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName || ''}
                        onChange={onInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-black/20 border ${errors.customerName ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail || ''}
                        onChange={onInputChange}
                        placeholder="you@example.com"
                        className={`w-full bg-black/20 border ${errors.customerEmail ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                </div>

                <>
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Cardholder Name</label>
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={onInputChange}
                            placeholder="John Doe"
                            className={`w-full bg-black/20 border ${errors.cardName ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                        <div className="relative">
                            <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={onInputChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className={`w-full bg-black/20 border ${errors.cardNumber ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl pl-12 pr-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                value={formData.expiry}
                                onChange={onInputChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                className={`w-full bg-black/20 border ${errors.expiry ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                            {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-white mb-2">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={onInputChange}
                                placeholder="123"
                                maxLength={4}
                                className={`w-full bg-black/20 border ${errors.cvv ? 'border-red-500' : 'border-[#392828]'} text-white rounded-xl px-4 py-3 placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-primary/50 transition-colors`}
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                    </div>
                </>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-red-700 disabled:bg-[#392828] disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                    {isProcessing ? (
                        <>
                            <Loading inline size="sm" />
                            Processing...
                        </>
                    ) : (
                        `Pay LKR ${totalAmount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                </button>
            </form>
        </div>
    );
}