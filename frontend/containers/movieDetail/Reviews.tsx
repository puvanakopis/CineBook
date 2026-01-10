"use client";

import { useState, FormEvent } from 'react';
import { MdOutlineRateReview } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

interface Review {
    id: string;
    author: string;
    date: string;
    rating: number;
    content: string;
    initials: string;
    hasPremium?: boolean;
}

interface ReviewsProps {
    reviews: Review[];
    movieTitle: string;
    movieId: string;
}

const Reviews = ({ reviews, movieTitle, movieId }: ReviewsProps) => {
    const [userRating, setUserRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

    const handleRatingSelect = (rating: number) => {
        setUserRating(rating);
    };

    const handleSubmitReview = async (e: FormEvent) => {
        e.preventDefault();

        if (!userRating || !reviewText.trim()) {
            alert('Please provide both a rating and review text');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newReview: Review = {
                id: Date.now().toString(),
                author: 'You',
                date: 'Just now',
                rating: userRating,
                content: reviewText,
                initials: 'YU',
                hasPremium: true,
            };

            setLocalReviews(prev => [newReview, ...prev]);

            setUserRating(0);
            setReviewText('');

            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
        return (
            <div className={`flex gap-1 ${interactive ? 'flex-row-reverse justify-end' : ''}`}>
                {[5, 4, 3, 2, 1].map((star) => (
                    interactive ? (
                        <div key={star} className="relative">
                            <input
                                type="radio"
                                id={`star${star}`}
                                name="rating"
                                value={star}
                                checked={userRating === star}
                                onChange={() => onStarClick?.(star)}
                                className="hidden peer"
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor={`star${star}`}
                                className={`material-symbols-outlined text-4xl cursor-pointer transition-all peer-checked:text-primary peer-checked:fill-1 peer-hover:text-primary ${userRating >= star ? 'text-primary fill-1' : 'text-[#392828]'
                                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onMouseEnter={() => {
                                    if (!isSubmitting && interactive) {
                                        const elements = document.querySelectorAll('.rating-star');
                                        elements.forEach((el, index) => {
                                            if (index < star) {
                                                el.classList.add('text-primary');
                                            }
                                        });
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!isSubmitting && interactive) {
                                        const elements = document.querySelectorAll('.rating-star');
                                        elements.forEach(el => {
                                            if (!el.querySelector('input:checked')) {
                                                el.classList.remove('text-primary');
                                            }
                                        });
                                    }
                                }}
                            >
                                <MdOutlineStarBorder />
                            </label>
                        </div>
                    ) : (
                        <span
                            key={star}
                            className={`material-symbols-outlined text-sm ${rating >= star ? 'text-yellow-500 fill-1' : 'text-[#392828]'
                                }`}
                        >
                            {rating >= star ? <MdOutlineStar /> : <MdOutlineStarBorder />}
                        </span>
                    )
                ))}
            </div>
        );
    };

    return (
        <section className="w-full mx-auto px-20 md:px-20 lg:px-30 py-12 relative z-20" id="reviews">
            <div className="max-w-[1400px] mx-auto">
                {/* Header - Matching Showtimes header style */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white border-l-4 border-primary pl-4">
                        Reviews
                    </h2>
                    <button className="text-primary text-sm font-bold hover:underline transition-colors">
                        See All Reviews
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Review Form Section - Matching theater card style */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-surface-dark rounded-xl border border-[#392828] p-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary"><MdOutlineRateReview /></span>
                                Rate this Movie
                            </h3>

                            <form onSubmit={handleSubmitReview} className="flex flex-col gap-6">
                                {/* Rating Stars */}
                                <div className="flex flex-col gap-4">
                                    <label className="text-text-secondary text-sm font-medium uppercase tracking-wider">
                                        Tap to Rate
                                    </label>
                                    {renderStars(userRating, true, handleRatingSelect)}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-white text-lg font-bold">
                                            {userRating > 0 ? `${userRating}.0` : '0.0'}
                                        </span>
                                        <span className="text-text-secondary text-sm">/ 5.0</span>
                                    </div>
                                </div>

                                {/* Review Textarea */}
                                <div className="flex flex-col gap-4">
                                    <label
                                        htmlFor="review-text"
                                        className="text-text-secondary text-sm font-medium uppercase tracking-wider"
                                    >
                                        Write your Review
                                    </label>
                                    <textarea
                                        id="review-text"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Share your thoughts on the movie, direction, and performances..."
                                        rows={5}
                                        className="w-full bg-[#221a1a] border border-[#392828] rounded-lg p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-text-secondary/50 resize-none"
                                        disabled={isSubmitting}
                                        maxLength={1000}
                                    />
                                    <div className="flex justify-between text-xs text-text-secondary">
                                        <span>{reviewText.length} / 1000 characters</span>
                                        <span>Minimum 50 characters</span>
                                    </div>
                                </div>

                                {/* Submit Button - Matching showtimes button style */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !userRating || reviewText.length < 50}
                                        className="group px-6 py-3 rounded border border-primary bg-primary hover:bg-red-700 text-white font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Review</span>
                                                <span className="material-symbols-outlined text-sm"><IoSendOutline /></span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Review Stats - Matching theater features style */}
                        <div className="bg-surface-dark rounded-xl border border-[#392828] p-6">
                            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">insights</span>
                                Review Statistics
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        {localReviews.length}
                                    </div>
                                    <div className="text-text-secondary text-sm">Total Reviews</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        {localReviews.length > 0
                                            ? (localReviews.reduce((acc, review) => acc + review.rating, 0) / localReviews.length).toFixed(1)
                                            : '0.0'
                                        }
                                    </div>
                                    <div className="text-text-secondary text-sm">Average Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Reviews Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="space-y-4">
                            {localReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-surface-dark rounded-xl border border-[#392828] p-6 hover:border-primary/50 transition-colors"
                                >
                                    {/* Review Header - Matching theater header style */}
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#392828]">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`size-10 rounded-full flex items-center justify-center font-bold ${review.hasPremium
                                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                                    : 'bg-[#221a1a] text-text-secondary border border-[#392828]'
                                                    }`}
                                            >
                                                {review.initials}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">{review.author}</h4>
                                                <span className="text-text-secondary text-xs">{review.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-[#221a1a] px-3 py-1 rounded border border-[#392828]">
                                            {renderStars(review.rating)}
                                            <span className="text-white text-sm font-bold ml-1">
                                                {review.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <p className="text-text-secondary text-sm leading-relaxed">{review.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* No Reviews State */}
                        {localReviews.length === 0 && (
                            <div className="bg-surface-dark rounded-xl border border-[#392828] p-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-text-secondary/50 mb-4">
                                    reviews
                                </span>
                                <h3 className="text-white font-bold text-lg mb-2">No Reviews Yet</h3>
                                <p className="text-text-secondary text-sm">
                                    Be the first to share your thoughts about {movieTitle}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;