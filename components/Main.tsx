import Image from "next/image";
import Link from "next/link";
import Clock from "./Clock";
import { Terminal, Heart, Skull, Ghost, TerminalIcon } from "lucide-react"; 

export const Main = ({ onSummon }: { onSummon: () => void }) => {
    return (
        <main className="w-full flex flex-col md:flex-row gap-6">

            <div className="flex flex-row md:flex-col gap-4 p-3 pt-6 bg-slate-900/50 border border-slate-800 items-center h-fit shrink-0">
                <div className="text-[10px] md:-rotate-90 text-slate-600 uppercase tracking-widest whitespace-nowrap mb-0 md:mb-2 select-none">
                    Connect
                </div>

                <Link href="https://github.com/sourav4243" target="_blank" className="group relative w-12 h-12 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/git.png" height={30} width={30} alt="git" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
                <Link href="https://linkedin.com/in/sourav-kumar-56a6482b4" target="_blank" className="group relative w-12 h-12 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/linkedin.png" height={30} width={30} alt="linkedin" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
                <Link href="mailto:souravkumar18835@gmail.com" target="_blank" className="group relative w-12 h-12 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/mail.png" height={30} width={30} alt="mail" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
            </div>
            

            <div className="flex-1 flex flex-col gap-4">                
                <div className="md:col-span-1 h-32 w-full border border-slate-800 bg-slate-900/30 flex flex-col justify-center p-4 relative overflow-hidden select-none">
                    <div className="flex space-x-1 mb-1">
                        <TerminalIcon size={20} className="relative -bottom-1"/>
                        <h1 className="text-lg font-bold">Who am I?</h1>
                    </div>
                    <p className="text-slate-500 text-sm">A developer, sketch artist, and digital architect working on my skills. I code, sketch stuff, and occasionally idle.
                        <br/>This site changes as I work on things and experiment with ideas. The log page reflect that state.
                    </p>
                </div>


                <div className="w-full border-y border-red-900/30 bg-red-950/10 py-1 overflow-hidden relative group cursor-default animate-pulse">
                    <div className="absolute inset-0 bg-scanlines opacity-10"></div>
                    <p className="font-mono text-xs text-red-400/80 text-center uppercase tracking-[0.2em] group-hover:text-red-300 transition-colors">
                        ⚠ "With great power, comes great responsibility" ⚠
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="p-4 border border-slate-800 bg-slate-900/20 flex flex-col gap-3 select-none">
                         <h2 className="text-emerald-400 font-bold text-xs flex items-center gap-2 uppercase tracking-widest">
                            <Heart size={12} /> Liked_Items
                         </h2>
                         <div className="flex flex-wrap gap-2">
                            {['Momos', 'Masala Dosa', 'Photography', 'C++', 'Music', 'Spiderman', 'Sketching', 'Linux', 'Maths'].map(item => (
                                <span key={item} className="px-2 py-1 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 hover:border-emerald-900/70 text-emerald-200 text-[10px] rounded-sm">
                                    + {item}
                                </span>
                            ))}
                         </div>
                    </div>

                    <div className="p-4 border border-slate-800 bg-slate-900/20 flex flex-col gap-3 select-none">
                         <h2 className="text-red-400 font-bold text-xs flex items-center gap-2 uppercase tracking-widest">
                            <Skull size={12} /> System_Errors
                         </h2>
                         <div className="flex flex-wrap gap-2">
                            {['Java', 'Windows', 'Coffee', 'Light Mode', 'Slow Wifi', 'TV Series', 'College-Clubs'].map(item => (
                                <span key={item} className="px-2 py-1 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 hover:border-red-900/70 text-red-300 text-[10px] rounded-sm line-through decoration-red-500/50 decoration-2">
                                    {item}
                                </span>
                            ))}
                         </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 h-30 w-full border border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-400/80"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-400/80"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-400/80"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-400/80"></div>
                         <span className="text-[10px] text-red-400/50 uppercase tracking-widest group-hover:text-red-400">
                            EMERGENCY_OVERRIDE
                         </span>
                         
                         <button
                            onClick={onSummon}
                            className="group relative w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 hover:border-red-500 transition-all shadow-xl active:scale-95 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 rounded-full bg-red-500/20 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                            <Ghost size={24} className="text-slate-400 group-hover:text-red-400 transition-colors" />
                         </button>
                         
                         <span className="text-[10px] group-hover:text-red-400/80 text-red-400/50 transition-colors animate-pulse group-hover:animate-none">
                            [Click to meet someone?]
                         </span>
                    </div>

                    <div className="md:col-span-2 h-30 w-45 relative">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
                        <Clock />
                    </div>
                </div>

                <div className="p-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1 hover:text-cyan-400 cursor-help"><Terminal size={10}/>Hehe</span>
                    </div>
                    <div className="uppercase tracking-wider opacity-50 hover:text-cyan-400">
                        v2.0.4 [Stable]
                    </div>
                </div>
            </div>
        </main>
    );
};