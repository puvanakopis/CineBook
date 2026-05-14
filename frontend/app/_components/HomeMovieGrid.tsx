"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
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
    const [activeTab, setActiveTab] = useState("All");

    const filteredMovies = useMemo(() => {
        if (!movies) return [];

        let result = [...movies];

        switch (activeTab) {
            case "Trending":
                return result.sort((a, b) => {
                    const rA = a.reviews?.length ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length : 0;
                    const rB = b.reviews?.length ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : 0;
                    return rB - rA;
                }).slice(0, 8);

            case "New":
                return result.sort((a, b) =>
                    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
                ).slice(0, 8);

            case "Coming Soon":
                return result.filter(m =>
                    m.isUpcoming || new Date(m.releaseDate) > new Date()
                ).slice(0, 8);

            default:
                return result.slice(0, 8);
        }
    }, [movies, activeTab]);

    const cards: MovieCardProps[] = filteredMovies.map(mapToCard);

    const tabs = ["All", "Trending", "New", "Coming Soon"];

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 mt-8 md:px-10 lg:px-20 py-16">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.015em] mb-2 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                        {activeTab === "Coming Soon" ? "Coming Soon" : "Now Showing"}
                    </h2>
                    <p className="text-text-secondary">
                        {activeTab === "Coming Soon"
                            ? "Get ready for these highly anticipated releases."
                            : "Don't miss the latest movies currently in theaters."}
                    </p>
                </div>

                <div className="flex items-center bg-surface-dark p-1 rounded-lg border border-[#392828]">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-md text-sm transition-all duration-200 ${activeTab === tab
                                ? "bg-primary text-white font-bold shadow-sm"
                                : "text-text-secondary hover:text-white font-medium"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Movie Cards Grid */}
            {cards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((movie, idx) => (
                        <MovieCard key={idx} {...movie} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-surface-dark p-6 rounded-full mb-6 border border-[#392828]">
                        <MdOutlineMovie className="text-6xl text-primary/40" />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">No Movies Found</h3>
                    <p className="text-text-secondary max-w-md mx-auto">
                        We couldn&apos;t find any movies for the &quot;{activeTab}&quot; category right now.
                    </p>
                </div>
            )}

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