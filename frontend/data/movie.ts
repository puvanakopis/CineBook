export interface Showtime {
    time: string;
    price: number;
    format?: string;
    isSoldOut?: boolean;
}

export interface Theater {
    id: string;
    name: string;
    address: string;
    features: {
        mTicket: boolean;
        foodBeverage: boolean;
    };
    showtimes: {
        standard: Showtime[];
        imax3d?: Showtime[];
    };
}

export const movie = {
    id: 1,
    title: "Coolie",
    rating: 8.8,
    genres: ["Action", "Thriller"],
    duration: "2h 45m",
    releaseDate: "2025",
    languages: "Tamil, Telugu, Hindi",
    formats: "2D, IMAX",
    synopsis:
        "Coolie is a high-octane action thriller featuring a powerful protagonist who rises against systemic injustice, blending intense drama, mass action, and Rajinikanth’s signature screen presence.",
    poster: "./coolie-movie.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=qeVfT2iLiu0&t=14s",
    theaters: [
        {
            id: "t1",
            name: "Cineplex Cinema",
            address: "123 Main St, Colombo",
            features: { mTicket: true, foodBeverage: true },
            showtimes: {
                standard: [
                    { time: "10:00 AM", price: 12500 },
                    { time: "1:00 PM", price: 12500, isSoldOut: true },
                    { time: "4:00 PM", price: 12500 },
                ],
                imax3d: [
                    { time: "11:00 AM", price: 18000 },
                    { time: "3:00 PM", price: 18000 },
                ],
            },
        },
        {
            id: "t2",
            name: "Galaxy Theater",
            address: "456 High St, Colombo",
            features: { mTicket: false, foodBeverage: true },
            showtimes: {
                standard: [
                    { time: "12:00 PM", price: 11000 },
                    { time: "3:00 PM", price: 11000 },
                    { time: "6:00 PM", price: 11000, isSoldOut: true },
                ],
            },
        },
    ],
};