export interface Booking {
  id: string;
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
}
