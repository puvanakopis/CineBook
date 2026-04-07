"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CineBotChat from "@/components/CineBotChat";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";

interface RouteGuardProps {
    children: ReactNode;
}

const ALLOWED_PATHS = {
    admin: [
        "/admin",
        "/admin/bookings",
        "/admin/movies",
        "/admin/reports",
        "/admin/users",
    ],
    user: [
        "/",
        "/about",
        "/contact",
        "/theaters",
        "/theaters/:id",
        "/movies",
        "/movies/:id",
        "/profile",
        "/my-bookings",
        "/payment",
        "/payments",
        "/select-seats",
        "/settings",
        "/security",
        "/tickets",
    ],
    guest: [
        "/",
        "/login",
        "/forgot-password",
        "/about",
        "/contact",
        "/theaters",
        "/theaters/:id",
        "/movies",
        "/movies/:id",
    ],
};


export default function RouteGuard({ children }: RouteGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();

    const isPathAllowed = (path: string, allowedPaths: string[]) => {
        return allowedPaths.some((allowed) => {
            if (allowed.includes(":id")) {
                const basePath = allowed.split("/:id")[0];
                return path.startsWith(basePath);
            }
            return path === allowed;
        });
    };

    useEffect(() => {
        if (isLoading) return;

        const role = user?.role ?? "guest";

        const allowedPathsForRole = ALLOWED_PATHS[role];

        if (!isPathAllowed(pathname, allowedPathsForRole)) {
            if (role === "admin") {
                router.replace("/admin");
            } else if (role === "user") {
                router.replace("/");
            } else {
                router.replace("/login");
            }
        }
    }, [isAuthenticated, isLoading, pathname, user, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    const showCineBot =
        !pathname.startsWith("/login") &&
        !pathname.startsWith("/forgot-password") &&
        !(user?.role === "admin" && pathname.startsWith("/admin"));

    // Render admin layout
    if (user?.role === "admin" && pathname.startsWith("/admin")) {
        return (
            <div className="min-h-screen flex bg-[#090505] text-white">
                <AdminSidebar />
                <main className="flex-1 bg-[#0f0b0b] min-h-screen">{children}</main>
            </div>
        );
    }

    // Render guest or user layout
    return (
        <>
            {pathname.startsWith("/login") || pathname.startsWith("/forgot-password") ? null : <Navbar />}
            <main className="min-h-screen bg-[#0b0909] text-white">{children}</main>
            {pathname.startsWith("/login") || pathname.startsWith("/forgot-password") ? null : <Footer />}
            {showCineBot && <CineBotChat />}
        </>
    );
}