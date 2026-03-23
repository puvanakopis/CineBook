"use client";

import { MdOutlineReviews } from "react-icons/md";
import { useState, FormEvent } from 'react';
import { MdOutlineRateReview } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

interface Review {
    review_id: string;
    user_id: string;
    author: string;
    date: string;
    rating: number;
    content: string;
    initials: string;
    hasPremium?: boolean;
    likes: number;
    verified: boolean;
}

interface ReviewsProps {
    reviews: Review[];
    movieTitle: string;
    movieId: string;
}

const Reviews = ({ reviews, movieTitle }: ReviewsProps) => {
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

        if (reviewText.length < 50) {
            alert('Review must be at least 50 characters long');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newReview: Review = {
                review_id: Date.now().toString(),
                user_id: 'current-user',
                author: 'You',
                date: new Date().toISOString().split('T')[0],
                rating: userRating,
                content: reviewText,
                initials: 'YU',
                hasPremium: true,
                likes: 0,
                verified: true
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

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
        return (
            <div className={`flex gap-1 ${interactive ? 'flex-row-reverse justify-end' : ''}`}>
                {[5, 4, 3, 2, 1].map((star) => (
                    interactive ? (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onStarClick?.(star)}
                            className="focus:outline-none"
                            disabled={isSubmitting}
                        >
                            <MdOutlineStar
                                className={`text-3xl transition-all ${userRating >= star ? 'text-primary' : 'text-[#392828] hover:text-primary'
                                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                        </button>
                    ) : (
                        <MdOutlineStar
                            key={star}
                            className={`text-sm ${rating >= star ? 'text-yellow-500' : 'text-[#392828]'}`}
                        />
                    )
                ))}
            </div>
        );
    };

    return (
        <section className="w-full mx-auto px-4 md:px-20 lg:px-30 py-12 relative z-20" id="reviews">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
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
                    {/* Review Form Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-surface-dark rounded-xl border border-[#392828] p-6 mb-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <MdOutlineRateReview className="text-primary" />
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
                                        <span className={reviewText.length < 50 ? 'text-red-500' : 'text-green-500'}>
                                            {reviewText.length < 50 ? `${50 - reviewText.length} more needed` : 'Minimum met'}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !userRating || reviewText.length < 50}
                                        className="group px-6 py-3 rounded border border-primary bg-primary hover:bg-red-700 text-white font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin">⟳</span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Review</span>
                                                <IoSendOutline className="text-sm" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Review Stats */}
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
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#392828] scrollbar-track-transparent">
                            {localReviews.map((review) => (
                                <div
                                    key={review.review_id}
                                    className="bg-surface-dark rounded-xl border border-[#392828] p-6 hover:border-primary/50 transition-colors"
                                >
                                    {/* Review Header */}
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
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-white font-bold text-sm">{review.author}</h4>
                                                    {review.verified && (
                                                        <MdVerified className="text-blue-400 text-xs" />
                                                    )}
                                                </div>
                                                <span className="text-text-secondary text-xs">{formatDate(review.date)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-[#221a1a] px-3 py-1 rounded border border-[#392828]">
                                            <div className="flex">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-white text-sm font-bold ml-1">
                                                {review.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{review.content}</p>

                                    {/* Review Footer */}
                                    <div className="flex items-center justify-between">
                                        <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group">
                                            {review.likes > 0 ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart className="group-hover:text-red-500" />
                                            )}
                                            <span className="text-xs">{review.likes} likes</span>
                                        </button>
                                        <span className="text-xs text-text-secondary">
                                            {review.hasPremium && 'Premium Reviewer'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Reviews State */}
                        {localReviews.length === 0 && (
                            <div className="bg-surface-dark rounded-xl border border-[#392828] p-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-text-secondary/50 mb-4">
                                    <MdOutlineReviews />
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