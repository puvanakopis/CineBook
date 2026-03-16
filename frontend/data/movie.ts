export const movies = [
    {
        movie_id: 1,
        title: "Coolie",
        rating: 8.8,
        genres: ["Action", "Thriller"],
        duration: "2h 45m",
        releaseDate: "2025",
        languages: "Tamil, Telugu, Hindi, Sinhala",
        formats: "2D, IMAX 3D",
        synopsis: "Coolie is a high-octane action thriller featuring a powerful protagonist who rises against systemic injustice, blending intense drama, mass action, and Rajinikanth's signature screen presence. Set against the backdrop of Colombo's underworld, a humble dock worker's quest for justice sparks an epic battle against corruption.",
        poster: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=qeVfT2iLiu0&t=14s",
        theaters: [
            {
                theater_id: "t1",
                name: "Scope Cinemas - Colombo",
                address: "No. 123, Galle Road, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 1500, currency: "LKR", isSoldOut: true },
                        { time: "4:30 PM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "7:30 PM", price: 1800, currency: "LKR", isSoldOut: false }
                    ],
                    imax3d: [
                        { time: "11:30 AM", price: 2500, currency: "LKR", isSoldOut: false },
                        { time: "3:00 PM", price: 2500, currency: "LKR", isSoldOut: false },
                        { time: "6:30 PM", price: 2800, currency: "LKR", isSoldOut: true },
                        { time: "9:30 PM", price: 2800, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t2",
                name: "Liberty By Scope - Colombo",
                address: "No. 45, Liberty Plaza, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "2:00 PM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1300, currency: "LKR", isSoldOut: true },
                        { time: "8:00 PM", price: 1600, currency: "LKR", isSoldOut: false }
                    ],
                    imax3d: [
                        { time: "12:00 PM", price: 2200, currency: "LKR", isSoldOut: false },
                        { time: "3:30 PM", price: 2200, currency: "LKR", isSoldOut: true },
                        { time: "7:00 PM", price: 2500, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t3",
                name: "Savoy 3D Cinema - Colombo",
                address: "No. 78, Galle Road, Colombo 04",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "1:45 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "4:45 PM", price: 1200, currency: "LKR", isSoldOut: true },
                        { time: "7:45 PM", price: 1500, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t4",
                name: "Regal Cinema - Kandy",
                address: "No. 234, Colombo Street, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:30 AM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "2:30 PM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "8:30 PM", price: 1200, currency: "LKR", isSoldOut: true }
                    ]
                }
            },
            {
                theater_id: "t5",
                name: "Cinemax - Jaffna",
                address: "No. 56, Hospital Road, Jaffna",
                features: { mTicket: true, foodBeverage: false, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "1:00 PM", price: 800, currency: "LKR", isSoldOut: true },
                        { time: "4:00 PM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "7:00 PM", price: 1000, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t6",
                name: "Majestic Cinema - Galle",
                address: "No. 89, Colombo Road, Galle",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "2:00 PM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1100, currency: "LKR", isSoldOut: true },
                        { time: "8:00 PM", price: 1100, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c1", name: "Rajinikanth", role: "Coolie / Velu", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c2", name: "Kajal Aggarwal", role: "Meera", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c3", name: "S. Shankar", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c4", name: "A. R. Rahman", role: "Music Composer", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c5", name: "Vijay Sethupathi", role: "Antagonist", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c6", name: "Nayanthara", role: "Supporting Role", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" },
            { cast_id: "c7", name: "Anirudh Ravichander", role: "Background Score", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg" }
        ],
        reviews: [
            {
                review_id: "r1",
                user_id: "u101",
                author: "Anand Krishnan",
                date: "2026-01-15",
                rating: 5,
                content: "Absolute masterpiece! Rajinikanth at his finest. The action sequences in Colombo were brilliantly shot. A must-watch for every cinema lover.",
                initials: "AK",
                hasPremium: true,
                likes: 245,
                verified: true
            },
            {
                review_id: "r2",
                user_id: "u102",
                author: "Priya Jeyaratne",
                date: "2026-01-14",
                rating: 4,
                content: "Great movie with solid direction. Music by A. R. Rahman is a highlight. The climax was slightly rushed but overall entertaining.",
                initials: "PJ",
                hasPremium: false,
                likes: 128,
                verified: true
            },
            {
                review_id: "r3",
                user_id: "u103",
                author: "Suresh Fernando",
                date: "2026-01-13",
                rating: 5,
                content: "Watched at Scope Cinemas - the IMAX experience was phenomenal! Thalaivar's swag is unmatched. The Sri Lanka sequences added authenticity.",
                initials: "SF",
                hasPremium: true,
                likes: 312,
                verified: true
            },
            {
                review_id: "r4",
                user_id: "u104",
                author: "Kamala Vignesh",
                date: "2026-01-12",
                rating: 4,
                content: "Good entertainer with family. The first half was engaging, second half could have been crisper. Rajini's dialogue delivery was superb.",
                initials: "KV",
                hasPremium: false,
                likes: 89,
                verified: false
            }
        ]
    },
    {
        movie_id: 2,
        title: "Good Bad Ugly",
        rating: 8.5,
        genres: ["Biography", "Action", "Drama"],
        duration: "2h 32m",
        releaseDate: "2024",
        languages: "Tamil, Hindi, Sinhala",
        formats: "2D",
        synopsis: "A gritty biographical drama following the life of an unconventional hero who navigates through moral ambiguities in a world divided between good, bad, and ugly choices. Based on true events, this film explores the complexities of human nature and redemption.",
        poster: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample1",
        theaters: [
            {
                theater_id: "t7",
                name: "PVR Cinemas - Colombo City Centre",
                address: "No. 478, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, dolby: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "1:45 PM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1800, currency: "LKR", isSoldOut: true },
                        { time: "8:15 PM", price: 1800, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t8",
                name: "Empire Cinema - Kandy",
                address: "No. 156, Peradeniya Road, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "2:15 PM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "8:45 PM", price: 1300, currency: "LKR", isSoldOut: true }
                    ]
                }
            },
            {
                theater_id: "t9",
                name: "Luxury Cinema - Negombo",
                address: "No. 34, Beach Road, Negombo",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "12:00 PM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "3:15 PM", price: 900, currency: "LKR", isSoldOut: true },
                        { time: "6:30 PM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "9:45 PM", price: 1100, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t10",
                name: "Ritz Cinema - Galle",
                address: "No. 67, Lighthouse Street, Galle",
                features: { mTicket: true, foodBeverage: false, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "1:15 PM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "4:30 PM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "7:45 PM", price: 1000, currency: "LKR", isSoldOut: true }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c8", name: "Vijay", role: "Lead Role / Karthik", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg" },
            { cast_id: "c9", name: "Trisha", role: "Female Lead / Anjali", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg" },
            { cast_id: "c10", name: "Venkat Prabhu", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg" },
            { cast_id: "c11", name: "Yuvan Shankar Raja", role: "Music Composer", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg" },
            { cast_id: "c12", name: "Prakash Raj", role: "Antagonist", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/top-good-bad-ugly-first-look-poster-hd-4k-download-4272458.jpg" }
        ],
        reviews: [
            {
                review_id: "r5",
                user_id: "u105",
                author: "Ravi Kandasamy",
                date: "2026-01-10",
                rating: 4,
                content: "Powerful performances and gripping narrative. Vijay excels in this role. The emotional depth was remarkable.",
                initials: "RK",
                hasPremium: true,
                likes: 176,
                verified: true
            },
            {
                review_id: "r6",
                user_id: "u106",
                author: "Nirosha Perera",
                date: "2026-01-09",
                rating: 5,
                content: "One of the best biographical films I've seen. The transformation of the lead character was portrayed brilliantly.",
                initials: "NP",
                hasPremium: false,
                likes: 203,
                verified: true
            },
            {
                review_id: "r7",
                user_id: "u107",
                author: "Dilshan Rodrigo",
                date: "2026-01-08",
                rating: 4,
                content: "Good movie with strong performances. The screenplay kept me engaged throughout. Music was a bonus.",
                initials: "DR",
                hasPremium: false,
                likes: 92,
                verified: false
            }
        ]
    },
    {
        movie_id: 3,
        title: "The GOAT",
        rating: 7.9,
        genres: ["Sci-Fi", "Action", "Adventure"],
        duration: "2h 59m",
        releaseDate: "2024",
        languages: "Tamil, Telugu, English, Sinhala",
        formats: "2D, 3D, IMAX 3D",
        synopsis: "In a futuristic world, a legendary fighter must come out of retirement to save humanity from an alien threat, proving why he's considered the Greatest Of All Time. With stunning visual effects and heart-pounding action sequences, this sci-fi epic pushes the boundaries of storytelling.",
        poster: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample2",
        theaters: [
            {
                theater_id: "t11",
                name: "IMAX Theater - Colombo City Centre",
                address: "Level 3, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, imax: true, dolby: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 1700, currency: "LKR", isSoldOut: true },
                        { time: "5:00 PM", price: 1900, currency: "LKR", isSoldOut: false },
                        { time: "8:30 PM", price: 1900, currency: "LKR", isSoldOut: false }
                    ],
                    imax3d: [
                        { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "6:30 PM", price: 3000, currency: "LKR", isSoldOut: true },
                        { time: "10:00 PM", price: 3000, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t12",
                name: "Cinecity - Kandy",
                address: "No. 345, Kandy City Center, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, dolby: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "2:00 PM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "9:00 PM", price: 1600, currency: "LKR", isSoldOut: true }
                    ],
                    imax3d: [
                        { time: "12:00 PM", price: 2400, currency: "LKR", isSoldOut: false },
                        { time: "3:30 PM", price: 2400, currency: "LKR", isSoldOut: true },
                        { time: "7:00 PM", price: 2600, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t13",
                name: "Galaxy Cinema - Matara",
                address: "No. 89, Beach Road, Matara",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "2:30 PM", price: 900, currency: "LKR", isSoldOut: true },
                        { time: "6:00 PM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "9:30 PM", price: 1100, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t14",
                name: "New Olympia Cinema - Kurunegala",
                address: "No. 123, Colombo Road, Kurunegala",
                features: { mTicket: true, foodBeverage: false, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1000, currency: "LKR", isSoldOut: true },
                        { time: "8:30 PM", price: 1000, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c13", name: "Vijay Sethupathi", role: "The GOAT / Veera", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg" },
            { cast_id: "c14", name: "Samantha", role: "Scientist / Dr. Nila", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg" },
            { cast_id: "c15", name: "Lokesh Kanagaraj", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg" },
            { cast_id: "c16", name: "Anirudh", role: "Music Composer", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg" },
            { cast_id: "c17", name: "Fahadh Faasil", role: "Alien Commander", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/new-goat-poster-4k-4123382.jpg" }
        ],
        reviews: [
            {
                review_id: "r8",
                user_id: "u108",
                author: "Kumar Sangakkara",
                date: "2026-01-07",
                rating: 4,
                content: "Visual spectacle with amazing CGI. Length could have been shorter but the 3D effects were worth it. Watched at IMAX Colombo and it was breathtaking.",
                initials: "KS",
                hasPremium: true,
                likes: 312,
                verified: true
            },
            {
                review_id: "r9",
                user_id: "u109",
                author: "Shalini Tharaka",
                date: "2026-01-06",
                rating: 4,
                content: "Sci-fi done right! The action sequences were top-notch and the alien design was innovative. Vijay Sethupathi was brilliant as always.",
                initials: "ST",
                hasPremium: false,
                likes: 187,
                verified: true
            },
            {
                review_id: "r10",
                user_id: "u110",
                author: "Ruwan Perera",
                date: "2026-01-05",
                rating: 3,
                content: "Good visuals but predictable story. The second half dragged a bit. Family audience might enjoy it.",
                initials: "RP",
                hasPremium: false,
                likes: 76,
                verified: false
            }
        ]
    },
    {
        movie_id: 4,
        title: "Madharasi",
        rating: 8.5,
        genres: ["Action", "Drama", "Period"],
        duration: "2h 22m",
        releaseDate: "2025",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "A rural drama with intense action sequences, exploring the life of a village leader who fights against corruption and injustice in his community. Set in the 1980s, this powerful narrative showcases the triumph of the human spirit against oppressive systems.",
        poster: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample3",
        theaters: [
            {
                theater_id: "t15",
                name: "Regal Cinema - Jaffna",
                address: "No. 234, KKS Road, Jaffna",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 700, currency: "LKR", isSoldOut: false },
                        { time: "1:45 PM", price: 700, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 900, currency: "LKR", isSoldOut: true },
                        { time: "8:15 PM", price: 900, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t16",
                name: "Vijay Cinema - Batticaloa",
                address: "No. 56, Trinco Road, Batticaloa",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 600, currency: "LKR", isSoldOut: false },
                        { time: "2:15 PM", price: 600, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 800, currency: "LKR", isSoldOut: false },
                        { time: "8:45 PM", price: 800, currency: "LKR", isSoldOut: true }
                    ]
                }
            },
            {
                theater_id: "t17",
                name: "Roxy Cinema - Anuradhapura",
                address: "No. 89, Maithripala Senanayake Mawatha, Anuradhapura",
                features: { mTicket: true, foodBeverage: false, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 550, currency: "LKR", isSoldOut: false },
                        { time: "1:15 PM", price: 550, currency: "LKR", isSoldOut: true },
                        { time: "4:30 PM", price: 750, currency: "LKR", isSoldOut: false },
                        { time: "7:45 PM", price: 750, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t18",
                name: "New Cinema - Badulla",
                address: "No. 123, Passara Road, Badulla",
                features: { mTicket: false, foodBeverage: true, parking: false, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:30 AM", price: 500, currency: "LKR", isSoldOut: false },
                        { time: "2:45 PM", price: 500, currency: "LKR", isSoldOut: false },
                        { time: "6:00 PM", price: 700, currency: "LKR", isSoldOut: true },
                        { time: "9:15 PM", price: 700, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c18", name: "Sivakarthikeyan", role: "Madharasi", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg" },
            { cast_id: "c19", name: "Sai Pallavi", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg" },
            { cast_id: "c20", name: "Sudha Kongara", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg" },
            { cast_id: "c21", name: "GV Prakash", role: "Music Composer", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg" },
            { cast_id: "c22", name: "Prakash Raj", role: "Villain", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/madharasi-movie-first-look-poster-4k-3608222.jpg" }
        ],
        reviews: [
            {
                review_id: "r11",
                user_id: "u111",
                author: "Jegan Thiru",
                date: "2026-01-04",
                rating: 5,
                content: "Powerful performance by Sivakarthikeyan! The rural setting was authentic and the emotional scenes hit hard. A must-watch.",
                initials: "JT",
                hasPremium: true,
                likes: 156,
                verified: true
            }
        ]
    },
    {
        movie_id: 5,
        title: "Vidaamuyarchi",
        rating: 8.2,
        genres: ["Action", "Thriller", "Corporate"],
        duration: "2h 38m",
        releaseDate: "2024",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "A corporate thriller about a brilliant strategist who uses his intellect to navigate dangerous business wars and personal vendettas. When a hostile takeover threatens his family's legacy, he must outsmart powerful enemies in a high-stakes game of deception.",
        poster: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample4",
        theaters: [
            {
                theater_id: "t19",
                name: "Scope Cinemas - Colombo",
                address: "No. 123, Galle Road, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "2:15 PM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1700, currency: "LKR", isSoldOut: true },
                        { time: "8:45 PM", price: 1700, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t20",
                name: "Cinemax - Colombo",
                address: "No. 45, Majestic City, Colombo 04",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "1:45 PM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "8:15 PM", price: 1600, currency: "LKR", isSoldOut: true }
                    ]
                }
            },
            {
                theater_id: "t21",
                name: "Regal Cinema - Kandy",
                address: "No. 234, Colombo Street, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:30 AM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "2:45 PM", price: 1000, currency: "LKR", isSoldOut: true },
                        { time: "6:00 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "9:15 PM", price: 1200, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c23", name: "Ajith Kumar", role: "Lead Role", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg" },
            { cast_id: "c24", name: "Trisha", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg" },
            { cast_id: "c25", name: "Magesh", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/vidamuyarchi-ajith-first-look-poster-4k-wallpaper-7913453.jpg" }
        ],
        reviews: [
            {
                review_id: "r12",
                user_id: "u112",
                author: "Arun Prasad",
                date: "2026-01-03",
                rating: 4,
                content: "Thala Ajith at his best! The corporate thriller angle was fresh and engaging. Well-crafted screenplay.",
                initials: "AP",
                hasPremium: true,
                likes: 234,
                verified: true
            }
        ]
    },
    {
        movie_id: 6,
        title: "Retro",
        rating: 7.8,
        genres: ["Drama", "Action", "Musical"],
        duration: "2h 43m",
        releaseDate: "2024",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "A period drama set in the 80s, following a musician's journey through love, loss, and redemption in the vibrant music scene of Madras. With a soulful soundtrack and emotional narrative, this film celebrates the golden era of music.",
        poster: "https://www.wallsnapy.com/img_gallery/new-retro-surya-4k-images-5102165.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample5",
        theaters: [
            {
                theater_id: "t22",
                name: "Liberty By Scope - Colombo",
                address: "No. 45, Liberty Plaza, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "12:00 PM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "3:30 PM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "7:00 PM", price: 1500, currency: "LKR", isSoldOut: true },
                        { time: "10:30 PM", price: 1500, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t23",
                name: "Empire Cinema - Galle",
                address: "No. 78, Colombo Road, Galle",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "2:30 PM", price: 900, currency: "LKR", isSoldOut: true },
                        { time: "6:00 PM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "9:30 PM", price: 1100, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c26", name: "Suriya", role: "Musician", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/new-retro-surya-4k-images-5102165.jpg" },
            { cast_id: "c27", name: "Aishwarya Rai", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/new-retro-surya-4k-images-5102165.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 7,
        title: "Captain Miller",
        rating: 8.3,
        genres: ["Sports", "Drama", "Biography"],
        duration: "2h 28m",
        releaseDate: "2023",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "Inspired by true events, this sports drama follows a struggling cricket team's journey to victory under an unconventional captain's leadership. Against all odds, they must overcome personal demons and societal pressures to achieve their dreams.",
        poster: "https://www.wallsnapy.com/img_gallery/top-captain-miller-dhanush-hd-poster-wallpaper-1080px-7975672.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample6",
        theaters: [
            {
                theater_id: "t24",
                name: "Savoy 3D Cinema - Colombo",
                address: "No. 78, Galle Road, Colombo 04",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "1:45 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1400, currency: "LKR", isSoldOut: true },
                        { time: "8:15 PM", price: 1400, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t25",
                name: "Ritz Cinema - Kandy",
                address: "No. 89, Peradeniya Road, Kandy",
                features: { mTicket: true, foodBeverage: false, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "2:15 PM", price: 900, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1100, currency: "LKR", isSoldOut: false },
                        { time: "8:45 PM", price: 1100, currency: "LKR", isSoldOut: true }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c28", name: "Dhanush", role: "Captain Miller", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/top-captain-miller-dhanush-hd-poster-wallpaper-1080px-7975672.jpg" },
            { cast_id: "c29", name: "Priyanka Mohan", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/top-captain-miller-dhanush-hd-poster-wallpaper-1080px-7975672.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 8,
        title: "Thug Life",
        rating: 7.5,
        genres: ["Fantasy", "Action", "Adventure"],
        duration: "2h 34m",
        releaseDate: "2024",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "A fantasy adventure where a modern-day thief discovers ancient powers and must prevent a mythical artifact from falling into wrong hands. His journey takes him through hidden temples and magical realms in a race against time.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample7",
        theaters: [
            {
                theater_id: "t26",
                name: "PVR Cinemas - Colombo",
                address: "No. 478, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:30 AM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "2:45 PM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "6:00 PM", price: 1800, currency: "LKR", isSoldOut: true },
                        { time: "9:15 PM", price: 1800, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c30", name: "STR", role: "Thief", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c31", name: "Gautham Menon", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 9,
        title: "Kalki",
        rating: 8.7,
        genres: ["Sci-Fi", "Action", "Mythology"],
        duration: "2h 45m",
        releaseDate: "2024",
        languages: "Tamil, Telugu, Hindi, Sinhala",
        formats: "2D, 3D, IMAX 3D",
        synopsis: "A mythological sci-fi epic set in a dystopian future where the final avatar must emerge to restore cosmic balance. Blending ancient prophecies with futuristic technology, this spectacle reimagines the concept of divinity in a world on the brink of destruction.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample8",
        theaters: [
            {
                theater_id: "t27",
                name: "IMAX Theater - Colombo",
                address: "Level 3, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, imax: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1900, currency: "LKR", isSoldOut: true },
                        { time: "8:30 PM", price: 1900, currency: "LKR", isSoldOut: false }
                    ],
                    imax3d: [
                        { time: "11:30 AM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "3:00 PM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "6:30 PM", price: 3000, currency: "LKR", isSoldOut: true },
                        { time: "10:00 PM", price: 3000, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t28",
                name: "Scope Cinemas - Colombo",
                address: "No. 123, Galle Road, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "2:00 PM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "9:00 PM", price: 1700, currency: "LKR", isSoldOut: true }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c32", name: "Prabhas", role: "Kalki", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c33", name: "Deepika Padukone", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 10,
        title: "Pushpa 2",
        rating: 8.4,
        genres: ["Action", "Drama", "Crime"],
        duration: "2h 50m",
        releaseDate: "2024",
        languages: "Telugu, Tamil, Hindi, Sinhala",
        formats: "2D",
        synopsis: "The continuation of Pushpa's story as he faces new challenges in the red sandalwood smuggling world while dealing with personal demons. With higher stakes and more intense action, this sequel expands the universe of the original.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample9",
        theaters: [
            {
                theater_id: "t29",
                name: "Cinecity - Kandy",
                address: "No. 345, Kandy City Center, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "2:30 PM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "6:00 PM", price: 1600, currency: "LKR", isSoldOut: true },
                        { time: "9:30 PM", price: 1600, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c34", name: "Allu Arjun", role: "Pushpa", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c35", name: "Rashmika", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 11,
        title: "Salaar 2",
        rating: 8.6,
        genres: ["Action", "Thriller", "Period"],
        duration: "2h 55m",
        releaseDate: "2025",
        languages: "Telugu, Tamil, Hindi, Sinhala",
        formats: "2D, IMAX 3D",
        synopsis: "The explosive sequel follows Salaar's journey as he confronts a powerful international syndicate threatening his homeland. With larger-than-life action and political intrigue, this chapter raises the stakes to global proportions.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample10",
        theaters: [
            {
                theater_id: "t30",
                name: "IMAX Theater - Colombo",
                address: "Level 3, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, imax: true },
                showtimes: {
                    standard: [
                        { time: "10:30 AM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "2:00 PM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "5:30 PM", price: 1900, currency: "LKR", isSoldOut: true },
                        { time: "9:00 PM", price: 1900, currency: "LKR", isSoldOut: false }
                    ],
                    imax3d: [
                        { time: "12:00 PM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "3:30 PM", price: 2800, currency: "LKR", isSoldOut: false },
                        { time: "7:00 PM", price: 3000, currency: "LKR", isSoldOut: true }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c36", name: "Prabhas", role: "Salaar", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c37", name: "Shruti Haasan", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 12,
        title: "Vikram 2",
        rating: 8.9,
        genres: ["Action", "Thriller", "Espionage"],
        duration: "2h 40m",
        releaseDate: "2025",
        languages: "Tamil, Sinhala",
        formats: "2D, IMAX 3D",
        synopsis: "Agent Vikram returns for another high-stakes mission involving international espionage and a deadly new terrorist organization. With Kamal Haasan reprising his iconic role, this sequel promises more mind-blowing action sequences and intricate plot twists.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample11",
        theaters: [
            {
                theater_id: "t31",
                name: "Scope Cinemas - Colombo",
                address: "No. 123, Galle Road, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "11:00 AM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "2:30 PM", price: 1500, currency: "LKR", isSoldOut: false },
                        { time: "6:00 PM", price: 1700, currency: "LKR", isSoldOut: false },
                        { time: "9:30 PM", price: 1700, currency: "LKR", isSoldOut: true }
                    ],
                    imax3d: [
                        { time: "12:30 PM", price: 2600, currency: "LKR", isSoldOut: false },
                        { time: "4:00 PM", price: 2600, currency: "LKR", isSoldOut: true },
                        { time: "7:30 PM", price: 2800, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t32",
                name: "PVR Cinemas - Colombo",
                address: "No. 478, Colombo City Centre, Colombo 02",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: true, dolby: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 1600, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 1600, currency: "LKR", isSoldOut: true },
                        { time: "5:00 PM", price: 1800, currency: "LKR", isSoldOut: false },
                        { time: "8:30 PM", price: 1800, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c38", name: "Kamal Haasan", role: "Vikram", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c39", name: "Fahadh Faasil", role: "Agent", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: []
    },
    {
        movie_id: 13,
        title: "Leo 2",
        rating: 8.3,
        genres: ["Action", "Drama", "Crime"],
        duration: "2h 48m",
        releaseDate: "2025",
        languages: "Tamil, Sinhala",
        formats: "2D",
        synopsis: "The sequel to the blockbuster, continuing Leo's story as he faces new threats while trying to protect his family and identity. Past sins catch up with him as a new enemy emerges from the shadows.",
        poster: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=sample12",
        theaters: [
            {
                theater_id: "t33",
                name: "Liberty By Scope - Colombo",
                address: "No. 45, Liberty Plaza, Colombo 03",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "11:30 AM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "3:00 PM", price: 1300, currency: "LKR", isSoldOut: false },
                        { time: "6:30 PM", price: 1500, currency: "LKR", isSoldOut: true },
                        { time: "10:00 PM", price: 1500, currency: "LKR", isSoldOut: false }
                    ]
                }
            },
            {
                theater_id: "t34",
                name: "Savoy 3D Cinema - Colombo",
                address: "No. 78, Galle Road, Colombo 04",
                features: { mTicket: false, foodBeverage: true, parking: true, wheelchair: true },
                showtimes: {
                    standard: [
                        { time: "10:00 AM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "1:30 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "5:00 PM", price: 1400, currency: "LKR", isSoldOut: false },
                        { time: "8:30 PM", price: 1400, currency: "LKR", isSoldOut: true }
                    ]
                }
            },
            {
                theater_id: "t35",
                name: "Empire Cinema - Kandy",
                address: "No. 156, Peradeniya Road, Kandy",
                features: { mTicket: true, foodBeverage: true, parking: true, wheelchair: false },
                showtimes: {
                    standard: [
                        { time: "12:00 PM", price: 1000, currency: "LKR", isSoldOut: false },
                        { time: "3:30 PM", price: 1000, currency: "LKR", isSoldOut: true },
                        { time: "7:00 PM", price: 1200, currency: "LKR", isSoldOut: false },
                        { time: "10:30 PM", price: 1200, currency: "LKR", isSoldOut: false }
                    ]
                }
            }
        ],
        cast: [
            { cast_id: "c40", name: "Vijay", role: "Leo", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c41", name: "Lokesh Kanagaraj", role: "Director", type: "director", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c42", name: "Anirudh", role: "Music Composer", type: "composer", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c43", name: "Sanjay Dutt", role: "Antagonist", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" },
            { cast_id: "c44", name: "Trisha", role: "Female Lead", type: "actor", imageUrl: "https://www.wallsnapy.com/img_gallery/thug-life-str-simbu-movie-photos-4359369.jpg" }
        ],
        reviews: [
            {
                review_id: "r13",
                user_id: "u113",
                author: "Vijayakanth",
                date: "2026-01-02",
                rating: 5,
                content: "Worth the wait! Vijay's performance was outstanding. The action sequences were brilliantly choreographed. A perfect sequel.",
                initials: "VK",
                hasPremium: true,
                likes: 421,
                verified: true
            },
            {
                review_id: "r14",
                user_id: "u114",
                author: "Lakshmi Narayan",
                date: "2026-01-01",
                rating: 4,
                content: "Good entertainer. The first half was gripping. Second half could have been trimmed. Music by Anirudh was top-notch.",
                initials: "LN",
                hasPremium: false,
                likes: 187,
                verified: true
            }
        ]
    }
];