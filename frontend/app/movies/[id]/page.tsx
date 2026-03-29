"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import MovieHero from "./_components/MovieHero";
import Showtimes from "./_components/Showtimes";
import CastCrew from "./_components/CastCrew";
import Reviews from "./_components/Reviews";
import { movies } from "@/data/movie";
import { Review, Theater, TimeSlot } from "@/interface/movie";

export default function MovieDetail() {
  const params = useParams();
  const movieId = params?.id ? parseInt(params.id as string) : null;
  const movie = movies.find((m) => m.movie_id === movieId);

  const [localReviews, setLocalReviews] = useState<Review[]>(movie?.reviews || []);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<string>(getDefaultDate());

  function getDefaultDate(): string {
    if (!movie) return '';

    const allDates = getAllDates(movie.theaters);
    return allDates[0] || '';
  }

  function getAllDates(theaters: Theater[]): string[] {
    const dateSet = new Set<string>();
    theaters.forEach(theater => {
      if (theater.showtimes.standard) {
        theater.showtimes.standard.forEach(dateShowtime => {
          dateSet.add(dateShowtime.date);
        });
      }
      if (theater.showtimes.imax3d) {
        theater.showtimes.imax3d.forEach(dateShowtime => {
          dateSet.add(dateShowtime.date);
        });
      }
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
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        weekday: 'Today'
      };
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return {
        day: date.getDate().toString(),
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        weekday: 'Tomorrow'
      };
    } else {
      return {
        day: date.getDate().toString(),
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        weekday: date.toLocaleString('default', { weekday: 'short' })
      };
    }
  }

  function getShowtimesForDate(theater: Theater, date: string): { standard: TimeSlot[]; imax3d: TimeSlot[] } {
    const standardShowtimes = theater.showtimes.standard?.find(d => d.date === date);
    const imax3dShowtimes = theater.showtimes.imax3d?.find(d => d.date === date);

    return {
      standard: standardShowtimes?.times || [],
      imax3d: imax3dShowtimes?.times || []
    };
  }

  const handleSubmitReview = async (rating: number, reviewText: string): Promise<void> => {
    if (!rating || !reviewText.trim()) {
      throw new Error('Please provide both a rating and review text');
    }

    if (reviewText.length < 50) {
      throw new Error('Review must be at least 50 characters long');
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: Review = {
        review_id: Date.now().toString(),
        user_id: 'current-user',
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        rating: rating,
        content: reviewText,
        initials: 'YU',
        hasPremium: true,
        likes: 0,
        verified: true
      };

      setLocalReviews(prev => [newReview, ...prev]);
      setUserRating(0);
      setReviewText('');
    } catch (error) {
      throw error;
    }
  };

  if (!movie) {
    return (
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Movie Not Found</h1>
          </div>
        </div>
      </main>
    );
  }

  const allDates = getAllDates(movie.theaters);

  return (
    <main>
      <MovieHero
        title={movie.title}
        rating={movie.rating}
        genres={movie.genres}
        duration={movie.duration}
        releaseDate={movie.releaseDate}
        languages={movie.languages}
        formats={movie.formats}
        synopsis={movie.synopsis}
        poster={movie.poster}
        trailerUrl={movie.trailerUrl}
      />
      <Showtimes
        theaters={movie.theaters}
        selectedDate={selectedDate}
        allDates={allDates}
        onDateSelect={setSelectedDate}
        formatDateDisplay={formatDateDisplay}
        getShowtimesForDate={getShowtimesForDate}
      />
      <CastCrew cast={movie.cast} />
      <Reviews
        reviews={localReviews}
        movieTitle={movie.title}
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