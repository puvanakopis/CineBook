"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MovieHero from "./_components/MovieHero";
import Showtimes from "./_components/Showtimes";
import CastCrew from "./_components/CastCrew";
import Reviews from "./_components/Reviews";
import { useMovie } from "@/contexts/MovieContext";
import { Review, Theater, TimeSlot, Cast } from "@/interfaces/movie";
import type {
  Cast as BackendCast,
  MovieShowing,
  Review as BackendReview,
} from "@/interfaces/movieInterface";

export default function MovieDetail() {
  const params = useParams();
  const movieId = params?.id as string;
  const {
    selectedMovie,
    getMovieById,
    addReview,
    error,
    clearError,
  } = useMovie();

  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId);
    }
  }, [movieId, getMovieById]);

  useEffect(() => {
    if (error) {
      console.error(error);
      clearError();
    }
  }, [error, clearError]);

  const mappedCast: Cast[] = (selectedMovie?.cast || []).map(
    (member: BackendCast, idx: number) => ({
      cast_id: idx.toString(),
      name: member.name,
      role: member.role,
      type: "actor",
      imageUrl: member.profilePicture,
    })
  );

  const mappedTheaters: Theater[] = (selectedMovie?.showings || []).map(
    (showing: MovieShowing) => ({
      theater_id: showing.theaterId,
      name: showing.name,
      address: showing.address,
      features: {
        mTicket: true,
        foodBeverage: true,
        parking: true,
        wheelchair: true,
      },
      showtimes: {
        standard: showing.screens.flatMap((screen) =>
          screen.shows.map((show) => ({
            date: show.date,
            times: [
              {
                time:
                  show.time || (show.startTime && show.endTime ? `${show.startTime} - ${show.endTime}` : ""),
                price: show.price,
                currency: "LKR",
                isSoldOut: show.status === "sold-out",
              },
            ],
          }))
        ),
        imax3d: [],
      },
    })
  );

  const mappedReviews: Review[] = (selectedMovie?.reviews || []).map(
    (review: BackendReview, idx: number) => ({
      review_id: idx.toString(),
      user_id: review.user || "unknown",
      author: review.user || "Anonymous",
      date: new Date(review.createdAt || 0).toISOString().split("T")[0],
      rating: review.rating,
      content: review.message,
      initials: (review.user || "A").slice(0, 2).toUpperCase(),
      hasPremium: false,
      likes: 0,
      verified: false,
    })
  );

  if (!selectedMovie) {
    return (
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-white">Loading movie details...</p>
          </div>
        </div>
      </main>
    );
  }

  const averageRating =
    selectedMovie.reviews && selectedMovie.reviews.length > 0
      ? selectedMovie.reviews.reduce((sum, r) => sum + r.rating, 0) /
      selectedMovie.reviews.length
      : 0;

  function getAllDates(theaters: Theater[]): string[] {
    const dateSet = new Set<string>();
    theaters.forEach((theater) => {
      if (theater.showtimes.standard) {
        theater.showtimes.standard.forEach((dateShowtime) => {
          dateSet.add(dateShowtime.date);
        });
      }
      if (theater.showtimes.imax3d) {
        theater.showtimes.imax3d.forEach((dateShowtime) => {
          dateSet.add(dateShowtime.date);
        });
      }
    });
    return Array.from(dateSet).sort();
  }

  const allDates = getAllDates(mappedTheaters);
  const activeSelectedDate = selectedDate || allDates[0] || "";

  function formatDateDisplay(dateString: string): {
    day: string;
    month: string;
    weekday: string;
  } {
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

  function getShowtimesForDate(
    theater: Theater,
    date: string
  ): { standard: TimeSlot[]; imax3d: TimeSlot[] } {
    const standardShowtimes =
      theater.showtimes.standard?.find((d) => d.date === date);
    const imax3dShowtimes =
      theater.showtimes.imax3d?.find((d) => d.date === date);

    return {
      standard: standardShowtimes?.times || [],
      imax3d: imax3dShowtimes?.times || [],
    };
  }

  const handleSubmitReview = async (rating: number, reviewText: string) => {
    if (!rating || !reviewText.trim()) {
      throw new Error("Please provide both a rating and review text");
    }
    if (reviewText.length < 50) {
      throw new Error("Review must be at least 50 characters long");
    }

    try {
      await addReview(selectedMovie._id, rating, reviewText);
      setUserRating(0);
      setReviewText("");
    } catch (err) {
      throw err;
    }
  };

  return (
    <main>
      <MovieHero
        title={selectedMovie.title}
        rating={averageRating}
        genres={selectedMovie.genres}
        duration={selectedMovie.duration}
        releaseDate={selectedMovie.releaseDate}
        languages={selectedMovie.languages.join(", ")}
        formats={selectedMovie.formats}
        synopsis={selectedMovie.synopsis}
        poster={selectedMovie.poster}
        trailerUrl={selectedMovie.trailerUrl}
      />
      <Showtimes
        theaters={mappedTheaters}
        selectedDate={activeSelectedDate}
        allDates={allDates}
        onDateSelect={setSelectedDate}
        formatDateDisplay={formatDateDisplay}
        getShowtimesForDate={getShowtimesForDate}
      />
      <CastCrew cast={mappedCast} />
      <Reviews
        reviews={mappedReviews}
        movieTitle={selectedMovie.title}
        userRating={userRating}
        reviewText={reviewText}
        isSubmitting={isSubmitting}
        onRatingSelect={setUserRating}
        onReviewTextChange={setReviewText}
        onSubmitReview={handleSubmitReview}
        setIsSubmitting={setIsSubmitting}
      />
    </main>
  );
}