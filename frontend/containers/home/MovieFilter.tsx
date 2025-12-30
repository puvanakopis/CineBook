"use client";

import { IoSearch } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const MovieFilter = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 -mt-8 relative z-20">
            <div className="bg-surface-dark rounded-xl p-4 md:p-6 border border-[#392828] shadow-2xl flex flex-col lg:flex-row gap-4 lg:gap-6 items-center">
                {/* Filters */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {/* Date */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Date
                        </span>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium">
                                <option>Today, 24 Oct</option>
                                <option>Tomorrow, 25 Oct</option>
                                <option>Sat, 26 Oct</option>
                                <option>Sun, 27 Oct</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineCalendarToday />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Genre */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Genre
                        </span>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium">
                                <option>All Genres</option>
                                <option>Action</option>
                                <option>Drama</option>
                                <option>Sci-Fi</option>
                                <option>Comedy</option>
                                <option>Horror</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineMovie />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Theater */}
                    <div className="flex flex-col gap-2">
                        <span className="text-text-secondary text-xs font-bold uppercase tracking-wider ml-1">
                            Theater
                        </span>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg bg-input-bg border-none text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary transition-all cursor-pointer font-medium">
                                <option>All Locations</option>
                                <option>Downtown IMAX</option>
                                <option>Westside Cinema</option>
                                <option>North Hills Drive-in</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                                <span className="material-symbols-outlined">
                                    <MdOutlineLocationOn />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button className="w-full lg:w-auto bg-white text-background-dark hover:bg-gray-200 font-bold h-12 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 self-end mt-6 lg:mt-0">
                    <span className="material-symbols-outlined"><IoSearch /></span>
                    Find Movies
                </button>
            </div>
        </div>
    );
};

export default MovieFilter;