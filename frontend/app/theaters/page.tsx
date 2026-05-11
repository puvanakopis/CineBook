'use client';

import { useState, useEffect, useMemo } from "react";
import { useTheater } from "@/contexts/TheaterContext";
import TheaterHeader from "./_components/TheaterHeader";
import TheaterFilters from "./_components/TheaterFilters";
import TheaterGrid from "./_components/TheaterGrid";
import TheaterSortControls from "./_components/TheaterSortControls";
import Pagination from "./_components/Pagination";
import TheaterEmptyState from "./_components/TheaterEmptyState";
import Loading from "@/components/Loading";
import { Theater } from "@/interfaces/theaterInterface";
type TheaterWithRating = Theater & { avgRating: number };

export default function Theaters() {
  const { theaters, isLoading, error, getTheaters } = useTheater();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTheaters, setFilteredTheaters] = useState<TheaterWithRating[]>([]);

  const theatersPerPage = 9;

  const getAverageRating = (theater: Theater): number => {
    if (!theater.reviews || theater.reviews.length === 0) return 0;
    const sum = theater.reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / theater.reviews.length).toFixed(1));
  };

  const allCities = useMemo(() => {
    const cities = new Set(theaters.map(theater => theater.city).filter(Boolean));
    return Array.from(cities).sort();
  }, [theaters]);

  useEffect(() => {
    if (!theaters.length) return;

    let filtered = [...theaters];

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
        selectedAmenities.some(amenity => theater.amenities?.includes(amenity))
      );
    }

    filtered.sort((a, b) => {
      const ratingA = getAverageRating(a);
      const ratingB = getAverageRating(b);
      switch (sortBy) {
        case 'Popularity':
          return ratingB - ratingA;
        case 'Name (A-Z)':
          return a.name.localeCompare(b.name);
        case 'Name (Z-A)':
          return b.name.localeCompare(a.name);
        case 'Rating (High to Low)':
          return ratingB - ratingA;
        case 'Rating (Low to High)':
          return ratingA - ratingB;
        default:
          return 0;
      }
    });

    setFilteredTheaters(filtered.map(t => ({ ...t, avgRating: getAverageRating(t) })));
    setCurrentPage(1);
  }, [theaters, searchQuery, selectedCities, selectedAmenities, sortBy]);

  useEffect(() => {
    getTheaters();
  }, [getTheaters]);

  const handleCityToggle = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCities([]);
    setSelectedAmenities([]);
  };

  const indexOfLastTheater = currentPage * theatersPerPage;
  const indexOfFirstTheater = indexOfLastTheater - theatersPerPage;
  const currentTheaters = filteredTheaters.slice(indexOfFirstTheater, indexOfLastTheater);
  const totalPages = Math.ceil(filteredTheaters.length / theatersPerPage);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

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
          selectedAmenities={selectedAmenities}
          allAmenities={Array.from(new Set(theaters.flatMap(t => t.amenities || [])))}
          handleAmenityToggle={handleAmenityToggle}
          handleClearFilters={handleClearFilters}
        />

        <div className="flex-1">
          <TheaterSortControls
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
            <TheaterEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}