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
        <aside className="hidden lg:flex w-72 flex-col gap-6 border-r border-[#392828] bg-surface-dark/30 p-6 h-[calc(100vh-65px)] sticky top-[65px]">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-4 border-b border-[#392828]">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-primary/30"
                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfK6ZjyVSGXNZcfDWLCCntU3naLJN3ubWzeoJtu2h-xUeocG2sv6FoSvcIRf10jqqPprvVH3bQJJli2_foHY7yps_jZ4nOM2z3kjussiHisO-uN7IdSYH9_yGa173mPucRWe3N0tuvdQQNFyh-qTh3SQ1dsN-zV7dtXDU5-F514iZBcoCBGEUMEfKe9TRp15SV3CGS9FQwoY3G8YxPxgVMABu21YqS4Jf-94XqIx13ubQ6XTMs67ImkCesSy_ixL9uB7srUIJZHfQR")` }}
                        role="img"
                        aria-label="User avatar"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-normal">Alex Doe</h1>
                        <p className="text-text-secondary text-xs font-normal leading-normal">alex.doe@example.com</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 mt-2">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = active ? item.activeIcon : item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${active
                                    ? "bg-primary text-white shadow-[0_0_15px_rgba(236,19,19,0.3)]"
                                    : "hover:bg-[#291e1e] group"
                                    }`}
                            >
                                <Icon className={`text-xl ${!active ? "text-text-secondary group-hover:text-white transition-colors" : ""}`} />
                                <p className={`text-sm font-medium leading-normal ${!active ? "text-text-secondary group-hover:text-white transition-colors" : ""}`}>
                                    {item.name}
                                </p>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto">
                <Link
                    href="/logout"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#291e1e] text-red-400 hover:text-red-500 transition-colors"
                >
                    <IoLogOutOutline className="text-xl" />
                    <p className="text-sm font-medium leading-normal">Log Out</p>
                </Link>
            </div>
        </aside>
    );
}