'use client';

import { useState, useEffect } from "react";
import TheaterHeader from "@/containers/theaters/TheaterHeader";
import TheaterFilters from "@/containers/theaters/TheaterFilters";
import TheaterGrid from "@/containers/theaters/TheaterGrid";
import SortControls from "@/containers/theaters/SortControls";
import Pagination from "@/containers/theaters/Pagination";
import EmptyState from "@/containers/theaters/EmptyState";
import { theaters } from '@/data/theater';
import { Theater } from '@/interface/theater';

export default function Theaters() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTheaters, setFilteredTheaters] = useState<Theater[]>(theaters as Theater[]);

  const theatersPerPage = 9;

  const allCities = Array.from(new Set(theaters.map(theater => theater.city))).sort();

  useEffect(() => {
    let filtered = [...theaters] as Theater[];

    if (searchQuery) {
      filtered = filtered.filter(theater =>
        theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theater.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCities.length > 0) {
      filtered = filtered.filter(theater =>
        selectedCities.includes(theater.city)
      );
    }

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(theater =>
        selectedAmenities.some(amenity => theater.amenities.includes(amenity))
      );
    }

    if (selectedChains.length > 0) {
      filtered = filtered.filter(theater =>
        selectedChains.includes(theater.chain)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Popularity':
          return b.rating - a.rating;
        case 'Name (A-Z)':
          return a.name.localeCompare(b.name);
        case 'Name (Z-A)':
          return b.name.localeCompare(a.name);
        case 'Rating (High to Low)':
          return b.rating - a.rating;
        case 'Rating (Low to High)':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    setFilteredTheaters(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCities, selectedAmenities, selectedChains, sortBy]);

  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };


  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCities([]);
    setSelectedAmenities([]);
    setSelectedChains([]);
  };

  const indexOfLastTheater = currentPage * theatersPerPage;
  const indexOfFirstTheater = indexOfLastTheater - theatersPerPage;
  const currentTheaters = filteredTheaters.slice(indexOfFirstTheater, indexOfLastTheater);
  const totalPages = Math.ceil(filteredTheaters.length / theatersPerPage);

  return (
    <div>
      <TheaterHeader />
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-4 md:px-10 lg:px-20 py-10 gap-8">
        <TheaterFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCities={selectedCities}
          allCities={allCities}
          handleCityToggle={handleCityToggle}
        />

        <div className="flex-1">
          <SortControls
            filteredTheatersCount={filteredTheaters.length}
            indexOfFirstTheater={indexOfFirstTheater}
            indexOfLastTheater={indexOfLastTheater}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {currentTheaters.length > 0 ? (
            <>
              <TheaterGrid theaters={currentTheaters} viewMode={viewMode} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}