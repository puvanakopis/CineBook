'use client';

import { useState, useEffect } from "react";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
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
    initialData?: CardFormData | null;
    onCancel?: () => void;
}

export function AddCardForm({ onAddCard, initialData, onCancel }: AddCardFormProps) {

    const [formData, setFormData] = useState<CardFormData>({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        saveCard: false,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                cardholderName: '',
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                saveCard: false,
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCard(formData);

        if (!initialData) {
            setFormData({
                cardholderName: '',
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                saveCard: false,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === 'cardNumber') {
            let formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (formatted.length > 19) formatted = formatted.slice(0, 19);

            setFormData(prev => ({ ...prev, [name]: formatted }));
            return;
        }

        if (name === 'expiryDate') {
            let formatted = value.replace(/\//g, '');
            if (formatted.length >= 2) {
                formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
            }
            if (formatted.length > 5) formatted = formatted.slice(0, 5);

            setFormData(prev => ({ ...prev, [name]: formatted }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <section>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    {initialData ? (
                        <IoCloseCircleOutline className="text-primary text-xl" />
                    ) : (
                        <IoAddCircleOutline className="text-primary text-xl" />
                    )}

                    <h2 className="text-xl font-bold text-white tracking-wider">
                        {initialData ? 'Edit Payment Method' : 'Add Payment Method'}
                    </h2>
                </div>

                {initialData && onCancel && (
                    <button
                        onClick={onCancel}
                        className="text-text-secondary hover:text-white transition-colors text-sm font-medium"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>

            {/* Container */}
            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                {/* Info Box (like PersonalInfoForm section style consistency) */}
                <div className="p-5 rounded-xl bg-surface-dark border border-[#392828] mb-8">
                    <p className="text-text-secondary text-sm leading-relaxed">
                        Securely add a new payment method. Your details are encrypted and protected at all times.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Cardholder Name */}
                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                            Cardholder Name
                        </h4>

                        <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleChange}
                            placeholder="Enter cardholder name"
                            className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                        />
                    </div>

                    {/* Card Number */}
                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                        <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                            Card Number
                        </h4>

                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                        />
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                Expiry Date
                            </h4>

                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm text-center focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                            />
                        </div>

                        <div className="p-5 rounded-xl bg-surface-dark border border-[#392828]">
                            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                                CVV
                            </h4>

                            <input
                                type="password"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full rounded-xl bg-[#1a1414] border border-[#392828] text-white px-4 py-3 text-sm text-center focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-text-secondary/40"
                            />
                        </div>
                    </div>

                    {/* Save Card */}
                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828] flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="saveCard"
                            checked={formData.saveCard}
                            onChange={handleChange}
                            id="save-card"
                            className="w-4 h-4 rounded border border-[#392828] bg-[#1a1414] text-primary focus:ring-primary"
                        />

                        <label htmlFor="save-card" className="text-sm text-text-secondary cursor-pointer">
                            Save this card for faster checkout
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-red-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {initialData ? 'Update Payment Method' : 'Add Payment Method'}
                        </button>
                    </div>

                </form>

                {/* Footer Info Blocks */}
                <div className="mt-8 space-y-4">

                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828] flex gap-3">
                        <IoShieldCheckmarkOutline className="text-primary text-xl mt-0.5" />

                        <div>
                            <p className="text-white font-semibold text-sm mb-1">
                                Secure & Encrypted
                            </p>
                            <p className="text-text-secondary text-sm">
                                Your payment data is encrypted and safely stored.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-surface-dark border border-[#392828] flex gap-3">
                        <MdOutlineLocalOffer className="text-primary text-xl mt-0.5" />

                        <div>
                            <p className="text-white font-semibold text-sm mb-1">
                                Limited Offer
                            </p>
                            <p className="text-text-secondary text-sm">
                                Get discounts on your first booking with saved cards.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}