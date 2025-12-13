"use client";

import { useEffect, useState } from "react";

import { Pixelify_Sans, Jersey_10 } from "next/font/google";

const pixel = Jersey_10({
    subsets: ["latin"],
    weight: "400",
});

export default function Clock() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`${pixel.className} text-3xl opacity-70 tracking-wider`}>{time}</span>
    );
};