'use client';

import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
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
    visa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqWacOQEyBEjCImye-1ikF0gOWUOvaBo5uyTea5lLCKJXd_USOhEHtz-sgI_zZ1XtCxmE66Tgeo3FIysT4mA6VADcGYuNL0anja2qT-puUieCxsDgOsK5DWgjwEQ2bNWa3IEmWo5bVfnPAYFvCq8mSZPzm7SYadTAfbqZJD0QAt11z8qgO4iLjmqoPeDVzr-g8SLVS2AmMhgX64_tXpWGMQ6bGqLGu5CyAyv8jNZGTxj1waVjCTNEwaJQw8yFsJsNDjAl6bVd4Cfyq',
    mastercard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh37TWZVMz5ZgzZVrRARiA6WtNFrJ2pzvTitdhvyKEmnqGvyC0NhdcDki3fV3NDpCklrxJgzTiB5ZAMVMvn0TaWvRFligWYlZaOUTxMySPzvAJefVhp6QF0_u_cXsTDA-xrSf-L2AZxcNS75im5ArC-IvCNuieJlC-jX2cfSaGdnW4fA8DA37Misj1_axG5JAp1m2cUqtJKPqVERiYVMpgH9VoGCMWndqoc22sVb5TKHvZDQ49LSkmb63VP6oM2saNSqH2I2wAHZHB',
    amex: '',
};

export function SavedCards({ cards, onEditCard, onDeleteCard }: SavedCardsProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white">Saved Payment Methods</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">Secure & ready</span>
            </div>

            <div className="space-y-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="group relative overflow-hidden rounded-3xl border border-[#392828] bg-[#291e1e]/70 p-6 shadow-lg shadow-black/25 transition-all hover:border-primary/30"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#392828]">
                                    {cardLogos[card.brand] && (
                                        <Image
                                            src={cardLogos[card.brand]}
                                            alt={card.brand}
                                            width={40}
                                            height={24}
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-lg tracking-widest text-white">{card.cardNumber}</p>
                                    <p className="text-xs uppercase tracking-[0.3em] text-text-secondary mt-1">
                                        Expires {card.expiryDate} • {card.cardholderName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onEditCard(card.id)}
                                    className="grid place-items-center w-11 h-11 rounded-full border border-[#392828] bg-white/5 text-text-secondary transition hover:bg-primary/10 hover:text-primary"
                                >
                                    <IoCreateOutline className="text-lg" />
                                </button>
                                <button
                                    onClick={() => onDeleteCard(card.id)}
                                    className="grid place-items-center w-11 h-11 rounded-full border border-[#392828] bg-white/5 text-text-secondary transition hover:bg-red-500/10 hover:text-red-500"
                                >
                                    <IoTrashOutline className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}