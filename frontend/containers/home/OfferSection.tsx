"use client";

import Image from "next/image";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";

interface OfferCardProps {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
}

const offers: OfferCardProps[] = [
    {
        title: "15% Off Tickets",
        subtitle: "Exclusive Offer",
        description: "Show this coupon at the counter every Monday and Wednesday to get 15% off your tickets.",
        badge: "Limited Time",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSo3JEDuB_nGECEC273PGCFegUy_ARG9X4yxcZh0kyQyZiA94Vw7hrGYVC5C3OvSLis4hCdhoN7Jl26UZQBRZWaetntrRYYsVzdNZdiRgL2TZlndPbeR0_RcqfOVq7YxD_MmVjDqJhpaQ8zFCoTPHjNnXkHOKwPhbqAQVaDLdE0Zz4C-pxlFyx52yh_qsOwgODB_Ubc9yjeQBnjj69Ob5XlFSd2sleX3r518Sc6frOBPnGfTchsO5gA_RuYyLUxflDUhyN8Pe0HpFO",
        buttonText: "Learn More",
        buttonLink: "#"
    },
    {
        title: "Unlimited Movie Pass",
        subtitle: "CineClub LKR Plan",
        description: "Join our CineClub for unlimited movies starting at LKR 4,500/month.",
        badge: "Unlimited Pass",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCBlmatohl9hHurZtBduMxHvRXMYPGsRBNKh8oq1jllEbh2Hd2fssuDBIrc_SDU5bTP06te7AtRQTsD0siUct8W2kHZf98RitagsQAzsBTqKyh4RR0OA5z6Ykg_yJhNVT7Yq0fSQK97t7U7Uf-eZlfzaKorGdSwrKdFr3cX11DdcFnXU-9i4ARrjutnOdvbul0oRPGCL9OuT4qQdvmZwpdGtEHmQalJQIYQL8fHQOFEzIahLR0lk_7xyspNdPK5y6IyYXdy91KgJ4B1",
        buttonText: "Join Now",
        buttonLink: "#",
    },
];

const OfferSection: React.FC = () => {
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
                            className="relative rounded-xl overflow-hidden h-64 group cursor-pointer"
                        >
                            <Image
                                src={offer.imageUrl}
                                alt={offer.title}
                                width={500}
                                height={256}
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                            <div className="relative z-10 h-full flex flex-col justify-center p-8 max-w-lg">
                                <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2">
                                    {offer.badge}
                                </span>
                                <h3 className="text-white text-3xl font-black mb-2">{offer.title}</h3>
                                <p className="text-gray-300 text-sm mb-6">{offer.description}</p>
                                <a
                                    href={offer.buttonLink}
                                    className="text-white font-bold hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    {offer.buttonText}{" "}
                                    <span className="material-symbols-outlined text-sm">
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

export default OfferSection;