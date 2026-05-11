// TheaterFilters.tsx (updated)
'use client';

import { IoMdSearch } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

interface TheaterFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCities: string[];
    allCities: string[];
    handleCityToggle: (city: string) => void;
    selectedAmenities: string[];
    allAmenities: string[];
    handleAmenityToggle: (amenity: string) => void;
    handleClearFilters: () => void;
}

const TheaterFilters = ({
    searchQuery,
    setSearchQuery,
    selectedCities,
    allCities,
    handleCityToggle,
    selectedAmenities,
    allAmenities,
    handleAmenityToggle,
    handleClearFilters,
}: TheaterFiltersProps) => {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="pb-6 border-b border-[#392828]">
                <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                    Search
                    <IoMdSearch className="text-text-secondary text-sm" />
                </h3>
                <div className="relative">
                    <input
                        className="w-full bg-input-bg border border-[#392828] rounded-lg px-3 py-2 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Enter theater or city"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                            onClick={() => setSearchQuery('')}
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Location / City */}
            <div className="pb-6 border-b border-[#392828]">
                <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                    Location
                    <CiLocationOn className="text-text-secondary text-sm" />
                </h3>
                <div className="space-y-2">
                    {allCities.map((city) => (
                        <label key={city} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                className="rounded accent-primary border-[#392828] bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                type="checkbox"
                                checked={selectedCities.includes(city)}
                                onChange={() => handleCityToggle(city)}
                            />
                            <span className="text-text-secondary group-hover:text-white transition-colors text-sm">
                                {city}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Amenities */}
            {allAmenities.length > 0 && (
                <div className="pb-6 border-b border-[#392828]">
                    <h3 className="font-bold text-white mb-4">Amenities</h3>
                    <div className="space-y-2">
                        {allAmenities.map((amenity) => (
                            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="rounded accent-primary border-[#392828] bg-input-bg text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4"
                                    type="checkbox"
                                    checked={selectedAmenities.includes(amenity)}
                                    onChange={() => handleAmenityToggle(amenity)}
                                />
                                <span className="text-text-secondary group-hover:text-white transition-colors text-sm">
                                    {amenity}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear filters button */}
            {(searchQuery || selectedCities.length > 0 || selectedAmenities.length > 0) && (
                <button
                    onClick={handleClearFilters}
                    className="w-full py-2 text-center text-sm text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                    Clear all filters
                </button>
            )}
        </aside>
    );
};

export default TheaterFilters;