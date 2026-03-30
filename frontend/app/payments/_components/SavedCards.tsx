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
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <IoCardOutline className="text-2xl text-primary" />
                    <h3 className="text-white text-xl font-bold">Saved Payment Methods</h3>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {cards.length} {cards.length === 1 ? 'Card' : 'Cards'}
                </span>
            </div>

            <div className="space-y-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-[#291e1e]/30 rounded-xl border border-[#392828]/50 p-6 transition-all hover:border-primary/30 hover:bg-[#291e1e]/50"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#392828]">
                                    {cardLogos[card.brand] && card.brand !== 'amex' && (
                                        <Image
                                            src={cardLogos[card.brand]}
                                            alt={card.brand}
                                            width={40}
                                            height={24}
                                            className="object-contain"
                                        />
                                    )}
                                    {card.brand === 'amex' && (
                                        <span className="text-xs font-bold text-text-secondary">AMEX</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-lg tracking-widest text-white">{card.cardNumber}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                                            Expires {card.expiryDate}
                                        </p>
                                        <div className="w-1 h-1 rounded-full bg-text-secondary/30"></div>
                                        <p className="text-xs text-text-secondary">{card.cardholderName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onEditCard(card.id)}
                                    className="p-2 rounded-lg border border-[#392828] text-text-secondary hover:text-primary hover:border-primary transition-all"
                                >
                                    <IoCreateOutline className="text-lg" />
                                </button>
                                <button
                                    onClick={() => onDeleteCard(card.id)}
                                    className="p-2 rounded-lg border border-[#392828] text-text-secondary hover:text-red-500 hover:border-red-500/50 transition-all"
                                >
                                    <IoTrashOutline className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {cards.length === 0 && (
                    <div className="bg-[#291e1e]/30 rounded-xl border border-[#392828]/50 p-12 text-center">
                        <p className="text-text-secondary">No saved cards yet</p>
                        <p className="text-sm text-text-secondary/60 mt-1">Add your first card to get started</p>
                    </div>
                )}
            </div>
        </section>
    );
}