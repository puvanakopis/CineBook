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

export interface Theater {
    theater_id: string;
    name: string;
    address: string;
    city: string;
    chain: string;
    rating: number;
    amenities: string[];
    features: TheaterFeatures;
    image: string | StaticImageData;
    description: string;
    showtimes?: any;
}