'use client';

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PaymentsHeader } from "./_components/PaymentsHeader";
import { SavedCards } from "./_components/SavedCards";
import { AddCardForm, type CardFormData } from "./_components/AddCardForm";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function Payments() {
    const { user, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useAuth();
    const [editingCardId, setEditingCardId] = useState<string | null>(null);

    const handleEditCard = (cardId: string) => {
        setEditingCardId(cardId);
        // Scroll to form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleDeleteCard = async (cardId: string) => {
        try {
            await deletePaymentMethod(cardId);
            toast.success("Card deleted successfully");
            if (editingCardId === cardId) setEditingCardId(null);
        } catch (error) {
            toast.error("Failed to delete card");
        }
    };

    const handleAddCard = async (cardData: CardFormData) => {
        try {
            if (editingCardId) {
                await updatePaymentMethod(editingCardId, {
                    cardholderName: cardData.cardholderName,
                    expiryDate: cardData.expiryDate,
                });
                toast.success("Card updated successfully");
                setEditingCardId(null);
            } else {
                let brand = 'visa';
                if (cardData.cardNumber.startsWith('4')) brand = 'visa';
                else if (cardData.cardNumber.startsWith('5')) brand = 'mastercard';
                else if (cardData.cardNumber.startsWith('3')) brand = 'amex';

                const payload = {
                    cardholderName: cardData.cardholderName,
                    cardNumber: cardData.cardNumber,
                    expiryDate: cardData.expiryDate,
                    brand: brand,
                    lastFour: cardData.cardNumber.slice(-4)
                };

                await addPaymentMethod(payload);
                toast.success("Card added successfully");
            }
        } catch (error) {
            toast.error(editingCardId ? "Failed to update card" : "Failed to add card");
        }
    };

    const editingCard = editingCardId 
        ? user?.paymentMethods?.find(m => m._id === editingCardId) 
        : null;

    const initialFormData: CardFormData | null = editingCard ? {
        cardholderName: editingCard.cardholderName,
        cardNumber: `•••• •••• •••• ${editingCard.lastFour}`, // Visual only, backend won't update card number usually
        expiryDate: editingCard.expiryDate,
        cvv: '•••',
        saveCard: true,
    } : null;

    const cards = (user?.paymentMethods || []).map(m => ({
        id: m._id,
        cardNumber: `•••• •••• •••• ${m.lastFour}`,
        expiryDate: m.expiryDate,
        cardholderName: m.cardholderName,
        brand: m.brand as 'visa' | 'mastercard' | 'amex',
        lastFour: m.lastFour
    }));

    return (
        <div className="flex w-full min-h-screen bg-[#0b0909]">
            <Sidebar />

            <main className="flex-1 overflow-x-hidden">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">

                    <PaymentsHeader />

                    <div className="space-y-12">
                        <SavedCards
                            cards={cards}
                            onEditCard={handleEditCard}
                            onDeleteCard={handleDeleteCard}
                        />

                        <AddCardForm 
                            onAddCard={handleAddCard} 
                            initialData={initialFormData}
                            onCancel={() => setEditingCardId(null)}
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}
