// src/interfaces/movieInterface.ts

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
    poster: string;
    trailerUrl: string;
    cast?: Cast[];
    reviews?: Review[];
    isNowShowing?: boolean;
    isUpcoming?: boolean;
}

export type UpdateMovieRequest = Partial<CreateMovieRequest>;

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
    // Fetch operations
    getMovies: () => Promise<void>;
    getMovieById: (id: string) => Promise<void>;

    // Create operation
    createMovie: (data: CreateMovieRequest) => Promise<void>;

    // Update operation
    updateMovie: (id: string, data: UpdateMovieRequest) => Promise<void>;

    // Delete operation
    deleteMovie: (id: string) => Promise<void>;

    // Utility
    clearError: () => void;
    clearSelectedMovie: () => void;
}

// Query params interface for filtering
export interface MovieFilters {
    isNowShowing?: boolean;
    isUpcoming?: boolean;
    genre?: string;
    language?: string;
}