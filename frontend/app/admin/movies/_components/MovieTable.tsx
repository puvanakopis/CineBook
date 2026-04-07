'use client';

import Image from 'next/image';
import { Movie } from '@/interfaces/movieInterface';
import { MdEdit, MdDelete } from 'react-icons/md';

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
    if (isLoading) {
        return (
            <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
                <div className="p-12 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-4 text-slate-500 dark:text-[#b99d9d]">Loading movies...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#392828] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-[#392828] flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Movie catalog</h3>
                    <p className="text-sm text-slate-500 dark:text-[#b99d9d] mt-1">
                        Browse the current movie selection and track release status at a glance.
                    </p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d] font-semibold">
                    {movies.length} results
                </span>
            </div>

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
                        {movies.length > 0 ? (
                            movies.map((movie) => {
                                const status = getReleaseStatus(movie.releaseDate);

                                return (
                                    <tr key={movie._id} className="hover:bg-slate-50 dark:hover:bg-[#1f1212] transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="relative h-24 w-16 overflow-hidden rounded-2xl border border-gray-200 dark:border-[#392828] bg-[#0f0b0b]">
                                                <Image
                                                    src={`/images/${movie.poster}`}
                                                    alt={movie.title}
                                                    fill
                                                    className="object-cover"
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
        </section>
    );
}