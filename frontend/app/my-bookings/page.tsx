'use client';

import { Sidebar } from "@/components/Sidebar";
import { BookingsHeader } from "./_components/BookingsHeader";
import { BookingList } from "./_components/BookingList";
import { BookingEmptyState } from "./_components/BookingEmptyState";

import { useState, useMemo } from "react";

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

const bookingsData: Booking[] = [
  {
    id: '1',
    movieTitle: 'Dune: Part Two',
    genres: ['Sci-Fi', 'Adventure'],
    duration: '2h 46m',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRpGX5yojBrbAv9C1x2R-LFKxyz43bDB7SwnH-xfZverL2LTGjMfFDTlKfnsZTIsLkHvisfBeOJa2SISlqJja7jF0ZPxlsVizTo-IHURQ2AvgoCgpELHc-UQK0q_BVMxDKPLhoEB43cckT-wiQll8c2bOKweRUmKZ85LnCYC3MJGV-eJtJKdpOuouGYoZl57RBL7RgxKYu-ynDypWjHlgcYdfwCyeqyKls7y_3pnlepYDNXXYOmDMzhqsv5_wkuazVQ7Z8-A1zWPFU',
    date: 'Nov 15, 2023',
    time: '19:30',
    theater: 'Grand Cinema',
    seats: ['F12', 'F13'],
    status: 'confirmed',
    format: 'IMAX',
    reference: '#BK8920192',
  },
  {
    id: '2',
    movieTitle: 'Civil War',
    genres: ['Action', 'Thriller'],
    duration: '1h 49m',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1wdzyaPR5Y3HbzoNE2NJCEWnyIVkuAz_6pEZOxVLQaH1QGejxYb_VYR2_qV2SoYW5xid88alKjJlQLc-OIF_jYQfLFEo2A0vyaIfElpFCAZf_XzGBFvUg8rfe07Wj8slPuZgOwv9dyDInC56_HHyv7wWifJAbdAEBZeh9aoNx1BDDm3aSB8pnwRJUuh0IZheONnRLJEn3V0XyajnYIC1zPdg56iikYFJaehmAjGDk1vk-FrSfrU6kYt_vc3i4qijEGdih4BdmTJ89',
    date: 'Nov 18, 2023',
    time: '20:15',
    theater: 'Downtown Plex',
    seats: ['J5', 'J6'],
    status: 'pending',
    format: '2D Dolby',
    reference: '#BK9910234',
  },
  {
    id: '3',
    movieTitle: 'Oppenheimer',
    genres: ['Drama', 'History'],
    duration: '3h 1m',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4X5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y',
    date: 'Oct 25, 2023',
    time: '16:00',
    theater: 'Grand Cinema',
    seats: ['C5', 'C6', 'C7'],
    status: 'confirmed',
    format: '70mm',
    reference: '#BK7458932',
  },
  {
    id: '4',
    movieTitle: 'John Wick: Chapter 4',
    genres: ['Action', 'Thriller'],
    duration: '2h 49m',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5U6V7W8X9Y',
    date: 'Sep 10, 2023',
    time: '21:45',
    theater: 'Downtown Plex',
    seats: ['H10'],
    status: 'cancelled',
    format: '4DX',
    reference: '#BK5671234',
  },
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = useMemo(() => {
    let filtered = bookingsData.slice();

    // Filter by tab status
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(booking => booking.status === 'confirmed' || booking.status === 'pending');
    } else if (activeTab === 'past') {
      filtered = filtered.filter(booking => booking.status === 'confirmed'); // In real app, check date
    } else {
      filtered = filtered.filter(booking => booking.status === 'cancelled');
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.theater.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const handleCancelBooking = (bookingId: string) => {
    console.log('Cancel booking:', bookingId);
    // Implement cancellation logic
  };

  const handleModifyBooking = (bookingId: string) => {
    console.log('Modify booking:', bookingId);
    // Implement modification logic
  };

  const handleViewTicket = (bookingId: string) => {
    console.log('View ticket:', bookingId);
    // Implement view ticket logic
  };

  const handleCompletePayment = (bookingId: string) => {
    console.log('Complete payment:', bookingId);
    // Implement payment logic
  };

  return (
    <div className="flex flex-1 w-full mx-auto">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 lg:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <BookingsHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="flex-1">
            {filteredBookings.length > 0 ? (
              <BookingList
                bookings={filteredBookings}
                onCancelBooking={handleCancelBooking}
                onModifyBooking={handleModifyBooking}
                onViewTicket={handleViewTicket}
                onCompletePayment={handleCompletePayment}
              />
            ) : (
              <BookingEmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}