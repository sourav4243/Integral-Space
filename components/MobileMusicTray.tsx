"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLastFm } from "@/hooks/useLastFm";
import { ChevronRight, Music } from "lucide-react";

type MobileMusicTrayProps = {
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
};

export const MobileMusicTray = ({ isExpanded, setIsExpanded }: MobileMusicTrayProps) => {
    const { track, loading } = useLastFm();

    return (
        <div className="fixed top-[140px] right-0 z-[100] lg:hidden font-mono select-none flex items-start justify-end">
            <motion.div 
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onClick={() => { if (!isExpanded) setIsExpanded(true); }}
                className={`bg-[#020617]/95 backdrop-blur-md border border-r-0 border-cyan-900/50 shadow-[-8px_0_20px_rgba(0,0,0,0.5)] overflow-hidden ${isExpanded ? "rounded-l-2xl" : "rounded-l-2xl cursor-pointer hover:bg-[#0f172a]"}`}
            >
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        <motion.div 
                            key="collapsed"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.15 }}
                            className="py-6 px-3 flex flex-col items-center gap-4"
                        >
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${track?.isPlaying ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" : "bg-slate-600"}`}></div>
                            
                            <div className="max-h-[140px] flex-1 overflow-hidden flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] tracking-[0.2em] font-bold text-slate-300 uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                    {loading ? "LOADING..." : track?.name || "OFFLINE"}
                                </span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-64 md:w-80 flex flex-col p-4 relative text-slate-200"
                        >
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full border border-slate-700 shadow-md z-10"
                            >
                                <ChevronRight size={18} />
                            </button>
                            
                            <div className="flex flex-col gap-5 items-center w-full mt-2">
                                {/* Album Art */}
                                <div className="w-40 h-40 shrink-0 bg-[#1e1b4b] border-4 border-[#334155] shadow-xl relative overflow-hidden ring-1 ring-black">
                                    {loading ? (
                                        <div className='absolute inset-0 flex items-center justify-center bg-indigo-950'>
                                            <div className='w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin'></div>
                                        </div>
                                    ) : track?.image ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={track.image}
                                                alt={track.album}
                                                fill
                                                className={`object-cover ${!track.isPlaying ? 'grayscale opacity-60' : ''}`}
                                            />
                                        </div>
                                    ) : (
                                        <div className='absolute inset-0 flex flex-col items-center justify-center bg-indigo-950'>
                                            <Music className="text-indigo-400/50 mb-2" size={32} />
                                            <div className='text-[10px] text-center leading-tight text-white font-mono'>NO<br />SIGNAL</div>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex flex-col w-full min-w-0 text-center">
                                    <div className='space-y-1 mb-4'>
                                        <div className='text-[10px] text-slate-400 font-mono tracking-wide uppercase flex items-center justify-center gap-2 mb-2'>
                                            {loading ? "CONNECTING..." : track?.isPlaying ? (
                                                <span className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                                    NOW PLAYING
                                                </span>
                                            ) : (
                                                <span>LAST CONNECTION:</span>
                                            )}
                                        </div>
                                        
                                        {loading ? (
                                            <div className="flex flex-col items-center gap-2 w-full">
                                                <div className="h-4 w-3/4 bg-slate-800 animate-pulse rounded"></div>
                                                <div className="h-3 w-1/2 bg-slate-800 animate-pulse rounded"></div>
                                            </div>
                                        ) : (
                                            <div className='font-mono'>
                                                <div className='text-cyan-200 font-bold text-lg truncate w-full px-2'>
                                                    {track?.name || "OFFLINE"}
                                                </div>
                                                <div className='text-slate-400 text-sm truncate w-full mt-1 px-2'>
                                                    {track?.artist || "Unknown"}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Animated Bars */}
                                    <div className='flex items-end justify-center gap-[4px] h-10 w-full mt-2 border-b border-slate-800/50 pb-2 mb-2'>
                                        {[20, 60, 45, 80, 50, 60, 40, 20, 30, 45, 55, 65, 40, 30, 20, 40, 80].map((height, i) => (
                                            <div
                                                key={i}
                                                className={`w-1.5 opacity-90 rounded-t-sm ${track?.isPlaying ? 'bg-linear-to-t from-cyan-500 via-teal-400 to-indigo-500 animate-music-bar' : 'bg-slate-700 h-1'}`}
                                                style={{
                                                    height: track?.isPlaying ? `${height}%` : '5%',
                                                    animationDelay: `${i * 0.05}s`,
                                                    animationDuration: '0.8s'
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style jsx>{` 
                @keyframes music-bar {
                    0%, 100% {transform: scaleY(1); opacity: 0.8;}
                    50% {transform: scaleY(1.2); opacity: 1;}    
                }   
                .animate-music-bar {
                    transform-origin: bottom;
                    animation: music-bar 1s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};
