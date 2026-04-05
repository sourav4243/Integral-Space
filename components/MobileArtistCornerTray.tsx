"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Paintbrush } from "lucide-react";
import ArtistCorner from "./ArtistCorner";

type MobileArtistCornerTrayProps = {
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
};

export const MobileArtistCornerTray = ({ isExpanded, setIsExpanded }: MobileArtistCornerTrayProps) => {

    return (
        <div className="fixed top-[350px] right-0 z-[90] lg:hidden font-mono select-none flex items-start justify-end">
            <motion.div 
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                onClick={() => { if (!isExpanded) setIsExpanded(true); }}
                className={`bg-[#020617]/95 backdrop-blur-md border border-r-0 border-pink-900/40 shadow-[-8px_0_20px_rgba(0,0,0,0.5)] overflow-hidden ${isExpanded ? "rounded-l-3xl" : "rounded-l-2xl cursor-pointer hover:bg-[#0f172a]"}`}
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
                            <Paintbrush className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            
                            <div className="max-h-[160px] flex-1 overflow-hidden flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] tracking-[0.2em] font-bold text-slate-300 uppercase whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                    MY SKETCHBOOK
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
                            className="w-auto min-w-[280px] max-w-[90vw] flex flex-col p-5 relative text-slate-200"
                        >
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full border border-slate-700 shadow-md z-10 shrink-0"
                            >
                                <ChevronRight size={18} />
                            </button>

                            <div className="flex items-center justify-center mb-4 w-full border-b border-pink-900/30 pb-2 pt-1">
                                <span className="font-mono text-sm font-bold text-white uppercase tracking-widest text-center">
                                    My Sketchbook
                                </span>
                            </div>
                            
                            <div className="flex flex-col items-center w-full pb-4">
                                <ArtistCorner />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
