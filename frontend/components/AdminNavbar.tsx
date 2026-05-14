"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const AdminNavbar = () => {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const authRef = useRef<HTMLDivElement | null>(null);

    const initials = user ? `${user.firstName?.[0] ?? ""}`.toUpperCase() : "";

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
        router.push("/admin/login");
    };

    const navLinks = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/movies", label: "Movies" },
        { href: "/admin/theaters", label: "Theaters" },
        { href: "/admin/bookings", label: "Bookings" },
        { href: "/admin/users", label: "Users" },
    ];

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-[#392828] bg-[#181111]/95 backdrop-blur-sm px-10 lg:px-20 py-3">
            {/* Left section */}
            <div className="flex items-center gap-8">
                {/* Admin Logo */}
                <Link href="/admin" className="flex items-center gap-4 text-white group">
                    <div className="size-8 text-[#ec1313] group-hover:scale-110 transition-transform">
                        <MdOutlineAdminPanelSettings className="text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold tracking-[-0.015em]">
                        CineBook Admin
                    </h2>
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
                            <IoMdSearch className="text-[20px]" />
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search admin data..."
                            className="w-full rounded-r-lg bg-input-bg px-4 pl-2 text-white placeholder:text-text-secondary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="hidden md:block h-6 w-px bg-[#392828]" />

                {/* Admin Actions */}
                {!isAuthenticated ? (
                    <Link
                        href="/admin/login"
                        className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-[#ec1313] hover:bg-red-700 transition-colors text-white text-base font-bold shadow-lg hover:shadow-[#ec1313]/20"
                    >
                        Login
                    </Link>
                ) : (
                    <div className="relative" ref={authRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="flex items-center gap-3 rounded-lg h-10 px-3 transition-colors text-white"
                        >
                            <div className="h-10 w-10 rounded-full bg-[#2a2323] flex items-center justify-center text-white font-bold uppercase overflow-hidden">
                                {initials || "A"}
                            </div>
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-52 bg-[#181111] border border-[#392828] rounded-md shadow-lg z-50">
                                <Link href="/admin" className="block px-4 py-2 text-sm text-white hover:bg-[#241818]">Dashboard</Link>
                                <Link href="/admin/theaters" className="block px-4 py-2 text-sm text-white hover:bg-[#241818]">Theaters</Link>
                                <Link href="/admin/movies" className="block px-4 py-2 text-sm text-white hover:bg-[#241818]">Movies</Link>
                                <Link href="/admin/bookings" className="block px-4 py-2 text-sm text-white hover:bg-[#241818]">Bookings</Link>
                                <Link href="/admin/users" className="block px-4 py-2 text-sm text-white hover:bg-[#241818]">Users</Link>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#241818]">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default AdminNavbar;