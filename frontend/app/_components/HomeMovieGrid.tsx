"use client";

import React from "react";
import Link from "next/link";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";
import { IoArrowForward } from "react-icons/io5";
import { Movie } from "@/interfaces/movieInterface";

type Props = {
    movies?: Movie[];
};

const mapToCard = (m: Movie): MovieCardProps => {
    const rating = m.reviews && m.reviews.length
        ? m.reviews.reduce((s, r) => s + (r.rating || 0), 0) / m.reviews.length
        : 0;

    return {
        id: m._id,
        title: m.title,
        genre: m.genres ? m.genres.join(", ") : "",
        duration: m.duration || "",
        rating: Number(rating.toFixed(1)),
        poster: m.poster || "/movies/placeholder.jpg",
    };
};

const HomeMovieGrid: React.FC<Props> = ({ movies }) => {
    const cards: MovieCardProps[] = (movies && movies.length > 0)
        ? movies.map(mapToCard)
        : [];

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 mt-8 md:px-10 lg:px-20 py-16">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.015em] mb-2 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                        Now Showing
                    </h2>
                    <p className="text-text-secondary">
                        Don&apos;t miss the latest movies currently in theaters.
                    </p>
                </div>

                <div className="flex items-center bg-surface-dark p-1 rounded-lg border border-[#392828]">
                    <button className="px-4 py-1.5 rounded-md bg-primary text-white text-sm font-bold shadow-sm">
                        All
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-text-secondary hover:text-white transition-colors text-sm font-medium">
                        Trending
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-text-secondary hover:text-white transition-colors text-sm font-medium">
                        New
                    </button>
                    <button className="px-4 py-1.5 rounded-md text-text-secondary hover:text-white transition-colors text-sm font-medium">
                        Coming Soon
                    </button>
                </div>
            </div>

            {/* Movie Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((movie, idx) => (
                    <MovieCard key={idx} {...movie} />
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 flex justify-center">
                <Link href="/movies" className="bg-transparent border border-[#392828] hover:border-primary text-white hover:text-primary font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 group">
                    View All Movies
                    <span className="group-hover:translate-x-1 transition-transform">
                        <IoArrowForward />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default HomeMovieGrid;