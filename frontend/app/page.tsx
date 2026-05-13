import HomeHeroSection from "./_components/HomeHeroSection";
import HomeMovieFilter from "./_components/HomeMovieFilter";
import HomeMovieGrid from "./_components/HomeMovieGrid";
import HomeOfferSection from "./_components/HomeOfferSection";
import { Movie } from "@/interfaces/movieInterface";

export default async function Home() {
  let movies: Movie[] = [];

  try {
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${base}/api/movies`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();

      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      movies = (data || []).map((m: any) => {
        const poster: string = m.poster || "";
        if (!poster) return { ...m, poster: "" };
        if (/^https?:\/\//i.test(poster) || poster.startsWith("//")) {
          return { ...m, poster };
        }

        const prefix = apiBase || "";
        const normalized = `${prefix}${poster.startsWith("/") ? poster : "/" + poster}`;
        return { ...m, poster: normalized };
      });
      movies = movies.slice(0, 8);
    }
  } catch (err) {
    movies = [];
  }

  return (
    <div>
      <HomeHeroSection />
      <HomeMovieFilter />
      <HomeMovieGrid movies={movies} />
      <HomeOfferSection />
    </div>
  );
}
