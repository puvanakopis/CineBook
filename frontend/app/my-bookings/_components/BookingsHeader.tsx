'use client';

interface BookingsHeaderProps {
  activeTab: 'upcoming' | 'past' | 'cancelled';
  setActiveTab: (tab: 'upcoming' | 'past' | 'cancelled') => void;
}

export function BookingsHeader({ }: BookingsHeaderProps) {
  return (
    <section className="mb-16">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white border-l-4 border-primary pl-6 tracking-wide">
          My Bookings
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-3xl leading-relaxed">
          Manage your upcoming movie plans, view tickets, and modify reservations.
        </p>
      </div>
    </section>
  );
}