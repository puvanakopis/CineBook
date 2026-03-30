'use client';

import { BookingCard } from "./BookingCard";

interface Booking {
  id: string;
  movieTitle: string;
  genres: string[];
  duration: string;
  poster: string;
  date: string;
  time: string;
  theater: string;
  seats: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
  format: string;
  reference: string;
}

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onModifyBooking: (id: string) => void;
  onViewTicket: (id: string) => void;
  onCompletePayment: (id: string) => void;
}

export function BookingList({
  bookings,
  onCancelBooking,
  onModifyBooking,
  onViewTicket,
  onCompletePayment
}: BookingListProps) {
  return (
    <div className="flex flex-col gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancelBooking}
          onModify={onModifyBooking}
          onViewTicket={onViewTicket}
          onCompletePayment={onCompletePayment}
        />
      ))}
    </div>
  );
}