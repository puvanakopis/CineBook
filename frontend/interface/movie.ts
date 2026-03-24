import { StaticImageData } from 'next/image';

export interface Cast {
    cast_id: string;
    name: string;
    role: string;
    type: 'actor' | 'director' | 'composer';
    imageUrl: StaticImageData;
}

export interface Review {
    review_id: string;
    user_id: string;
    author: string;
    date: string;
    rating: number;
    content: string;
    initials: string;
    hasPremium: boolean;
    likes: number;
    verified: boolean;
}

export interface TimeSlot {
    time: string;
    price: number;
    currency: string;
    isSoldOut: boolean;
}

export interface ShowtimeDay {
    date: string;
    times: TimeSlot[];
}

export interface Showtimes {
    standard?: ShowtimeDay[];
    imax3d?: ShowtimeDay[];
    [key: string]: ShowtimeDay[] | undefined;
}

export interface Theater {
    theater_id: string;
    name: string;
    address: string;
    features: {
        mTicket: boolean;
        foodBeverage: boolean;
        parking: boolean;
        wheelchair: boolean;
        imax?: boolean;
        dolby?: boolean;
    };
    showtimes: Showtimes;
}

export interface Movie {
    movie_id: number;
    title: string;
    rating: number;
    genres: string[];
    duration: string;
    releaseDate: string;
    languages: string;
    formats: string;
    synopsis: string;
    poster: StaticImageData;
    trailerUrl: string;
    theaters: Theater[];
    cast: Cast[];
    reviews: Review[];
}