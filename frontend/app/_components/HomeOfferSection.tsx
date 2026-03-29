"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import UnlimitedMoviePass from "@/public/UnlimitedMoviePass.png"
import OffTickets from "@/public/OffTickets.png"

interface OfferCardProps {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    imageUrl: string | StaticImageData;
    buttonText: string;
    buttonLink: string;
}

const offers: OfferCardProps[] = [
    {
        title: "15% Off Tickets",
        subtitle: "Exclusive Offer",
        description: "Show this coupon at the counter every Monday and Wednesday to get 15% off your tickets.",
        badge: "Limited Time",
        imageUrl: OffTickets,
        buttonText: "Learn More",
        buttonLink: "#"
    },
    {
        title: "Unlimited Movie Pass",
        subtitle: "CineClub LKR Plan",
        description: "Join our CineClub for unlimited movies starting at LKR 4,500/month.",
        badge: "Unlimited Pass",
        imageUrl: UnlimitedMoviePass,
        buttonText: "Join Now",
        buttonLink: "#",
    },
];

const HomeOfferSection = () => {
    return (
        <div className="bg-[#1c1414] py-16 border-t border-[#392828]">
            <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 lg:px-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-white text-2xl font-bold">Exclusive Offers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className="relative rounded-xl overflow-hidden min-h-[320px] md:min-h-[280px] lg:h-64 group cursor-pointer"
                        >
                            <Image
                                src={offer.imageUrl}
                                alt={offer.title}
                                fill
                                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                            <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-8">
                                <span className="text-primary font-bold tracking-wider text-xs md:text-sm uppercase mb-2">
                                    {offer.badge}
                                </span>
                                <h3 className="text-white text-2xl md:text-3xl font-black mb-2">
                                    {offer.title}
                                </h3>
                                <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                                    {offer.description}
                                </p>
                                <a
                                    href={offer.buttonLink}
                                    className="text-white font-bold hover:text-primary transition-colors flex items-center gap-2 w-fit"
                                >
                                    {offer.buttonText}{" "}
                                    <span className="text-sm">
                                        <IoMdArrowForward />
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeOfferSection;