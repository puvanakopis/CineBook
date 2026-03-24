'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IoMdStarOutline } from "react-icons/io";

interface MovieCardProps {
    movie: {
        movie_id: string;
        title: string;
        poster: string;
        rating: number;
        genres: string[];
        duration: string;
        languages: string;
        formats: string;
    };
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const router = useRouter();

    return (
        <div
            className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col h-full cursor-pointer"
            onClick={() => router.push(`/movies/${movie.movie_id}`)}
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                    <IoMdStarOutline className="text-yellow-500 text-sm" />
                    <span className="text-white text-xs font-bold">{movie.rating}</span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold truncate group-hover:text-primary transition-colors">
                    {movie.title}
                </h3>
                <div className="flex items-center justify-between mt-2 mb-4">
                    <p className="text-text-secondary text-xs font-medium bg-[#392828] px-2 py-0.5 rounded">
                        {movie.genres.join(' • ')}
                    </p>
                    <span className="text-text-secondary text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {movie.duration}
                    </span>
                </div>
                <div className="mb-3 text-xs text-text-secondary">
                    <span className="block truncate">{movie.languages}</span>
                    <span className="block mt-1">{movie.formats}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/movies/${movie.movie_id}`);
                    }}
                    className="mt-auto w-full bg-primary hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default MovieCard;