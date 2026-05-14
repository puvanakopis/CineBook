'use client';

import { IoCreateOutline, IoTrashOutline, IoCardOutline } from "react-icons/io5";
import Image from "next/image";

interface Card {
    id: string;
    cardNumber: string;
    expiryDate: string;
    cardholderName: string;
    brand: 'visa' | 'mastercard' | 'amex';
    lastFour: string;
}

interface SavedCardsProps {
    cards: Card[];
    onEditCard: (id: string) => void;
    onDeleteCard: (id: string) => void;
}

const cardLogos = {
    visa: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg',
    mastercard: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg',
    amex: '',
};

export function SavedCards({ cards, onEditCard, onDeleteCard }: SavedCardsProps) {

    return (
        <section>

            <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-3">
                    <IoCardOutline className="text-primary text-xl" />

                    <h2 className="text-xl font-bold text-white tracking-wider">
                        Payment Methods
                    </h2>
                </div>

                <span className="text-xs font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-wider border border-primary/20">
                    {cards.length} {cards.length === 1 ? 'Card' : 'Cards'}
                </span>

            </div>

            <div className="bg-[#1a1414] p-8 rounded-xl border border-[#392828] shadow-2xl">

                <div className="space-y-4">

                    {cards.map((card) => (

                        <div
                            key={card.id}
                            className="p-5 rounded-xl bg-surface-dark border border-[#392828] hover:border-primary/30 transition-all duration-300 group"
                        >

                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                                <div className="flex items-center gap-5">

                                    <div className="w-14 h-10 bg-[#1a1414] rounded-lg flex items-center justify-center border border-[#392828]">

                                        {cardLogos[card.brand] && card.brand !== 'amex' && (
                                            <Image
                                                src={cardLogos[card.brand]}
                                                alt={card.brand}
                                                width={36}
                                                height={22}
                                                className="object-contain"
                                            />
                                        )}

                                        {card.brand === 'amex' && (
                                            <span className="text-xs font-bold text-text-secondary">
                                                AMEX
                                            </span>
                                        )}

                                    </div>

                                    <div className="space-y-1">

                                        <p className="text-white font-semibold tracking-widest text-sm">
                                            •••• •••• •••• {card.lastFour}
                                        </p>

                                        <div className="flex items-center gap-3 text-xs text-text-secondary">

                                            <span className="uppercase tracking-wider">
                                                Expires {card.expiryDate}
                                            </span>

                                            <span className="w-1 h-1 bg-text-secondary/40 rounded-full" />

                                            <span>
                                                {card.cardholderName}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => onEditCard(card.id)}
                                        className="p-2 rounded-lg border border-[#392828] text-text-secondary hover:text-primary hover:border-primary/40 transition-all duration-300"
                                    >
                                        <IoCreateOutline className="text-lg" />
                                    </button>

                                    <button
                                        onClick={() => onDeleteCard(card.id)}
                                        className="p-2 rounded-lg border border-[#392828] text-text-secondary hover:text-red-500 hover:border-red-500/40 transition-all duration-300"
                                    >
                                        <IoTrashOutline className="text-lg" />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                    {cards.length === 0 && (

                        <div className="p-12 rounded-xl bg-surface-dark border border-[#392828] text-center">

                            <IoCardOutline className="text-4xl text-text-secondary/20 mx-auto mb-4" />

                            <p className="text-text-secondary font-medium">
                                No saved cards yet
                            </p>

                            <p className="text-sm text-text-secondary/50 mt-1">
                                Add a payment method to get started
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}