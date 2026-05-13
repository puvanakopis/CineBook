"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

interface HomeMovieFilterProps {
    genres: string[];
    theaters: string[];
}

const HomeMovieFilter = ({ genres, theaters }: HomeMovieFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "All Dates");
    const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "All Genres");
    const [selectedTheater, setSelectedTheater] = useState(searchParams.get("theater") || "All Locations");

    const dates = [
        { label: "All Dates", value: "All Dates" },
        ...Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const label = i === 0 ? `Today, ${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`
                : i === 1 ? `Tomorrow, ${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`
                    : `${d.toLocaleDateString('en-GB', { weekday: 'short' })}, ${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
            const value = d.toISOString().split('T')[0];
            return { label, value };
        })
    ];

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedDate && selectedDate !== "All Dates") {
            params.set("date", selectedDate);
        } else {
            params.delete("date");
        }

        if (selectedGenre && selectedGenre !== "All Genres") {
            params.set("genre", selectedGenre);
        } else {
            params.delete("genre");
        }

        if (selectedTheater && selectedTheater !== "All Locations") {
            params.set("theater", selectedTheater);
        } else {
            params.delete("theater");
        }

        const query = params.toString();
        router.push(query ? `/movies?${query}` : "/movies", { scroll: true });
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 -mt-8 relative z-20">
            <div className="bg-surface-dark rounded-xl p-4 md:p-6 border border-[#392828] shadow-2xl flex flex-col lg:flex-row gap-4 lg:gap-6 items-center">
                {/* Filters */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {/* Date */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Date
                        </span>
                        <div className="relative">
                            <select
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium"
                            >
                                {dates.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineCalendarToday />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Genre */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Genre
                        </span>
                        <div className="relative">
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium"
                            >
                                <option>All Genres</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineMovie />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Theater */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Theater
                        </span>
                        <div className="relative">
                            <select
                                value={selectedTheater}
                                onChange={(e) => setSelectedTheater(e.target.value)}
                                className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium"
                            >
                                <option>All Locations</option>
                                {theaters.map((theater) => (
                                    <option key={theater} value={theater}>
                                        {theater}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineLocationOn />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="w-full lg:w-auto bg-white text-background-dark hover:bg-gray-200 font-bold h-12 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 self-end mt-6 lg:mt-0"
                >
                    <span className="material-symbols-outlined"><IoSearch /></span>
                    Find Movies
                </button>
            </div>
        </div>
    );
};

export default HomeMovieFilter;