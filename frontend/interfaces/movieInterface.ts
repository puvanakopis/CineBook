export interface Cast {
    name: string;
    role: string;
    profilePicture: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Review {
    user?: string;
    rating: number;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MovieShow {
    movie: string;
    date: string;
    time: string;
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
    _id: string;
    title: string;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string[];
    formats: string;
    synopsis: string;
    poster: string;
    trailerUrl: string;
    cast: Cast[];
    reviews: Review[];
    isNowShowing: boolean;
    isUpcoming: boolean;
    showings?: MovieShowing[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateMovieRequest {
    title: string;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string[];
    formats: string;
    synopsis: string;
    poster?: File | string;
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

    clearError: () => void;
    clearSelectedMovie: () => void;
}

export interface MovieFilters {
    isNowShowing?: boolean;
    isUpcoming?: boolean;
    genre?: string;
    language?: string;
}