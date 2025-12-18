"use client"

import Link from "next/link";
import Image from "next/image";
import { Rubik_Distressed } from "next/font/google";

const rubicdistressed = Rubik_Distressed({
    subsets: ["latin"],
    weight: "400"
});

export const Nav = () => {
    return (
        <nav
            className="flex flex-col w-full h-fit items-center mb-6 p-5 bg-slate-900/80 backdrop-blur-sm select-none"
            style={{
                boxShadow: 'inset 0 0 0 1px #1e293b, 0 4px 6px -1px rgba(0, 0, 0, 0.5)'
            }}
        >

            <div className="p-1 border border-slate-700 bg-black/50 w-full max-w-[850px] mb-4 relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-size-[100%_4px] pointer-events-none z-10 opacity-50"></div>
                <Image
                    src="/Integral-space.jpg"
                    width={850}
                    height={35}
                    alt="banner"
                    className="w-full h-auto opacity-90"
                    draggable="false"
                    priority
                />
            </div>

            <ul className={`${rubicdistressed.className} flex flex-wrap justify-center gap-4 sm:gap-8 text-xl sm:text-2xl`}>
                {[
                    { name: 'home', path: '/' },
                    { name: 'projects', path: '/projects' },
                    { name: 'log', path: '/logs' },
                ].map((item) => (
                    <li key={item.name} className="group relative">
                        <Link href={item.path} className="block relative px-2 py-0 text-slate-400 transition-all duration-300 group-hover:text-cyan-400 hover:scale-105">
                            <span className="relative z-10 text-shadow-sm group-hover:text-shadow-glow underline">
                                {item.name}
                            </span>
                            {/* hover */}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .text-shadow-glow {
                    text-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
                }
            `}</style>
        </nav>
    );
};