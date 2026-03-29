'use client';

import Image, { StaticImageData } from "next/image";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi2";

interface TheaterHeroProps {
    name: string;
    address: string;
    rating: number;
    totalVotes?: number;
    image: string | StaticImageData;
    amenities: string[];
}

const TheaterHero = ({
    name,
    address,
    rating,
    totalVotes,
    image,
}: TheaterHeroProps) => {

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="w-5 h-5 text-yellow-400" />);
            }
        }

        return stars;
    };

    return (
        <div className="relative w-full h-[400px] lg:h-[480px] flex items-end overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 lg:px-20 pb-8 lg:pb-12">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between animate-fade-in-up">

                    {/* Left Section */}
                    <div className="flex flex-col gap-3 max-w-2xl">

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                                Certified Partner
                            </span>

                            <div className="flex items-center gap-1">
                                {renderStars()}
                                <span className="text-white text-sm font-medium ml-2">
                                    {rating.toFixed(1)}{" "}
                                    {totalVotes && `(${totalVotes.toLocaleString()} votes)`}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-xl">
                            {name}
                        </h1>

                        {/* Address */}
                        <p className="text-gray-300 text-base lg:text-lg flex items-start gap-2 max-w-lg">
                            <span className="material-symbols-outlined text-primary mt-1 text-xl">
                                <CiLocationOn />
                            </span>
                            <span>{address}</span>
                        </p>
                    </div>

                    {/* Right Section Buttons */}
                    <div className="flex gap-3 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none h-12 px-6 rounded-lg bg-surface-dark border border-[#392828] hover:border-primary text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined"><MdFavoriteBorder /></span>
                            Favorite
                        </button>

                        <button className="flex-1 lg:flex-none h-12 px-6 rounded-lg bg-surface-dark border border-[#392828] hover:border-primary text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined"><HiOutlineShare /></span>
                            Share
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TheaterHero;