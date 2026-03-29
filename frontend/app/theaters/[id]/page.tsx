"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { theaters } from "@/data/theater";
import { Theater, Screen, MovieShowtime, TimeSlot } from "@/interface/theater";
import TheaterHero from "./_components/TheaterHero";
import TheaterShowtimes from "./_components/TheaterShowtimes";
import TheaterInfo from "./_components/TheaterInfo";
import LocationMap from "./_components/LocationMap";

export default function TheaterDetailPage() {
    const params = useParams();
    const theaterId = params?.id ? (params.id as string) : null;
    const theater = theaters.find((t) => t.theater_id === theaterId);

    const [selectedDate, setSelectedDate] = useState<string>(getDefaultDate(theater));
    const [selectedMovieFilter, setSelectedMovieFilter] = useState<string>("all");

    function getDefaultDate(theater: Theater | undefined): string {
        if (!theater) return "";
        const allDates = getAllDates(theater.screens);
        return allDates[0] || "";
    }

    function getAllDates(screens: Screen[]): string[] {
        const dateSet = new Set<string>();
        screens.forEach((screen) => {
            screen.currentMovies.forEach((movie) => {
                movie.showtimes.forEach((showtime) => {
                    dateSet.add(showtime.date);
                });
            });
        });
        return Array.from(dateSet).sort();
    }

    function formatDateDisplay(dateString: string): { day: string; month: string; weekday: string } {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return {
                day: date.getDate().toString(),
                month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
                weekday: "Today",
            };
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return {
                day: date.getDate().toString(),
                month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
                weekday: "Tomorrow",
            };
        } else {
            return {
                day: date.getDate().toString(),
                month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
                weekday: date.toLocaleString("default", { weekday: "short" }),
            };
        }
    }

    function getMoviesForDate(screens: Screen[], date: string): Array<{
        movie: MovieShowtime;
        screens: { screen: Screen; showtime: TimeSlot; format: string }[];
    }> {
        const movieMap = new Map<
            number,
            {
                movie: MovieShowtime;
                screens: { screen: Screen; showtime: TimeSlot; format: string }[];
            }
        >();

        screens.forEach((screen) => {
            screen.currentMovies.forEach((movie) => {
                const showtimeForDate = movie.showtimes.find((st) => st.date === date);
                if (showtimeForDate && showtimeForDate.times.length > 0) {
                    if (!movieMap.has(movie.movie_id)) {
                        movieMap.set(movie.movie_id, {
                            movie: movie,
                            screens: [],
                        });
                    }
                    showtimeForDate.times.forEach((timeSlot) => {
                        movieMap.get(movie.movie_id)?.screens.push({
                            screen: screen,
                            showtime: timeSlot,
                            format: screen.type,
                        });
                    });
                }
            });
        });

        return Array.from(movieMap.values());
    }

    function getUniqueMovies(screens: Screen[]): { id: number; title: string }[] {
        const movieSet = new Map<number, string>();
        screens.forEach((screen) => {
            screen.currentMovies.forEach((movie) => {
                movieSet.set(movie.movie_id, movie.title);
            });
        });
        return Array.from(movieSet.entries()).map(([id, title]) => ({ id, title }));
    }

    const allDates = useMemo(() => (theater ? getAllDates(theater.screens) : []), [theater]);
    const uniqueMovies = useMemo(() => (theater ? getUniqueMovies(theater.screens) : []), [theater]);
    const moviesWithShowtimes = useMemo(
        () => (theater ? getMoviesForDate(theater.screens, selectedDate) : []),
        [theater, selectedDate]
    );

    const filteredMoviesWithShowtimes = useMemo(() => {
        if (selectedMovieFilter === "all") return moviesWithShowtimes;
        return moviesWithShowtimes.filter(
            (item) => item.movie.movie_id.toString() === selectedMovieFilter
        );
    }, [moviesWithShowtimes, selectedMovieFilter]);

    if (!theater) {
        return (
            <main>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Theater Not Found</h1>
                        <p className="text-gray-400">The theater you are looking for does not exist.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <TheaterHero
                name={theater.name}
                address={theater.address}
                rating={theater.rating}
                totalVotes={theater.totalVotes}
                image={theater.image}
                amenities={theater.amenities}
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-12 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <TheaterShowtimes
                            screens={theater.screens}
                            selectedDate={selectedDate}
                            allDates={allDates}
                            onDateSelect={setSelectedDate}
                            formatDateDisplay={formatDateDisplay}
                            uniqueMovies={uniqueMovies}
                            selectedMovieFilter={selectedMovieFilter}
                            onMovieFilterChange={setSelectedMovieFilter}
                            filteredMoviesWithShowtimes={filteredMoviesWithShowtimes}
                        />
                    </div>

                    <div className="lg:w-1/3 space-y-8">
                        <TheaterInfo
                            description={theater.description}
                            phone={theater.phone}
                            email={theater.email}
                            features={theater.features}
                            amenities={theater.amenities}
                        />
                        <LocationMap
                            address={theater.address}
                            location={theater.location}
                            name={theater.name}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}