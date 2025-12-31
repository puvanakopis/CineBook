"use client";

import { usePathname } from "next/navigation";
import CineBotChat from "./CineBotChat";

export default function RootClientWrapper() {
    const pathname = usePathname();
    const shouldShowCineBotChat = pathname !== "/login";

    return <>
        {shouldShowCineBotChat && <CineBotChat />}
    </>;
}