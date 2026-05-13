import HomeHeroSection from "./_components/HomeHeroSection";
import HomeMovieFilter from "./_components/HomeMovieFilter";
import HomeMovieGrid from "./_components/HomeMovieGrid";
import HomeOfferSection from "./_components/HomeOfferSection";
import { Movie } from "@/interfaces/movieInterface";

export default async function Home(props: {
  searchParams: Promise<{ genre?: string; theater?: string; date?: string }>;
}) {
  const searchParams = await props.searchParams;
  let movies: Movie[] = [];
  let filteredMovies: Movie[] = [];
  let allGenres: string[] = [];
  let allTheaters: string[] = [];

  try {
    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

    // Fetch movies
    const movieRes = await fetch(`${base}/api/movies`, { cache: "no-store" });
    if (movieRes.ok) {
      const data = await movieRes.json();
      movies = (data || []).map((m: any) => {
        const poster: string = m.poster || "";
        if (!poster) return { ...m, poster: "" };
        if (/^https?:\/\//i.test(poster) || poster.startsWith("//")) {
          return { ...m, poster };
        }
        return { ...m, poster: `${base}${poster.startsWith("/") ? poster : "/" + poster}` };
      });
    }

    // Fetch theaters for filter options
    const theaterRes = await fetch(`${base}/api/theaters`, { cache: "no-store" });
    if (theaterRes.ok) {
      const theaterData = await theaterRes.json();
      allTheaters = (theaterData || []).map((t: any) => t.name).sort();
    }

    // Extract unique genres from movies
    allGenres = Array.from(new Set(movies.flatMap(m => m.genres || []))).sort();

    // If allTheaters is empty, extract from movie showings as fallback
    if (allTheaters.length === 0) {
      allTheaters = Array.from(new Set(movies.flatMap(m => m.showings?.map(s => s.name) || []))).sort();
    }

    // Filtering logic
    filteredMovies = [...movies];

    if (searchParams.genre && searchParams.genre !== "All Genres") {
      filteredMovies = filteredMovies.filter(m =>
        m.genres?.some(g => g.toLowerCase() === searchParams.genre?.toLowerCase())
      );
    }

    if (searchParams.theater && searchParams.theater !== "All Locations") {
      filteredMovies = filteredMovies.filter(m =>
        m.showings?.some(s => s.name === searchParams.theater)
      );
    }

    if (searchParams.date && searchParams.date !== "All Dates") {
      filteredMovies = filteredMovies.filter(m =>
        m.showings?.some(s =>
          s.screens?.some(sc =>
            sc.shows?.some(sh => sh.date === searchParams.date)
          )
        )
      );
    }

    // Default view for home page is limited to 8 movies if no filters
    if (!searchParams.genre && !searchParams.theater && !searchParams.date) {
      filteredMovies = filteredMovies.slice(0, 8);
    }
  } catch (err) {
    console.error("Error loading home page data:", err);
  }

  return (
    <div>
      <HomeHeroSection />
      <HomeMovieFilter genres={allGenres} theaters={allTheaters} />
      <HomeMovieGrid movies={filteredMovies} />
      <HomeOfferSection />
    </div>
  );
}
