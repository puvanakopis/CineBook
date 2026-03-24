import Coolie from "@/public/movies/goat.jpg"

import { Theater } from "@/interface/theater";


export const theaters: Theater[] = [
    {
        theater_id: "1",
        name: "Scope Cinemas - Colombo",
        address: "No. 123, Galle Road, Colombo 03",
        city: "Colombo",
        chain: "Scope Cinemas",
        rating: 4.6,
        totalVotes: 10250,
        amenities: ["IMAX", "Dolby Atmos", "4K Laser", "Recliners", "Parking", "Food Court", "Wheelchair Access"],
        image: Coolie,
        description: "Premium cinema experience with IMAX and luxury seating. Located in the heart of Colombo, Scope Cinemas offers state-of-the-art projection and sound systems for an unparalleled movie experience.",
        phone: "+94 11 235 3355",
        email: "info@scopecinemas.lk",
        location: { lat: 6.9271, lng: 79.8612 },
        features: {
            mTicket: true,
            foodBeverage: true,
            parking: true,
            wheelchair: true,
            dolby: true,
            imax: true,
            recliners: true,
            fourK: true
        },
        screens: [
            {
                screen_id: "1-1",
                name: "Standard Screen",
                type: "Standard",
                seatingCapacity: 250,
                features: ["4K Digital", "Dolby Sound", "Comfort Seating"],
                currentMovies: [
                    {
                        movie_id: 1,
                        title: "Coolie",
                        rating: 8.8,
                        genres: ["Action", "Thriller"],
                        duration: "2h 45m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "10:00 AM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1500, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "4:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "7:30 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "10:00 AM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "7:30 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "10:00 AM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:30 PM", price: 1500, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "7:30 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-26",
                                times: [
                                    { time: "10:00 AM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:30 PM", price: 1500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "7:30 PM", price: 1800, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                screen_id: "1-2",
                name: "IMAX 3D Screen",
                type: "IMAX 3D",
                seatingCapacity: 300,
                features: ["IMAX", "3D", "Dolby Atmos", "4K Laser", "Recliners"],
                currentMovies: [
                    {
                        movie_id: 1,
                        title: "Coolie",
                        rating: 8.8,
                        genres: ["Action", "Thriller"],
                        duration: "2h 45m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "11:30 AM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "6:30 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "9:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "11:30 AM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2500, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "6:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "9:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "11:30 AM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2500, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "6:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "9:30 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            },
                            {
                                date: "2026-03-26",
                                times: [
                                    { time: "11:30 AM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "6:30 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "9:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            }
                        ]
                    },
                    {
                        movie_id: 3,
                        title: "The GOAT",
                        rating: 7.9,
                        genres: ["Sci-Fi", "Action", "Adventure"],
                        duration: "2h 59m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "12:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "7:30 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "12:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "7:30 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "12:30 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "4:00 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "7:30 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        theater_id: "2",
        name: "Liberty By Scope - Colombo",
        address: "No. 45, Liberty Plaza, Colombo 03",
        city: "Colombo",
        chain: "Scope Cinemas",
        rating: 4.3,
        totalVotes: 7800,
        amenities: ["Dolby Atmos", "4K Digital", "Parking", "Food Court"],
        image: Coolie,
        description: "Modern cinema in the heart of Colombo with comfortable seating and excellent sound quality. Perfect for a casual movie outing with friends and family.",
        phone: "+94 11 257 4466",
        email: "info@scopecinemas.lk",
        location: { lat: 6.9145, lng: 79.8502 },
        features: {
            mTicket: true,
            foodBeverage: true,
            parking: true,
            wheelchair: false,
            dolby: true,
            imax: false,
            recliners: false,
            fourK: true
        },
        screens: [
            {
                screen_id: "2-1",
                name: "Standard Screen",
                type: "Standard",
                seatingCapacity: 180,
                features: ["4K Digital", "Dolby Sound"],
                currentMovies: [
                    {
                        movie_id: 1,
                        title: "Coolie",
                        rating: 8.8,
                        genres: ["Action", "Thriller"],
                        duration: "2h 45m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "11:00 AM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "2:00 PM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "5:00 PM", price: 1300, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "8:00 PM", price: 1600, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "11:00 AM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "2:00 PM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "5:00 PM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "8:00 PM", price: 1600, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "11:00 AM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "2:00 PM", price: 1300, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "5:00 PM", price: 1300, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "8:00 PM", price: 1600, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                screen_id: "2-2",
                name: "IMAX 3D Screen",
                type: "IMAX 3D",
                seatingCapacity: 220,
                features: ["IMAX 3D", "Dolby Atmos"],
                currentMovies: [
                    {
                        movie_id: 2,
                        title: "Good Bad Ugly",
                        rating: 8.5,
                        genres: ["Biography", "Action", "Drama"],
                        duration: "2h 32m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "12:00 PM", price: 2200, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:30 PM", price: 2200, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "7:00 PM", price: 2500, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "12:00 PM", price: 2200, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:30 PM", price: 2200, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "7:00 PM", price: 2500, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "12:00 PM", price: 2200, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "3:30 PM", price: 2200, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "7:00 PM", price: 2500, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        theater_id: "3",
        name: "PVR Cinemas - Colombo City Centre",
        address: "No. 478, Colombo City Centre, Colombo 02",
        city: "Colombo",
        chain: "PVR Cinemas",
        rating: 4.5,
        totalVotes: 8900,
        amenities: ["IMAX", "Dolby Atmos", "4K Laser", "Recliners", "Parking", "Food Court"],
        image: Coolie,
        description: "Premium multiplex with state-of-the-art facilities. Experience movies like never before with our cutting-edge technology and luxurious seating options.",
        phone: "+94 11 789 7897",
        email: "info@pvrcinemas.lk",
        location: { lat: 6.9275, lng: 79.8615 },
        features: {
            mTicket: true,
            foodBeverage: true,
            parking: true,
            wheelchair: true,
            dolby: true,
            imax: true,
            recliners: true,
            fourK: true
        },
        screens: [
            {
                screen_id: "3-1",
                name: "Standard Screen",
                type: "Standard",
                seatingCapacity: 200,
                features: ["4K Digital", "Dolby Atmos"],
                currentMovies: [
                    {
                        movie_id: 2,
                        title: "Good Bad Ugly",
                        rating: 8.5,
                        genres: ["Biography", "Action", "Drama"],
                        duration: "2h 32m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "10:30 AM", price: 1600, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:45 PM", price: 1600, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "5:00 PM", price: 1800, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "8:15 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "10:30 AM", price: 1600, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:45 PM", price: 1600, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "5:00 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "8:15 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "10:30 AM", price: 1600, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:45 PM", price: 1600, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "5:00 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "8:15 PM", price: 1800, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                screen_id: "3-2",
                name: "IMAX Screen",
                type: "IMAX",
                seatingCapacity: 280,
                features: ["IMAX", "Dolby Atmos", "4K Laser"],
                currentMovies: [
                    {
                        movie_id: 1,
                        title: "Coolie",
                        rating: 8.8,
                        genres: ["Action", "Thriller"],
                        duration: "2h 45m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "11:00 AM", price: 2400, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "2:30 PM", price: 2400, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "6:00 PM", price: 2600, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "9:30 PM", price: 2600, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "11:00 AM", price: 2400, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "2:30 PM", price: 2400, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "6:00 PM", price: 2600, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "9:30 PM", price: 2600, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        theater_id: "4",
        name: "IMAX Theater - Colombo City Centre",
        address: "Level 3, Colombo City Centre, Colombo 02",
        city: "Colombo",
        chain: "IMAX",
        rating: 4.8,
        totalVotes: 12500,
        amenities: ["IMAX", "IMAX 3D", "Dolby Atmos", "4K Laser", "Recliners", "Premium Lounge"],
        image: Coolie,
        description: "Sri Lanka's premier IMAX theater with crystal clear projection and immersive sound. The ultimate destination for blockbuster movies with the largest screen in the country.",
        phone: "+94 11 235 3355",
        email: "imax@colombocitycentre.lk",
        location: { lat: 6.9275, lng: 79.8615 },
        features: {
            mTicket: true,
            foodBeverage: true,
            parking: true,
            wheelchair: true,
            imax: true,
            dolby: true,
            recliners: true,
            fourK: true
        },
        screens: [
            {
                screen_id: "4-1",
                name: "Standard Screen",
                type: "Standard",
                seatingCapacity: 150,
                features: ["4K Digital", "Dolby Atmos"],
                currentMovies: [
                    {
                        movie_id: 3,
                        title: "The GOAT",
                        rating: 7.9,
                        genres: ["Sci-Fi", "Action", "Adventure"],
                        duration: "2h 59m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "10:00 AM", price: 1700, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1700, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "5:00 PM", price: 1900, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "8:30 PM", price: 1900, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "10:00 AM", price: 1700, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1700, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "5:00 PM", price: 1900, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "8:30 PM", price: 1900, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "10:00 AM", price: 1700, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "1:30 PM", price: 1700, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "5:00 PM", price: 1900, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "8:30 PM", price: 1900, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                screen_id: "4-2",
                name: "IMAX 3D Screen",
                type: "IMAX 3D",
                seatingCapacity: 350,
                features: ["IMAX", "IMAX 3D", "Dolby Atmos", "4K Laser"],
                currentMovies: [
                    {
                        movie_id: 3,
                        title: "The GOAT",
                        rating: 7.9,
                        genres: ["Sci-Fi", "Action", "Adventure"],
                        duration: "2h 59m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-23",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "6:30 PM", price: 3000, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "10:00 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "6:30 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "10:00 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "fast-filling" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" },
                                    { time: "6:30 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "10:00 PM", price: 3000, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            }
                        ]
                    },
                    {
                        movie_id: 1,
                        title: "Coolie",
                        rating: 8.8,
                        genres: ["Action", "Thriller"],
                        duration: "2h 45m",
                        certificate: "U/A",
                        poster: Coolie,
                        showtimes: [
                            {
                                date: "2026-03-24",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" }
                                ]
                            },
                            {
                                date: "2026-03-25",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false, status: "fast-filling" }
                                ]
                            },
                            {
                                date: "2026-03-26",
                                times: [
                                    { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false, status: "available" },
                                    { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: true, status: "sold-out" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];