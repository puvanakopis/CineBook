'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { IoMdStarOutline } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

interface TheaterCardProps {
    theater: {
        theater_id: string;
        name: string;
        address: string;
        rating: number;
        amenities: string[];
        image: string;
        city: string;
    };
    viewMode: 'grid' | 'list';
}

const TheaterCard = ({ theater, viewMode }: TheaterCardProps) => {
    const router = useRouter();

    if (viewMode === 'list') {
        return (
            <div
                className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col sm:flex-row h-full cursor-pointer"
                onClick={() => router.push(`/theaters/${theater.theater_id}`)}
            >
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-800">
                    <Image
                        src={theater.image}
                        alt={theater.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-white text-lg font-bold group-hover:text-primary transition-colors">
                            {theater.name}
                        </h3>
                        <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                            <IoMdStarOutline className="text-yellow-500 text-sm" />
                            <span className="text-white text-xs font-bold">{theater.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 mt-2 mb-3 text-text-secondary text-xs">
                        <span className="material-symbols-outlined text-[16px] flex-shrink-0"><CiLocationOn /></span>
                        <span className="line-clamp-2">{theater.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {theater.amenities.slice(0, 3).map((amenity) => (
                            <span key={amenity} className="text-[10px] font-medium text-text-secondary bg-[#392828] px-2 py-1 rounded flex items-center gap-1">
                                {amenity}
                            </span>
                        ))}
                        {theater.amenities.length > 3 && (
                            <span className="text-[10px] font-medium text-text-secondary bg-[#392828] px-2 py-1 rounded">
                                +{theater.amenities.length - 3}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/theaters/${theater.theater_id}`);
                        }}
                        className="mt-auto w-max px-8 border border-primary text-primary bg-primary text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="group bg-surface-dark rounded-xl overflow-hidden border border-[#392828] hover:border-primary/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col h-full cursor-pointer"
            onClick={() => router.push(`/theaters/${theater.theater_id}`)}
        >
            <div className="relative aspect-video overflow-hidden bg-gray-800">
                <Image
                    src={theater.image}
                    alt={theater.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                    <IoMdStarOutline className="text-yellow-500 text-sm" />
                    <span className="text-white text-xs font-bold">{theater.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                    {theater.amenities.slice(0, 2).map((amenity) => (
                        <span key={amenity} className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                            {amenity}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold truncate group-hover:text-primary transition-colors">
                    {theater.name}
                </h3>
                <div className="flex items-start gap-2 mt-1 mb-4 text-text-secondary text-xs">
                    <span className="material-symbols-outlined text-[16px] flex-shrink-0"><CiLocationOn /></span>
                    <span className="line-clamp-2">{theater.address}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {theater.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-[10px] font-medium text-text-secondary bg-[#392828] px-2 py-1 rounded flex items-center gap-1">
                            {amenity}
                        </span>
                    ))}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/theaters/${theater.theater_id}`);
                    }}
                    className="mt-auto w-full border border-primary bg-primary text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TheaterCard;