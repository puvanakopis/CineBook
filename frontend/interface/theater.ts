import { StaticImageData } from "next/image";

export interface TheaterFeatures {
    mTicket: boolean;
    foodBeverage: boolean;
    parking: boolean;
    wheelchair: boolean;
    dolby?: boolean;
    imax?: boolean;
    recliners?: boolean;
    fourK?: boolean;
}

export interface TimeSlot {
    time: string;
    price: number;
    currency: string;
    isSoldOut: boolean;
    status?: "available" | "fast-filling" | "almost-full" | "sold-out";
}

export interface MovieShowtime {
    movie_id: number;
    title: string;
    rating: number;
    genres: string[];
    duration: string;
    certificate?: string;
    poster: string | StaticImageData;
    showtimes: {
        date: string;
        times: TimeSlot[];
    }[];
}

export interface Screen {
    screen_id: string;
    name: string;
    type: string;
    seatingCapacity: number;
    features: string[];
    currentMovies: MovieShowtime[];
}

export interface Theater {
    theater_id: string;
    name: string;
    address: string;
    city: string;
    chain: string;
    rating: number;
    totalVotes?: number;
    amenities: string[];
    image: string | StaticImageData;
    description: string;
    phone?: string;
    email?: string;
    location?: { lat: number; lng: number };
    features: TheaterFeatures;
    screens: Screen[];
}