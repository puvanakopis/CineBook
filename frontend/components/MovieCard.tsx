import React from "react";
import { FaRegStar } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";

export interface MovieCardProps {
    title: string;
    genre: string;
    duration: string;
    rating: number;
    poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genre, duration, rating, poster }) => {
    return (
        <div className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-1"><FaRegStar /></span>
                    <span className="text-white text-xs font-bold">{rating.toFixed(1)}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2">
                    <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2">
                        Book Now
                    </button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-white text-lg font-bold truncate group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-text-secondary text-xs font-medium bg-[#392828] px-2 py-0.5 rounded">{genre}</p>
                    <span className="text-text-secondary text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                            <MdSchedule className="text-text-secondary text-[14px]" />
                        </span>
                        {duration}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;