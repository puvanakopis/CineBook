export interface Booking {
    _id: string;
    movieTitle: string;
    customerName: string;
    customerEmail: string;
    dateTime: string;
    seats: string[];
    totalPrice: number;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    poster: string;
    theaterName: string;
    hallName: string;
    screenId?: string;
    showTime?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateBookingRequest {
    movieId?: string;
    movieTitle: string;
    theaterId?: string;
    theaterName: string;
    hallName: string;
    screenId?: string;
    showTime?: string;
    dateTime: string;
    seats: string[];
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    poster?: string;
}

export type CreateBookingPayload = CreateBookingRequest;

export interface CreateBookingResponse {
    message: string;
    booking: Booking;
}

export type GetBookingsResponse = Booking[];

export interface CancelBookingResponse {
    message: string;
    booking?: Booking;
}

// ----- CONTEXT TYPES -----
export interface BookingState {
    bookings: Booking[];
    myBookings: Booking[];
    selectedBooking: Booking | null;
    isLoading: boolean;
    error: string | null;
}

export interface BookingContextType extends BookingState {
    getBookings: () => Promise<void>;
    getMyBookings: () => Promise<void>;
    getBookingById: (id: string) => Promise<void>;
    createBooking: (data: CreateBookingPayload) => Promise<void>;
    cancelBooking: (id: string) => Promise<void>;
    clearError: () => void;
    clearSelectedBooking: () => void;
}
