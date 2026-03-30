'use client';

interface BookingsHeaderProps {
  activeTab: 'upcoming' | 'past' | 'cancelled';
  setActiveTab: (tab: 'upcoming' | 'past' | 'cancelled') => void;
}

export function BookingsHeader({}: BookingsHeaderProps) {
  return (
    <section className="pb-8 border-b border-[#392828]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
              My Bookings
            </h1>
            <p className="text-text-secondary text-base">
              Manage your upcoming movie plans, view tickets, and modify reservations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}