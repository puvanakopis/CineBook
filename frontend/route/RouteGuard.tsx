"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CineBotChat from "@/components/CineBotChat";
import { AdminSidebar } from "@/components/AdminSidebar";

interface RouteGuardProps {
    children: ReactNode;
}

const authPaths = ["/login", "/forgot-password"];

export default function RouteGuard({ children }: RouteGuardProps) {
    const pathname = usePathname();

    const isAuthPage = authPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    const isAdminPage = pathname.startsWith("/admin");

    const showCineBot = !isAuthPage && !isAdminPage;

    if (isAdminPage) {
        return (
            <div className="min-h-screen flex bg-[#090505] text-white">
                <AdminSidebar />
                <main className="flex-1 bg-[#0f0b0b] min-h-screen">
                    {children}
                </main>
            </div>
        );
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0b0909] text-white">{children}</main>
            <Footer />
            {showCineBot ? <CineBotChat /> : null}
        </>
    );
}
