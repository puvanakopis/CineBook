"use client";

import React from "react";
import Image from "next/image";
import { IoCameraOutline, IoMailOutline, IoCalendarOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

export function ProfileHero() {
    const { userInfo, uploadProfilePicture } = useAuth();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const avatarUrl = userInfo?.profilePicture 
        ? `${process.env.NEXT_PUBLIC_API_URL}${userInfo.profilePicture}`
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuBtLVHRuSfBjd2mcg9wuEI_gTfwCJRim11sLijh4Zz4eLKNL_YmzkffvNm2j_iNer5JLJM0o3U4pQDjzjYVF1jbbqhD-nMJjia33G72LPBciwlTkSHlw7ddZvTQYnaQd14xHJgmMwNuWZHU46fgfgH-OcF-FStDxz-qAndtmJkKJTru9o0dRgzbNka-sJ7oFsJOX-CbzEezYAdbNMv1yILiBJCqJ2tO8abP9CCxLrZ1Lalxutp1U-hM-W9cyu_L0qyUd47ZQS3VLZ-h";

    const firstName = userInfo ? `${userInfo.firstName}` : "Loading...";
    const email = userInfo ? userInfo.email : "loading...";

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Joined Recently";
        const date = new Date(dateString);
        return `Joined ${date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`;
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const uploadPromise = uploadProfilePicture(file);
            
            toast.promise(uploadPromise, {
                loading: 'Uploading profile picture...',
                success: 'Profile picture updated!',
                error: 'Failed to upload profile picture',
            });

            try {
                await uploadPromise;
            } catch (err) {
                console.error("Failed to upload profile picture:", err);
            }
        }
    };

    return (
        <div className="relative w-full">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
            />
            <div className="relative max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 pt-8 lg:pt-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                    {/* Avatar */}
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        <div 
                            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#392828] group cursor-pointer"
                            onClick={handleCameraClick}
                        >
                            <Image
                                src={avatarUrl}
                                alt="User Avatar"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                <IoCameraOutline className="text-3xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                        {/* Tags */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                Member
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#392828] text-gray-300 text-[10px] font-medium">
                                Movie Enthusiast
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                            {firstName}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-400 text-xs mb-6">
                            <div className="flex items-center gap-1.5">
                                <IoMailOutline className="text-primary text-base" />
                                <span>{email}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <IoCalendarOutline className="text-primary text-base" />
                                <span>{formatDate(userInfo?.createdAt)}</span>
                            </div>
                        </div>

                        {/* Activity Highlights */}
                        <div className="mb-6 w-full max-w-2xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-[#1a1414] border border-[#392828] rounded-lg p-3 flex flex-col items-center justify-center gap-0.5 group hover:border-primary/50 transition-all cursor-pointer shadow-lg">
                                    <span className="text-primary text-xl font-black">124</span>
                                    <span className="text-text-secondary text-[8px] uppercase font-bold tracking-[0.1em] text-center">Movies</span>
                                </div>
                                <div className="bg-[#1a1414] border border-[#392828] rounded-lg p-3 flex flex-col items-center justify-center gap-0.5 group hover:border-primary/50 transition-all cursor-pointer shadow-lg">
                                    <span className="text-primary text-xl font-black">42</span>
                                    <span className="text-text-secondary text-[8px] uppercase font-bold tracking-[0.1em] text-center">Reviews</span>
                                </div>
                                <div className="bg-[#1a1414] border border-[#392828] rounded-lg p-3 flex flex-col items-center justify-center gap-0.5 group hover:border-primary/50 transition-all cursor-pointer shadow-lg">
                                    <span className="text-primary text-xl font-black">15</span>
                                    <span className="text-text-secondary text-[8px] uppercase font-bold tracking-[0.1em] text-center">Theaters</span>
                                </div>
                                <div className="bg-[#1a1414] border border-[#392828] rounded-lg p-3 flex flex-col items-center justify-center gap-0.5 group hover:border-primary/50 transition-all cursor-pointer shadow-lg">
                                    <span className="text-primary text-xl font-black">8</span>
                                    <span className="text-text-secondary text-[8px] uppercase font-bold tracking-[0.1em] text-center">Bookings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
