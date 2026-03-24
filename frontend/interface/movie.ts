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
    city: string;
    rating: number;
    amenities: string[];
    features: TheaterFeatures;
    image: string | StaticImageData;
    description: string;
    showtimes: Showtimes;
}

export interface Cast {
    cast_id: string;
    name: string;
    role: string;
    type: string;
    imageUrl: string | StaticImageData;
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
    poster: string | StaticImageData;
    trailerUrl: string;
    theaters: Theater[];
    cast: Cast[];
    reviews: Review[];
}