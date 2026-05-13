"use client";

import { ChangeEvent } from 'react';

interface MovieHeaderProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}

const MovieHeader = ({ searchQuery, setSearchQuery }: MovieHeaderProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

    return (
        <div className="relative py-12 bg-surface-dark border-b border-[#392828]">
            <div className="w-full mx-auto md:px-10 lg:px-20 relative z-20 max-w-[1400px]">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
                    All Movies
                </h1>
                <p className="text-text-secondary max-w-2xl text-lg">
                    Browse our extensive collection of current screenings. Filter by genre,
                    date, or theater to find the perfect showtime for you.
                </p>

                <div className="mt-6 max-w-md">
                    <input
                        value={searchQuery}
                        onChange={onChange}
                        placeholder="Search movies, genres, or synopsis"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/60"
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieHeader;