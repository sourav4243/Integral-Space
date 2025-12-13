import Link from "next/link";
import { Oxanium, Rubik_Burned, Rubik_Distressed } from "next/font/google";

import { Home, Book, Laptop, PenLine, UserRound, Flame } from "lucide-react";
import Image from "next/image";

const rubicburned = Rubik_Burned({
    subsets: ["latin"],
    weight: "400",
});

const oxanium = Oxanium({
    subsets: ["latin"],
    weight: "400",
})

const rubicdistressed = Rubik_Distressed({
    subsets: ["latin"],
    weight: "400",
})

export const Nav = () => {
    return (
        <nav className="flex flex-col w-full max-w-4xl h-fit justify-center items-center my-4 pt-4 pb-8 px-8 bg-white dark:bg-slate-950/70 opacity-85 border border-gray-400/70">
            <div className="p-2 border border-black bg-slate-800/40 pixel-grid">    
                <Image 
                    src="/Integral-space.jpg"
                    width={850}
                    height={40}
                    alt="banner"
                />
            </div>
            {/* <div className={`${rubicburned.className} w-full flex items-start justify-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl`}>
                INTEGRAL-SPACE
            </div> */}
            <ul className={`${rubicdistressed.className} flex justify-center space-x-3 sm:space-x-5 lg:space-x-5 font-sans text-md sm:text-lg md:text-xl mt-3`}>
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <Home/> */}
                        <Link href="/" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">home</p></Link>
                    </div>
                </li>
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <Book/> */}
                        <Link href="/about" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">about</p></Link>
                    </div>
                </li>
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <Laptop/> */}
                        <Link href="/projects" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">projects</p></Link>
                    </div>
                </li>
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <Flame/> */}
                        <Link href="/modes" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">modes</p></Link>
                    </div>
                </li>  {/*gangadhar and shaktiman here*/}
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <PenLine/> */}
                        <Link href="/log" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">log</p></Link>
                    </div>
                </li>
                <li className="hover:scale-104 hover:font-bold transition-all">
                    <div className="flex space-x-0.5">
                        {/* <UserRound/> */}
                        <Link href="/contact" className="hover:text-white/80"><p className="hover:text-shadow-white/20 text-shadow-sm">contact</p></Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
};