'use client';

import TheaterCard from "./TheaterCard";
import { Theater } from '@/interface/theater';

interface TheaterGridProps {
  theaters: Theater[];
  viewMode: 'grid' | 'list';
}

const TheaterGrid = ({ theaters, viewMode }: TheaterGridProps) => {
  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      : "flex flex-col gap-6"
    }>
      {theaters.map((theater) => (
        <TheaterCard key={theater.theater_id} theater={theater} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default TheaterGrid;