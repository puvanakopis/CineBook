export interface Show {
    movie: string;
    date: string;
    time: string;
    price: number;
    currency?: string;
    status?: "available" | "sold-out" | "almost-full" | "fast-filling";
}

export interface Screen {
    screen_id: string;
    name: string;
    type: string;
    shows: Show[];
}

export interface Features {
    mTicket?: boolean;
    foodBeverage?: boolean;
    parking?: boolean;
    wheelchair?: boolean;
    dolby?: boolean;
    imax?: boolean;
    recliners?: boolean;
    fourK?: boolean;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Review {
    user?: string;
    rating: number;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Theater {
    _id: string;
    name: string;
    address: string;
    city: string;
    amenities: string[];
    image: string;
    description: string;
    phone: string;
    email: string;
    location: Location;
    features: Features;
    screens: Screen[];
    reviews: Review[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateTheaterRequest {
    name: string;
    address: string;
    city: string;
    amenities?: string[];
    image: File | string;
    description: string;
    phone: string;
    email: string;
    location: Location;
    features?: Features;
    screens?: Screen[];
    reviews?: Review[];
}

export type UpdateTheaterRequest = Partial<CreateTheaterRequest>;
export type CreateTheaterPayload = CreateTheaterRequest | FormData;
export type UpdateTheaterPayload = UpdateTheaterRequest | FormData;

export interface CreateTheaterResponse {
    message: string;
    theater: Theater;
}

export interface UpdateTheaterResponse {
    message: string;
    theater: Theater;
}

export interface DeleteTheaterResponse {
    message: string;
}

export type GetTheatersResponse = Theater[];

export interface TheaterState {
    theaters: Theater[];
    selectedTheater: Theater | null;
    isLoading: boolean;
    error: string | null;
}

export interface TheaterContextType extends TheaterState {
    getTheaters: () => Promise<void>;
    getTheaterById: (id: string) => Promise<void>;
    createTheater: (data: CreateTheaterPayload) => Promise<void>;
    updateTheater: (id: string, data: UpdateTheaterPayload) => Promise<void>;
    deleteTheater: (id: string) => Promise<void>;
    clearError: () => void;
    clearSelectedTheater: () => void;
}