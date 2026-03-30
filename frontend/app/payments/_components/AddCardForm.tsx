'use client';

import { useState } from "react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { IoAddCircleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
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
        setFormData({
            cardholderName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            saveCard: false,
        });
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
            <div className="flex items-center gap-3 mb-6">
                <AiOutlineCreditCard className="text-primary text-2xl" />
                <h3 className="text-white text-xl font-bold">Add New Card</h3>
            </div>
            <div className="bg-[#291e1e]/30 rounded-xl border border-[#392828]/50 p-6">
                <p className="text-text-secondary text-sm mb-6">
                    Securely add a new payment method
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Kamal Haasan"
                            className="w-full rounded-lg bg-[#1f1818] border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                        />
                    </div>

                    <div>
                        <label className="block text-text-secondary text-sm font-medium mb-2">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            placeholder="0000 0000 0000 0000"
                            className="w-full rounded-lg bg-[#1f1818] border border-[#392828] text-white p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                placeholder="MM/YY"
                                className="w-full rounded-lg bg-[#1f1818] border border-[#392828] text-white p-3 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-text-secondary text-sm font-medium mb-2">
                                CVV
                            </label>
                            <input
                                type="password"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                required
                                placeholder="•••"
                                maxLength={4}
                                className="w-full rounded-lg bg-[#1f1818] border border-[#392828] text-white p-3 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="saveCard"
                            checked={formData.saveCard}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border border-[#392828] bg-[#1f1818] text-primary focus:ring-primary focus:ring-offset-0"
                            id="save-card"
                        />
                        <label className="text-sm text-text-secondary cursor-pointer" htmlFor="save-card">
                            Save this card for faster checkout
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-2.5 rounded-lg bg-primary hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <IoAddCircleOutline className="text-xl" />
                            Add Card
                        </span>
                    </button>
                </form>

                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                        <IoShieldCheckmarkOutline className="text-primary text-xl mt-0.5" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                                Secure & Encrypted
                            </p>
                            <p className="text-xs text-text-secondary">
                                Your payment information is encrypted and secure. We never store full card details.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                        <MdOutlineLocalOffer className="text-primary text-xl" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                                Limited Offer!
                            </p>
                            <p className="text-xs text-text-secondary">
                                Get 20% off on your first booking using a saved card
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}