"use client";

import { useEffect, useState } from "react";
import { Jersey_10 } from "next/font/google";

const pixel = Jersey_10({
    subsets: ["latin"],
    weight: "400",
});

export default function Clock() {
    const [time, setTime] = useState<string>("--:--:--");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            // Using en-GB for 24h format which looks more sci-fi, or remove 'en-GB' for 12h
            setTime(now.toLocaleTimeString('en-GB'));
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900/50 border border-slate-800 select-none group">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-cyan-600 transition-colors">
                SYS_LOCAL_TIME
            </span>
            <div 
                className={`${pixel.className} text-4xl md:text-5xl text-cyan-400 tracking-wider leading-none`}
                style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
            >
                {time}
            </div>
            {/* Decorative blinking dot */}
            <div className="flex gap-1 mt-2">
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-75"></div>
            </div>
        </div>
    );
};