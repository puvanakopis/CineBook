export interface Booking {
    _id?: string;
    id?: string;
    movieTitle: string;
    movieId?: string;
    customerName: string;
    customerEmail: string;
    dateTime: string;
    seats: Seat[];
    totalPrice: number;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    payment?: PaymentInfo;
    poster: string;
    theaterName: string;
    screenId?: string;
    showTime?: string;
    genres?: string[];
    duration?: string;
    format?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Seat {
    id?: string;
    row?: string;
    number?: number;
    type?: string;
    price?: number;
}

export interface PaymentInfo {
    method?: string;
    transactionId?: string;
    amount?: number;
    status?: 'Paid' | 'Pending' | 'Failed';
    provider?: string;
}

export interface CreateBookingRequest {
    movieId?: string;
    movieTitle: string;
    theaterId?: string;
    theaterName: string;
    screenId?: string;
    showTime?: string;
    dateTime: string;
    seats: Array<Seat | string>;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    poster?: string;
    payment?: PaymentInfo;
    genres?: string[];
    duration?: string;
    format?: string;
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
