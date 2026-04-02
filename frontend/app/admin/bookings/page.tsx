'use client';

import { useMemo, useState } from 'react';
import { BookingHeader } from './_components/BookingHeader';
import { BookingStatsGrid } from './_components/BookingStatsGrid';
import { BookingFilters } from './_components/BookingFilters';
import { BookingTable } from './_components/BookingTable';
import { bookings } from '@/data/booking';

const statuses = ['Confirmed', 'Pending', 'Cancelled'];

export default function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchMatch =
        !searchQuery ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch =
        selectedStatus === 'All Statuses' || booking.status === selectedStatus;

      return searchMatch && statusMatch;
    });
  }, [searchQuery, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      revenue: bookings.filter(b => b.status === 'Confirmed').reduce((acc, b) => acc + b.totalPrice, 0),
      pending: bookings.filter(b => b.status === 'Pending').length,
      cancelled: bookings.filter(b => b.status === 'Cancelled').length,
    };
  }, []);

  return (
    <>
      <BookingHeader />
      
      <BookingStatsGrid
        total={stats.total}
        revenue={stats.revenue}
        pending={stats.pending}
        cancelled={stats.cancelled}
      />

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

