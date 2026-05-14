'use client';

import { Sidebar } from "@/components/Sidebar";
import { BookingsHeader } from "./_components/BookingsHeader";
import { BookingFilters } from "./_components/BookingFilters";
import { BookingList } from "./_components/BookingList";
import { BookingEmptyState } from "./_components/BookingEmptyState";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect, useState, useMemo } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default function Bookings() {
  const { myBookings, isLoading, error, getMyBookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'confirmed' | 'completed' | 'cancelled'>('confirmed');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  console.log('myBookings:', myBookings);

  const filteredBookings = useMemo(() => {
    if (!myBookings) return [];

    let filtered = myBookings.slice();

    if (activeTab === 'confirmed') {
      filtered = filtered.filter(booking => booking.status === 'Confirmed');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(booking => booking.status === 'Completed');
    } else {
      filtered = filtered.filter(booking => booking.status === 'Cancelled');
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.movieTitle.toLowerCase().includes(query) ||
        booking.theaterName.toLowerCase().includes(query) ||
        (booking._id && booking._id.toLowerCase().includes(query)) ||
        (booking.id && booking.id.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeTab, searchQuery, myBookings]);

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
      } catch (err) {
        console.error('Failed to cancel booking:', err);
      }
    }
  };

  const handleViewTicket = (bookingId: string) => {
    console.log('View ticket:', bookingId);
    window.location.href = `/tickets/${bookingId}`;
  };

  const handleCompletePayment = (bookingId: string) => {
    console.log('Complete payment:', bookingId);
    window.location.href = `/payment/${bookingId}`;
  };

  return (
    <div className="flex w-full min-h-screen bg-[#0b0909]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 space-y-20">
          <BookingsHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <BookingFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="flex-1 min-h-[400px]">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-8">
                <p className="text-red-400 text-center font-medium">{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <BiLoaderAlt className="w-12 h-12 text-primary animate-spin" />
              </div>
            ) : filteredBookings.length > 0 ? (
              <BookingList
                bookings={filteredBookings}
                onCancelBooking={handleCancelBooking}
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
