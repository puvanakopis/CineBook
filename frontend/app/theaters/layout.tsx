"use client";

import React from "react";
import { TheaterProvider } from "@/contexts/theaterContext";

interface Props {
    children: React.ReactNode;
}

export default function TheatersLayout({ children }: Props) {
    return <TheaterProvider>{children}</TheaterProvider>;
}
