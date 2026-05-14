import { Booking } from "@/interfaces/bookingInterface";
import { BookingCard } from "./BookingCard";

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onViewTicket: (id: string) => void;
  onCompletePayment: (id: string) => void;
}

export function BookingList({
  bookings,
  onCancelBooking,
  onViewTicket,
  onCompletePayment
}: BookingListProps) {

  return (
    <div className="space-y-6">

      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancelBooking}
          onViewTicket={onViewTicket}
          onCompletePayment={onCompletePayment}
        />
      ))}

    </div>
  );
}