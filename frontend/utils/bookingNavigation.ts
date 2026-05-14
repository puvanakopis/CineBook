import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface BookingPayload {
    movie: {
        id: string | number;
        title: string;
        poster: string;
        genres?: string[];
        duration?: string;
        rating?: number;
    };
    theater: {
        id: string;
        name: string;
        address: string;
    };
    screen: {
        id: string;
        name: string;
        type: string;
    };
    date: string;
    time: string;
    price: number;
    currency: string;
    format: string;
}

/**
 * Centrally handles navigation to the select-seats page with a consistent payload.
 */
export const navigateToSelectSeats = (router: AppRouterInstance, payload: BookingPayload) => {
    const searchString = encodeURIComponent(JSON.stringify(payload));
    router.push(`/select-seats?data=${searchString}`);
};
