export interface TheaterFeatures {
    mTicket: boolean;
    foodBeverage: boolean;
    parking: boolean;
    wheelchair: boolean;
    imax?: boolean;
    dolby?: boolean;
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
    features: TheaterFeatures;
    showtimes: Showtimes;
}

export interface TheaterWithMovie extends Theater {
    movie_id: number;
    movie_title: string;
}