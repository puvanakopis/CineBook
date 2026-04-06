"use client";

import { useRouter } from "next/navigation";
import { Screen, MovieShowtime, TimeSlot } from "@/interfaces/theater";
import Image from "next/image";

interface TheaterShowtimesProps {
    screens: Screen[];
    selectedDate: string;
    allDates: string[];
    onDateSelect: (date: string) => void;
    formatDateDisplay: (dateString: string) => { day: string; month: string; weekday: string };
    uniqueMovies: { id: number; title: string }[];
    selectedMovieFilter: string;
    onMovieFilterChange: (filter: string) => void;
    filteredMoviesWithShowtimes: Array<{
        movie: MovieShowtime;
        screens: { screen: Screen; showtime: TimeSlot; format: string }[];
    }>;
}

const TheaterShowtimes = ({
    selectedDate,
    allDates,
    onDateSelect,
    formatDateDisplay,
    filteredMoviesWithShowtimes,
}: TheaterShowtimesProps) => {
    const router = useRouter();

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "sold-out":
                return "text-red-500";
            case "almost-full":
            case "fast-filling":
                return "text-orange-500";
            default:
                return "text-green-500";
        }
    };

    const getStatusText = (status?: string) => {
        switch (status) {
            case "sold-out":
                return "Sold Out";
            case "almost-full":
                return "Almost Full";
            case "fast-filling":
                return "Fast Filling";
            default:
                return "Available";
        }
    };

    const handleShowtimeClick = (st: { screen: Screen; showtime: TimeSlot; format: string }) => {
        if (!st.showtime.isSoldOut) {
            router.push("/select-seats");
        }
    };

    return (
        <div id="showtimes">
            {/* Header with Date Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <h2 className="text-3xl font-bold text-white border-l-4 border-primary pl-4">Showtimes</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {allDates.map((date) => {
                        const { day, month, weekday } = formatDateDisplay(date);
                        return (
                            <button
                                key={date}
                                onClick={() => onDateSelect(date)}
                                className={`flex flex-col items-center justify-center min-w-[80px] h-16 rounded-lg border transition-all ${selectedDate === date
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "bg-surface-dark text-text-secondary border-[#392828] hover:border-primary hover:text-white"
                                    }`}
                            >
                                <span className="text-xs font-medium opacity-80">{month}</span>
                                <span className="text-xl font-bold">{day}</span>
                                <span className="text-xs font-medium">{weekday}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Showtimes Listings */}
            <div className="space-y-6">
                {filteredMoviesWithShowtimes.length === 0 ? (
                    <div className="bg-surface-dark rounded-xl border border-[#392828] p-12 text-center">
                        <p className="text-text-secondary text-lg">
                            No showtimes available for this date. Please select another date.
                        </p>
                    </div>
                ) : (
                    filteredMoviesWithShowtimes.map((item) => {
                        const { movie, screens: screenShowtimes } = item;
                        const groupedByFormat = screenShowtimes.reduce((acc, curr) => {
                            const format = curr.format;
                            if (!acc[format]) acc[format] = [];
                            acc[format].push(curr);
                            return acc;
                        }, {} as Record<string, typeof screenShowtimes>);

                        return (
                            <div
                                key={movie.movie_id}
                                className="bg-surface-dark rounded-xl border border-[#392828] overflow-hidden hover:border-primary/30 transition-colors"
                            >
                                {/* Movie Header */}
                                <div className="p-6 border-b border-[#392828]">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-24 h-32 relative rounded-lg overflow-hidden bg-[#181111] flex-shrink-0">
                                            <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary font-medium">
                                                <span className="border border-text-secondary/30 px-1 rounded">
                                                    {movie.certificate || "U/A"}
                                                </span>
                                                <span>{movie.genres?.join(", ")}</span>
                                                <span>•</span>
                                                <span>{movie.duration}</span>
                                                <span>•</span>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-medium">
                                                    ⭐ {movie.rating}/10
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Showtimes */}
                                <div className="p-6">
                                    {Object.entries(groupedByFormat).map(([format, showtimes]) => (
                                        <div key={format} className="mb-6 last:mb-0">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">{format}</span>
                                                {format.includes("IMAX") && (
                                                    <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 rounded border border-yellow-500/30">
                                                        Premium
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {showtimes.map((st, idx) => (
                                                    <button
                                                        key={`${st.screen.screen_id}-${st.showtime.time}-${idx}`}
                                                        disabled={st.showtime.isSoldOut}
                                                        onClick={() => handleShowtimeClick(st)}
                                                        className={`group relative flex flex-col items-center justify-center py-2 px-2 rounded border transition-all ${st.showtime.isSoldOut
                                                            ? "opacity-50 cursor-not-allowed bg-[#221a1a] border-[#392828]"
                                                            : "border-[#392828] bg-[#221a1a] hover:bg-primary hover:border-primary"
                                                            }`}
                                                    >
                                                        <span className="text-sm font-bold text-white">{st.showtime.time}</span>
                                                        <div className="text-[10px] font-medium mt-0.5">
                                                            {st.showtime.isSoldOut ? (
                                                                <span className="text-red-400">Sold Out</span>
                                                            ) : (
                                                                <span className={getStatusColor(st.showtime.status)}>
                                                                    {getStatusText(st.showtime.status)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {!st.showtime.isSoldOut && (
                                                            <div className="text-[9px] text-text-secondary group-hover:text-white/80 mt-0.5">
                                                                {st.showtime.currency} {st.showtime.price.toFixed(2)}
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TheaterShowtimes;