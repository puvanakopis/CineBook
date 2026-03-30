'use client';

import { Sidebar } from "@/components/Sidebar";
import { PaymentsHeader } from "./_components/PaymentsHeader";
import { SavedCards } from "./_components/SavedCards";
import { AddCardForm, type CardFormData } from "./_components/AddCardForm";
import { DigitalWallets } from "./_components/DigitalWallets";

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
        // Implement edit logic
    };

    const handleDeleteCard = (cardId: string) => {
        console.log('Delete card:', cardId);
        // Implement delete logic
    };

    const handleAddCard = (cardData: CardFormData) => {
        console.log('Add card:', cardData);
        // Implement add card logic
    };

    const handleWalletConnect = (wallet: string) => {
        console.log('Connect wallet:', wallet);
        // Implement wallet connection logic
    };

    return (
        <div className="flex flex-1 w-full mx-auto">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-10">
                    <PaymentsHeader />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 space-y-6">
                            <SavedCards
                                cards={savedCardsData}
                                onEditCard={handleEditCard}
                                onDeleteCard={handleDeleteCard}
                            />
                            <DigitalWallets onConnectWallet={handleWalletConnect} />
                        </div>

                        <div className="lg:col-span-5">
                            <AddCardForm onAddCard={handleAddCard} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}