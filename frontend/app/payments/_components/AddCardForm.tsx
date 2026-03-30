'use client';

import { useState } from "react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";

export interface CardFormData {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    saveCard: boolean;
}

interface AddCardFormProps {
    onAddCard: (cardData: CardFormData) => void;
}

export function AddCardForm({ onAddCard }: AddCardFormProps) {
    const [formData, setFormData] = useState<CardFormData>({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        saveCard: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCard(formData);
        // Reset form or handle submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <aside className="sticky top-24 rounded-3xl border border-[#392828] bg-[#291e1e]/70 p-8 shadow-2xl shadow-black/20">
            <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">
                    Add new payment method
                </p>
                <h2 className="text-2xl font-bold text-white">Add New Card</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleChange}
                        placeholder="e.g. Kamal Haasan"
                        className="w-full rounded-2xl border border-[#392828] bg-[#181111] p-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">
                        Card Number
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full rounded-2xl border border-[#392828] bg-[#181111] p-4 pl-12 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <AiOutlineCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full rounded-2xl border border-[#392828] bg-[#181111] p-4 text-white text-center outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">
                            CVV
                        </label>
                        <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="•••"
                            className="w-full rounded-2xl border border-[#392828] bg-[#181111] p-4 text-white text-center outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border border-[#392828] bg-[#181111] text-primary focus:ring-primary"
                        id="save-card"
                    />
                    <label className="text-xs text-text-secondary cursor-pointer" htmlFor="save-card">
                        Save this card for faster checkout in future bookings.
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 active:scale-[0.98]"
                >
                    <span className="flex items-center justify-center gap-2">
                        <IoAddCircleOutline className="text-xl" />
                        Save Card
                    </span>
                </button>
            </form>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                    <MdOutlineLocalOffer className="text-primary text-2xl" />
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-1">
                            Limited Offer!
                        </p>
                        <p className="text-sm text-text-secondary">
                            Get 20% off on your first booking using a saved ICICI or HDFC card for Thalapathy&apos;s next release.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}