export interface Booking {
  id: string;
  movieTitle: string;
  customerName: string;
  customerEmail: string;
  dateTime: string;
  seats: Array<string | { id?: string; row?: string; number?: number; type?: string; price?: number }>;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  poster: string;
  theaterName: string;
  screenId?: string;
  showTime?: string;
}
