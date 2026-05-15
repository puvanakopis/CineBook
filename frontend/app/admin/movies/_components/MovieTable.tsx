'use client';

import Image from 'next/image';
import { Movie } from '@/interfaces/movieInterface';
import { MdEdit, MdDelete } from 'react-icons/md';
import Loading from '@/components/Loading';
import getImage from '@/utils/imageUrl';
import { useState, useMemo, useEffect } from 'react';
import Pagination from '../../_components/Pagination';

interface MovieTableProps {
    movies: Movie[];
    isLoading: boolean;
    getReleaseStatus: (releaseDate: string) => string;
    getAgeRating: (movie: Movie) => string;
    onEdit: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
}

export function MovieTable({
    movies,
    isLoading,
    getReleaseStatus,
    getAgeRating,
    onEdit,
    onDelete,
}: MovieTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return movies.slice(startIndex, startIndex + itemsPerPage);
    }, [movies, currentPage]);

    // Reset to first page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [movies.length]);

    if (isLoading) {
        return (
            <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
                <div className="p-12 text-center">
                    <Loading inline size="lg" />
                    <p className="mt-4 text-slate-500 dark:text-[#b99d9d]">Loading movies...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-[#1a0f0f]">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Poster</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Movie</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Genre</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Release</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-[#b99d9d]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-[#392828]">
                        {currentItems.length > 0 ? (
                            currentItems.map((movie) => {
                                const status = getReleaseStatus(movie.releaseDate);
                                const posterSrc = getImage(movie.poster, "movies");

                                return (
                                    <tr key={movie._id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="relative h-24 w-16 overflow-hidden rounded-2xl border border-gray-200 dark:border-[#392828] bg-[#0f0b0b]">
                                                <Image
                                                    src={posterSrc}
                                                    alt={movie.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{movie.title}</h4>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-[#b99d9d]">
                                                {movie.duration} · {getAgeRating(movie)}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                            {movie.genres.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 align-top text-sm text-slate-500 dark:text-[#b99d9d]">
                                            {movie.releaseDate}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${status === 'Now Showing'
                                                ? 'bg-emerald-500/10 text-emerald-300'
                                                : status === 'Coming Soon'
                                                    ? 'bg-amber-500/10 text-amber-300'
                                                    : 'bg-slate-700 text-slate-300'
                                                }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onEdit(movie)}
                                                    className="p-1.5 text-slate-500 hover:text-primary dark:text-[#b99d9d] dark:hover:text-primary transition-colors"
                                                >
                                                    <MdEdit className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(movie)}
                                                    className="p-1.5 text-slate-500 hover:text-red-500 dark:text-[#b99d9d] dark:hover:text-red-500 transition-colors"
                                                >
                                                    <MdDelete className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                    No movies match the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={movies.length}
                itemsPerPage={itemsPerPage}
            />
        </section>
    );
}