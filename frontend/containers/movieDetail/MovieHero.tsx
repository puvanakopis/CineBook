"use client";

import Image, { StaticImageData } from "next/image";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { MdOutlineVideoLabel } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";

interface MovieHeroProps {
    title: string;
    rating: number;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string;
    formats: string;
    synopsis: string;
    poster: string | StaticImageData;
    trailerUrl: string;
}

const MovieHero = ({
    title,
    rating,
    genres,
    duration,
    releaseDate,
    languages,
    formats,
    synopsis,
    poster,
    trailerUrl,
}: MovieHeroProps) => {
    return (
        <div className="relative w-full bg-surface-dark border-b border-[#392828]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={poster}
                    alt="Movie Background"
                    fill
                    className="object-cover opacity-10 blur-xl scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-surface-dark/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent" />
            </div>

            <div className="relative max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    {/* Poster */}
                    <div className="w-full lg:w-[350px] flex-shrink-0">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-[#392828]">
                            <Image
                                src={poster}
                                alt={`${title} Poster`}
                                fill
                                className="object-cover"
                                sizes="350px"
                            />

                            {/* Rating */}
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                <IoIosStarOutline className="text-yellow-500 text-base" />
                                <span className="text-white font-bold">{rating}</span>
                                <span className="text-xs text-gray-400">/10</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            <span className="px-3 py-1 rounded bg-primary/20 text-primary text-xs font-bold uppercase">
                                Now Showing
                            </span>

                            {genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="px-3 py-1 rounded bg-[#392828] text-gray-300 text-xs"
                                >
                                    {genre}
                                </span>
                            ))}

                            <span className="px-3 py-1 rounded bg-[#392828] text-gray-300 text-xs">
                                {duration}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                            {title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-8">
                            <div className="flex items-center gap-2">
                                <MdOutlineCalendarMonth className="text-primary" />
                                <span>Released {releaseDate}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MdLanguage className="text-primary" />
                                <span>{languages}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MdOutlineVideoLabel className="text-primary" />
                                <span>{formats}</span>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="mb-8 max-w-3xl">
                            <h3 className="text-white font-bold text-lg mb-2">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed">{synopsis}</p>
                        </div>

                        {/* Official Trailer */}
                        <div className="mb-8">
                            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                Official Trailer
                            </h3>
                            <a
                                href={trailerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-full max-w-2xl aspect-video bg-black rounded-xl overflow-hidden border border-[#392828] shadow-lg group flex items-center justify-center cursor-pointer"
                            >
                                <Image
                                    src={poster}
                                    alt="Trailer Thumbnail"
                                    fill
                                    className="object-cover opacity-40"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                    <div className="size-16 rounded-full bg-primary/90 text-white flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(236,19,19,0.5)]">
                                        <MdPlayArrow className="text-4xl" />
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mt-auto">
                            <a
                                href="#showtimes"
                                className="px-8 py-3 bg-primary text-white font-bold rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
                            >
                                <MdOutlineConfirmationNumber />
                                Book Tickets
                            </a>

                            <button className="px-8 py-3 bg-[#392828] text-white rounded-lg flex items-center gap-2 hover:bg-[#4a3535] transition-colors">
                                <MdOutlineFavoriteBorder />
                                Watchlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;