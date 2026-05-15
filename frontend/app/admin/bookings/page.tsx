'use client';

import { useMemo, useState, useEffect } from 'react';
import { BookingHeader } from './_components/BookingHeader';
import { BookingStatsGrid } from './_components/BookingStatsGrid';
import { BookingFilters } from './_components/BookingFilters';
import { BookingTable } from './_components/BookingTable';
import { useBooking } from '@/contexts/BookingContext';
import Loading from '@/components/Loading';

const statuses = ['Confirmed', 'Completed', 'Cancelled'];

export default function AdminBookings() {
  const { bookings, isLoading, error, getBookings } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingId = booking._id || booking.id || '';
      const searchMatch =
        !searchQuery ||
        bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch =
        selectedStatus === 'All Statuses' || booking.status === selectedStatus;

      return searchMatch && statusMatch;
    });
  }, [bookings, searchQuery, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      revenue: bookings
        .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
        .reduce((acc, b) => acc + (b.totalPrice || 0), 0),
      completed: bookings.filter(b => b.status === 'Completed').length,
      cancelled: bookings.filter(b => b.status === 'Cancelled').length,
    };
  }, [bookings]);

  if (isLoading && bookings.length === 0) return <Loading message="Loading Bookings..." />;

  return (
    <>
      <BookingHeader />
      
      <BookingStatsGrid
        total={stats.total}
        revenue={stats.revenue}
        completed={stats.completed}
        cancelled={stats.cancelled}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <BookingFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statuses={statuses}
        />

        <BookingTable
          bookings={filteredBookings}
        />
      </div>
    </>
  );
}

