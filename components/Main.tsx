import Image from "next/image";
import Link from "next/link";
import { Terminal, Heart, Skull, Ghost, TerminalIcon, Code2, Cpu } from "lucide-react"; 

export const Main = ({ onSummon }: { onSummon: () => void }) => {
    return (
        <main className="w-full flex flex-col md:flex-row gap-5">

            <div className="flex flex-row md:flex-col gap-4 p-3 pt-6 bg-slate-900/50 border border-slate-800 items-center h-fit shrink-0">
                <div className="text-[10px] md:-rotate-90 text-slate-600 uppercase tracking-widest whitespace-nowrap mb-0 md:mb-2 select-none">
                    Connect
                </div>

                <Link href="https://github.com/sourav4243" target="_blank" className="group relative w-11 h-11 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/git.png" height={27} width={27} alt="git" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
                <Link href="https://linkedin.com/in/sourav-kumar-56a6482b4" target="_blank" className="group relative w-11 h-11 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/linkedin.png" height={27} width={27} alt="linkedin" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
                <Link href="mailto:souravkumar18835@gmail.com" target="_blank" className="group relative w-11 h-11 bg-slate-800 border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg">
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Image src="/mail.png" height={27} width={27} alt="mail" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all grayscale group-hover:grayscale-0" draggable="false"/>
                </Link>
            </div>
            

            <div className="flex-1 flex flex-col gap-3">                
                
                <div className="md:col-span-1 h-fit w-full border border-slate-800 bg-slate-900/30 flex flex-col justify-center p-5 relative overflow-hidden select-none group">
                    
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29371a_1px,transparent_1px),linear-gradient(to_bottom,#1f29371a_1px,transparent_1px)] bg-size-[24px_24px] opacity-20 pointer-events-none"></div>

                    <div className="flex space-x-2 mb-4 items-center text-cyan-500 relative z-10">
                        <TerminalIcon size={18} />
                        <h1 className="text-sm font-bold tracking-wider">Who am I?</h1>
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-row gap-5 items-start">
                            
                            <div className="relative shrink-0">
                                <Link href="https://github.com/sourav4243" target="_blank" className="group/img relative w-24 h-24 bg-slate-900/50 border-2 border-slate-700 hover:border-cyan-500 transition-all flex items-center justify-center shadow-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                                    <Image 
                                        src="/git.png" 
                                        height={60} 
                                        width={60} 
                                        alt="git" 
                                        className="opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-300 grayscale group-hover/img:grayscale-0" 
                                        draggable="false"
                                    />
                                </Link>
                                {/* <div className="absolute -bottom-2 -right-2 bg-slate-800 border border-slate-600 text-[9px] text-cyan-400 px-1.5 py-0.5 font-mono shadow-md">
                                    LVL. 21
                                </div> */}
                            </div>

                            <div className="flex flex-col justify-center pt-1">
                                <h2 className="font-bold text-slate-100 text-3xl tracking-tight mb-2">Sourav Kumar</h2>
                                
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-0.5 bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold font-mono uppercase tracking-wider">
                                        C++ Developer
                                    </span>
                                    <span className="px-2 py-0.5 bg-green-800/20 border border-slate-700 text-green-400/70 text-[10px] font-bold font-mono uppercase tracking-wider">
                                        Web Developer
                                    </span>
                                    <span className="px-2 py-0.5 bg-blue-900/30 border border-slate-700 text-blue-400 text-[10px] font-bold font-mono uppercase tracking-wider">
                                        Sketch Artist
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-[14px] mt-5 leading-relaxed border-t border-slate-800/50 pt-4">
                            A developer, sketch artist, and digital architect working on my skills. I code, sketch stuff, and occasionally idle.
                            <br/><span className="text-slate-600 text-xs mt-2 block font-mono"> This site changes as I work on things. Check logs.</span>
                        </p>
                    </div>
                </div>


                <div className="w-full border-y border-red-900/30 bg-red-950/10 py-1 overflow-hidden relative group cursor-default animate-pulse">
                    <div className="absolute inset-0 bg-scanlines opacity-10"></div>
                    <p className="font-mono text-xs text-red-400/80 text-center uppercase tracking-[0.2em] group-hover:text-red-300 transition-colors">
                        ⚠ "With great power, comes great responsibility" ⚠
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-45 md:col-span-1 h-30 border border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
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

                    {/* Tech Stack Grid (Restored bg-slate-900/20) */}
                    <div className="md:col-span-2 border border-slate-800 bg-slate-900/20 p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10"></div>
                        <h2 className="text-emerald-500 font-bold text-[10px] flex items-center gap-2 uppercase tracking-widest border-b border-emerald-500/10 pb-2 mb-2">
                            <Code2 size={12} /> Tech
                        </h2>
                        <div className="flex flex-wrap gap-2">
                             {['C++', 'Next.js', 'React', 'TypeScript', 'Tailwind', 'Linux', 'Git', 'Docker'].map(item => (
                                <span key={item} className="px-2 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-[11px] font-mono hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-crosshair">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1 hover:text-cyan-400 cursor-help"><Terminal size={10}/>Hehe</span>
                    </div>
                    <div className="uppercase tracking-wider opacity-50 hover:text-cyan-400">
                        v1.0.2 [Stable]
                    </div>
                </div>
            </div>

            {/* Force hide browser scrollbar*/}
            <style>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                html, body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            `}</style>
        </main>
    );
};