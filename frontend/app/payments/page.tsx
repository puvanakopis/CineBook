'use client';

import { Sidebar } from "@/components/Sidebar";
import { PaymentsHeader } from "./_components/PaymentsHeader";
import { SavedCards } from "./_components/SavedCards";
import { AddCardForm, type CardFormData } from "./_components/AddCardForm";

interface Card {
    id: string;
    cardNumber: string;
    expiryDate: string;
    cardholderName: string;
    brand: 'visa' | 'mastercard' | 'amex';
    lastFour: string;
}

const savedCardsData: Card[] = [
    {
        id: '1',
        cardNumber: '•••• •••• •••• 4242',
        expiryDate: '12/26',
        cardholderName: 'Arulnithi S',
        brand: 'visa',
        lastFour: '4242',
    },
    {
        id: '2',
        cardNumber: '•••• •••• •••• 8801',
        expiryDate: '09/25',
        cardholderName: 'Vijay Ram',
        brand: 'mastercard',
        lastFour: '8801',
    },
];

export default function Payments() {
    const handleEditCard = (cardId: string) => {
        console.log('Edit card:', cardId);
    };

    const handleDeleteCard = (cardId: string) => {
        console.log('Delete card:', cardId);
    };

    const handleAddCard = (cardData: CardFormData) => {
        console.log('Add card:', cardData);
    };

    return (
        <div className="flex w-full min-h-screen bg-[#0b0909]">
            <Sidebar />

            <main className="flex-1 overflow-x-hidden">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">

                    <PaymentsHeader />

                    <div className="space-y-12">
                        <SavedCards
                            cards={savedCardsData}
                            onEditCard={handleEditCard}
                            onDeleteCard={handleDeleteCard}
                        />

                        <AddCardForm onAddCard={handleAddCard} />
                    </div>

                </div>
            </main>
        </div>
    );
}