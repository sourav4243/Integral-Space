"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Spiderman({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-100 pointer-events-none flex justify-center items-start">
      
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        exit={{ y: -1000 }}
        transition={{ type: "spring", damping: 12, stiffness: 50 }}
        className="relative pointer-events-auto cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        whileTap={{ scale: 1.1 }}
      >
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-[200vh] bg-slate-300/80"></div>
        
        <div className="relative">
            <div className="absolute -right-24 top-10 text-[10px] text-slate-400 bg-slate-900/80 p-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                (drag me!)
            </div>
            
            <Image
            src="/spiderman.png"
            alt="Spiderman"
            width={300}
            height={300}
            className="drop-shadow-2xl select-none"
            draggable="false"
            priority
            />

            <button 
                onClick={onClose}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-red-400 hover:text-red-300 hover:underline bg-black/50 px-2 rounded"
            >
                [Pew-Pew]
            </button>
        </div>
      </motion.div>
    </div>
  );
}