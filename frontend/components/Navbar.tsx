"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineMovieFilter } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

export default function Navbar() {
    const [search, setSearch] = useState("");

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-[#392828] bg-[#181111]/95 backdrop-blur-sm px-4 lg:px-10 py-3">
            {/* Left section */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link href="/" className="flex justify-center items-center gap-4 text-white group">
                    <div className="size-8 text-[#ec1313] group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">
                            <MdOutlineMovieFilter />
                        </span>
                    </div>
                    <h2 className="text-xl font-bold tracking-[-0.015em]">CineBook</h2>
                </Link>

                {/* Navigation links */}
                <nav className="hidden lg:flex items-center gap-9">
                    <Link
                        href="/"
                        className="text-[#ec1313] font-bold text-base leading-normal"
                    >
                        Home
                    </Link>
                    <Link
                        href="/movies"
                        className="text-white hover:text-[#ec1313] transition-colors text-base font-medium"
                    >
                        Movies
                    </Link>
                    <Link
                        href="/about"
                        className="text-white hover:text-[#ec1313] transition-colors text-base font-medium"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-white hover:text-[#ec1313] transition-colors text-base font-medium"
                    >
                        Contact
                    </Link>
                </nav>
            </div>

            {/* Right section */}
            <div className="flex flex-1 justify-end gap-4 lg:gap-6 items-center">
                {/* Search */}
                <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                    <div className="flex w-full h-full items-stretch rounded-lg group focus-within:ring-2 ring-[#ec1313]/50 transition-all">
                        <div className="flex items-center justify-center pl-4 bg-input-bg rounded-l-lg text-text-secondary">
                            <span className="material-symbols-outlined text-[20px]">
                                <IoMdSearch />
                            </span>
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search movies..."
                            className="w-full rounded-r-lg bg-input-bg px-4 pl-2 text-white placeholder:text-text-secondary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="hidden md:block h-6 w-px bg-[#392828]" />

                {/* Auth links */}
                <Link
                    href="/login"
                    className="hidden sm:block text-white hover:text-[#ec1313] transition-colors text-base font-medium"
                >
                    Login
                </Link>

                <Link
                    href="/register"
                    className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-[#ec1313] hover:bg-red-700 transition-colors text-white text-base font-bold shadow-lg hover:shadow-[#ec1313]/20"
                >
                    Register
                </Link>
            </div>
        </header>
    );
}