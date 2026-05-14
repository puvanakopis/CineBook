'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IoPersonOutline,
    IoPerson,
    IoSettingsOutline,
    IoSettings,
    IoCardOutline,
    IoCard,
    IoShieldOutline,
    IoShield,
    IoLogOutOutline,
    IoTicketOutline,
    IoTicket
} from "react-icons/io5";

const navItems = [
    { name: "My Profile", href: "/profile", icon: IoPersonOutline, activeIcon: IoPerson },
    { name: "My Bookings", href: "/my-bookings", icon: IoTicketOutline, activeIcon: IoTicket },
    { name: "Payment Methods", href: "/payments", icon: IoCardOutline, activeIcon: IoCard },
    { name: "Security", href: "/security", icon: IoShieldOutline, activeIcon: IoShield },
    { name: "Settings", href: "/settings", icon: IoSettingsOutline, activeIcon: IoSettings },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/profile") return pathname === href;
        return pathname?.startsWith(href);
    };

    return (
        <aside className="hidden lg:flex w-72 flex-col gap-10 border-r border-[#392828]  bg-surface-dark p-8 h-[calc(100vh-65px)] sticky top-[65px] z-40">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-6 border-b border-[#392828]/50">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary/30"
                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfK6ZjyVSGXNZcfDWLCCntU3naLJN3ubWzeoJtu2h-xUeocG2sv6FoSvcIRf10jqqPprvVH3bQJJli2_foHY7yps_jZ4nOM2z3kjussiHisO-uN7IdSYH9_yGa173mPucRWe3N0tuvdQQNFyh-qTh3SQ1dsN-zV7dtXDU5-F514iZBcoCBGEUMEfKe9TRp15SV3CGS9FQwoY3G8YxPxgVMABu21YqS4Jf-94XqIx13ubQ6XTMs67ImkCesSy_ixL9uB7srUIJZHfQR")` }}
                        role="img"
                        aria-label="User avatar"
                    />
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-white text-sm font-bold truncate">Alex Doe</h1>
                        <p className="text-text-secondary text-[10px] truncate">alex.doe@example.com</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                    Menu
                </p>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = active ? item.activeIcon : item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 relative group ${active
                                    ? "bg-primary/10 text-white"
                                    : "text-text-secondary hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {active && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(236,19,19,0.5)]" />
                                )}
                                <Icon className={`text-lg transition-transform duration-300 ${active ? "scale-110 text-primary" : "group-hover:scale-110"}`} />
                                <p className={`text-[11px] font-bold uppercase tracking-wider ${active ? "text-white" : ""}`}>
                                    {item.name}
                                </p>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto pt-6 border-t border-[#392828]/50">
                <Link
                    href="/logout"
                    className="flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all group"
                >
                    <IoLogOutOutline className="text-lg group-hover:scale-110 transition-transform" />
                    <p className="text-[11px] font-bold uppercase tracking-wider">Log Out</p>
                </Link>
            </div>
        </aside>
    );
}
