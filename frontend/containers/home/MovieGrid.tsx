"use client";

import React from "react";
import MovieCard, { MovieCardProps } from "@/components/MovieCard";
import { IoArrowForward } from "react-icons/io5";

const movies: MovieCardProps[] = [
    {
        title: "Coolie",
        genre: "Action/Thriller",
        duration: "2h 45m",
        rating: 8.8,
        poster: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg",
    },
    {
        title: "Good Bad Ugly",
        genre: "Biography/Action",
        duration: "2h 32m",
        rating: 8.5,
        poster: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg",
    },
    {
        title: "The GOAT",
        genre: "Sci-Fi/Action",
        duration: "2h 59m",
        rating: 7.9,
        poster: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg",
    },
    {
        title: "Madharasi",
        genre: "Action/Drama",
        duration: "2h 22m",
        rating: 8.5,
        poster: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg",
    },
    {
        title: "Vidaamuyarchi",
        genre: "Action/Thriller",
        duration: "2h 38m",
        rating: 8.2,
        poster: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg",
    },
    {
        title: "Retro",
        genre: "Drama/Action",
        duration: "2h 43m",
        rating: 7.8,
        poster: "https://www.wallsnapy.com/img_gallery/new-retro-surya-4k-images-5102165.jpg",
    },
    {
        title: "Captain Miller",
        genre: "Sports/Drama",
        duration: "2h 28m",
        rating: 8.3,
        poster: "https://www.wallsnapy.com/img_gallery/top-captain-miller-dhanush-hd-poster-wallpaper-1080px-7975672.jpg",
    },
    {
        title: "Thug Life",
        genre: "Fantasy/Action",
        duration: "2h 34m",
        rating: 7.5,
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
    }
];

const MovieGrid: React.FC = () => {
    return (
        <section className="w-full max-w-[1600px] mx-auto px-4 mt-8 md:px-10 lg:px-20 py-16">
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
                {movies.map((movie, idx) => (
                    <MovieCard key={idx} {...movie} />
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 flex justify-center">
                <button className="bg-transparent border border-[#392828] hover:border-primary text-white hover:text-primary font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 group">
                    View All Movies
                    <span className="group-hover:translate-x-1 transition-transform">
                        <IoArrowForward />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default MovieGrid;