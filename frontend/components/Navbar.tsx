"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MdOutlineMovieFilter, MdKeyboardArrowDown, MdPerson, MdEventNote, MdSettings, MdLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const authRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    const [imgError, setImgError] = useState(false);

    const initials = user ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() : "";
    const firstName = user ? `${user.firstName}` : "User";

    const profilePic = user?.profilePicture
        ? (user.profilePicture.startsWith('http')
            ? user.profilePicture
            : `${(process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000').replace(/\/$/, '')}/${user.profilePicture.replace(/^\//, '')}`)
        : null;

    useEffect(() => {
        setMounted(true);
        setImgError(false);
    }, [user?.profilePicture]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (authRef.current && !authRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        router.push("/");
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/movies", label: "Movies" },
        { href: "/theaters", label: "Theaters" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const dropdownItems = [
        { href: "/profile", label: "Profile", icon: <MdPerson className="text-xl" /> },
        { href: "/my-bookings", label: "My Bookings", icon: <MdEventNote className="text-xl" /> },
        { href: "/settings", label: "Settings", icon: <MdSettings className="text-xl" /> },
    ];

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-[#392828] bg-[#181111]/95 backdrop-blur-sm px-10 lg:px-20 py-3">
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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-base font-medium leading-normal transition-colors ${pathname === link.href
                                ? "text-[#ec1313] font-bold"
                                : "text-white hover:text-[#ec1313]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
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
                {mounted && isAuthenticated ? (
                    <div className="relative" ref={authRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="flex items-center gap-2 rounded-xl h-12 px-2 hover:bg-[#2a2323] transition-all duration-300 group"
                        >
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#ec1313] to-[#8a0b0b] flex items-center justify-center text-white font-bold uppercase overflow-hidden shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                                {profilePic && !imgError ? (
                                    <img
                                        src={profilePic}
                                        alt={firstName}
                                        className="h-full w-full object-cover"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <span>{initials || "U"}</span>
                                )}
                            </div>
                            <MdKeyboardArrowDown className={`text-xl text-text-secondary group-hover:text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Redesigned Dropdown */}
                        <div className={`absolute right-0 mt-3 w-72 origin-top-right bg-[#1c1414] border border-[#392828] rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 transform ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                            {/* User Info Header */}
                            <div className="p-5 bg-gradient-to-b from-[#2a1e1e] to-transparent border-b border-[#392828]">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-[#ec1313] flex items-center justify-center text-white font-bold text-lg border border-white/10 overflow-hidden">
                                        {profilePic && !imgError ? (
                                            <img
                                                src={profilePic}
                                                alt={firstName}
                                                className="h-full w-full object-cover"
                                                onError={() => setImgError(true)}
                                            />
                                        ) : (
                                            initials || "U"
                                        )}
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-white font-bold truncate text-base">{firstName}</span>
                                        <span className="text-text-secondary text-xs truncate">{user?.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                {dropdownItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-5 py-3 text-sm text-text-secondary hover:text-white hover:bg-[#2a1e1e] transition-all duration-200 group"
                                    >
                                        <span className="p-2 rounded-lg bg-[#2a2323] group-hover:bg-[#ec1313] group-hover:text-white transition-colors">
                                            {item.icon}
                                        </span>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-[#392828] mx-4" />

                            {/* Logout Section */}
                            <div className="p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:text-white hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
                                >
                                    <span className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500 transition-colors">
                                        <MdLogout className="text-xl" />
                                    </span>
                                    <span className="font-bold uppercase tracking-wider text-xs">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-[#ec1313] hover:bg-red-700 transition-colors text-white text-base font-bold shadow-lg hover:shadow-[#ec1313]/20"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Navbar;