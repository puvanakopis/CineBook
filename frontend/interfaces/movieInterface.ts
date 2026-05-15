import { StaticImageData } from "next/image";

export interface TimeSlot {
    time: string;
    price: number;
    currency: string;
    isSoldOut: boolean;
}

export interface DateShowtime {
    date: string;
    times: TimeSlot[];
}

export interface Showtimes {
    standard?: DateShowtime[];
    imax3d?: DateShowtime[];
}

export interface TheaterFeatures {
    mTicket: boolean;
    foodBeverage: boolean;
    parking: boolean;
    wheelchair: boolean;
    dolby?: boolean;
    imax?: boolean;
}

export interface Theater {
    theater_id: string;
    name: string;
    address: string;
    features: TheaterFeatures;
    showtimes?: Showtimes;
    screens?: any[];
    city?: string;
    rating?: number;
    amenities?: string[];
    image?: string | StaticImageData;
    description?: string;
}

export interface Cast {
    cast_id?: string;
    name: string;
    role: string;
    type?: string;
    imageUrl?: string | StaticImageData;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Review {
    review_id?: string;
    user_id?: string;
    user?: string;
    author?: string;
    date?: string;
    rating: number;
    content?: string;
    message?: string;
    initials?: string;
    hasPremium?: boolean;
    likes?: number;
    verified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MovieShow {
    movie: string;
    date: string;
    time?: string;
    startTime?: string;
    endTime?: string;
    price: number;
    currency: string;
    status: "available" | "sold-out" | "almost-full" | "fast-filling";
}

export interface MovieScreen {
    screen_id: string;
    name: string;
    type: string;
    shows: MovieShow[];
}

export interface MovieShowing {
    theaterId: string;
    name: string;
    address: string;
    city: string;
    screens: MovieScreen[];
}

export interface Movie {
    _id?: string;
    movie_id?: string;
    title: string;
    rating?: number;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string | string[];
    formats: string;
    synopsis: string;
    poster: string | StaticImageData;
    trailerUrl: string;
    theaters?: Theater[];
    cast: Cast[];
    reviews: Review[];
    isNowShowing?: boolean;
    isUpcoming?: boolean;
    showings?: MovieShowing[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateMovieRequest {
    title: string;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string | string[];
    formats: string;
    synopsis: string;
    poster?: File | string | StaticImageData;
    trailerUrl: string;
    cast?: Cast[];
    reviews?: Review[];
    isNowShowing?: boolean;
    isUpcoming?: boolean;
}

export type UpdateMovieRequest = Partial<CreateMovieRequest>;

export type CreateMoviePayload = CreateMovieRequest | FormData;
export type UpdateMoviePayload = UpdateMovieRequest | FormData;

export interface CreateMovieResponse {
    message: string;
    movie: Movie;
}

export interface UpdateMovieResponse {
    message: string;
    movie: Movie;
}

export interface DeleteMovieResponse {
    message: string;
}

export type GetMoviesResponse = Movie[];

export interface AddReviewRequest {
    rating: number;
    message: string;
}

export interface AddReviewResponse {
    message: string;
    reviews: Review[];
}

export interface MovieState {
    movies: Movie[];
    selectedMovie: Movie | null;
    isLoading: boolean;
    error: string | null;
}

export interface MovieContextType extends MovieState {
    getMovies: () => Promise<void>;
    getMovieById: (id: string) => Promise<void>;
    createMovie: (data: CreateMovieRequest) => Promise<void>;
    updateMovie: (id: string, data: UpdateMovieRequest) => Promise<void>;
    deleteMovie: (id: string) => Promise<void>;
    addReview: (movieId: string, rating: number, message: string) => Promise<void>;
    clearError: () => void;
    clearSelectedMovie: () => void;
}

export interface MovieFilters {
    isNowShowing?: boolean;
    isUpcoming?: boolean;
    genre?: string;
    language?: string;
}