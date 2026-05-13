"use client";

import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useTheater } from "@/contexts/TheaterContext";
import { theaterApi } from '@/services/theaterApi';
import { movieApi } from '@/services/movieApi';
import { Theater, Screen, MovieShowtime, TimeSlot } from "@/interfaces/theaterInterface";
import { Movie as ApiMovie } from '@/interfaces/movieInterface';
import TheaterHero from "./_components/TheaterHero";
import TheaterShowtimes from "./_components/TheaterShowtimes";
import TheaterInfo from "./_components/TheaterInfo";
import LocationMap from "./_components/LocationMap";

export default function TheaterDetail() {
    const params = useParams();
    const theaterId = params?.id ? (params.id as string) : null;
    const { theaters: apiTheaters, selectedTheater } = useTheater();

    const [theater, setTheater] = useState<Theater | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedMovieFilter, setSelectedMovieFilter] = useState<string>("all");

    useEffect(() => {
        if (!theaterId) return;

        (async () => {
            let apiT: Theater | undefined;

            try {
                apiT = await theaterApi.getTheaterById(theaterId);
            } catch {
                apiT = selectedTheater ?? apiTheaters.find(t => t._id === theaterId);
            }

            if (!apiT) return;

            const moviesMap = new Map<string, ApiMovie | null>();
            const movieIdSet = new Set<string>();
            (apiT.screens || []).forEach((s) => {
                (s.shows || []).forEach((show) => {
                    const mid = show.movie;
                    const key = mid && typeof mid === 'object' && '_id' in mid ? (mid as any)._id : String(mid);
                    if (key) movieIdSet.add(key);
                });
            });

            if (movieIdSet.size > 0) {
                const ids = Array.from(movieIdSet);
                const results = await Promise.all(ids.map(async (id) => {
                    try {
                        const m = await movieApi.getMovieById(id);
                        return { id, movie: m };
                    } catch {
                        return { id, movie: null };
                    }
                }));

                results.forEach(r => moviesMap.set(r.id, r.movie));
            }

            const uiScreens: Screen[] = (apiT.screens || []).map((s) => {
                const movieGroups = new Map<string, MovieShowtime & { showtimes: { date: string; times: TimeSlot[] }[] }>();

                (s.shows || []).forEach((show) => {
                    const movieId = show.movie;
                    const movieKey = movieId && typeof movieId === 'object' && '_id' in movieId ? (movieId as any)._id : String(movieId);
                    if (!movieGroups.has(movieKey)) {
                        const movieObj = moviesMap.get(movieKey);
                        const parsedIdMatch = movieKey.match(/\d+/);
                        const numericId = parsedIdMatch ? parseInt(parsedIdMatch[0], 10) : 0;
                        movieGroups.set(movieKey, {
                            movie_id: numericId,
                            title: movieObj?.title || "Unknown",
                            rating: 0,
                            genres: movieObj?.genres || [],
                            duration: movieObj?.duration || "",
                            certificate: undefined,
                            poster: movieObj?.poster || "",
                            showtimes: [],
                        });
                    }

                    const group = movieGroups.get(movieKey)!;
                    const dateEntry = group.showtimes.find((d) => d.date === show.date);
                    const timeSlot: TimeSlot = {
                        time: `${show.startTime} - ${show.endTime}`,
                        price: show.price,
                        currency: show.currency || "LKR",
                        isSoldOut: show.status === "sold-out",
                        status: show.status,
                    };
                    if (dateEntry) {
                        dateEntry.times.push(timeSlot);
                    } else {
                        group.showtimes.push({ date: show.date, times: [timeSlot] });
                    }
                });

                return {
                    screen_id: s.screen_id,
                    name: s.name,
                    type: s.type,
                    seatingCapacity: 0,
                    features: [],
                    currentMovies: Array.from(movieGroups.values()),
                } as Screen;
            });

            const uiTheater: Theater = {
                theater_id: apiT._id || apiT.theater_id || "",
                name: apiT.name,
                address: apiT.address,
                city: apiT.city,
                chain: "",
                rating: 0,
                totalVotes: 0,
                amenities: apiT.amenities || [],
                image: apiT.image,
                description: apiT.description,
                phone: apiT.phone,
                email: apiT.email || "",
                location: apiT.location ? { lat: apiT.location.lat, lng: apiT.location.lng } : { lat: 0, lng: 0 },
                features: {
                    mTicket: !!(apiT.features as any)?.mTicket,
                    foodBeverage: !!(apiT.features as any)?.foodBeverage,
                    parking: !!(apiT.features as any)?.parking,
                    wheelchair: !!(apiT.features as any)?.wheelchair,
                    dolby: !!(apiT.features as any)?.dolby,
                    imax: !!(apiT.features as any)?.imax,
                    recliners: !!(apiT.features as any)?.recliners,
                    fourK: !!(apiT.features as any)?.fourK,
                },
                screens: uiScreens,
            };

            setTheater(uiTheater);
            const allDates = uiScreens.flatMap(s => (s.currentMovies || []).flatMap(m => m.showtimes.map(st => st.date)));
            setSelectedDate(allDates.sort()[0] || "");
        })();
    }, [selectedTheater, apiTheaters, theaterId]);


    function getAllDates(screens: Screen[]): string[] {
        const dateSet = new Set<string>();
        screens.forEach((screen) => {
            (screen.currentMovies || []).forEach((movie) => {
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
            (screen.currentMovies || []).forEach((movie) => {
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
            (screen.currentMovies || []).forEach((movie) => {
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
                            features={theater.features as TheaterFeatures}
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