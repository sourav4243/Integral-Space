"use client";

import { useState } from "react";
import Image from "next/image";
import { Jersey_10 } from "next/font/google";

const pixel = Jersey_10({ subsets: ["latin"], weight: "400" });


const GlitterBurst = ({ x, y }: { x: number; y: number }) => {
  // Generate 10 random particles for the burst
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    angle: (i * 60) + Math.random() * 30, // Spread out in a circle
    distance: 30 + Math.random() * 30,    // Random travel distance
    delay: Math.random() * 0.1,           // Random start time
    scale: 1 + Math.random() * 0.5,     // Random size
    char: ["✦", "★", "✨", "•"][Math.floor(Math.random() * 4)], // Random shape
    color: ["text-yellow-300", "text-cyan-300", "text-pink-300", "text-white"][Math.floor(Math.random() * 4)]
  }));

  return (
    <div 
      className="absolute pointer-events-none z-50" 
      style={{ left: x, top: y }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute text-sm ${p.color}`}
          style={{
            transform: `scale(${p.scale})`,
            animation: `sparkle-fly 1.8s ease-out forwards`,
            animationDelay: `${p.delay}s`,
            // @ts-ignorex
            "--tw-translate-x": `${Math.cos(p.angle * (Math.PI / 180)) * p.distance}px`,
            // @ts-ignore
            "--tw-translate-y": `${Math.sin(p.angle * (Math.PI / 180)) * p.distance}px`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};

export default function ArtistCorner() {
  const TOTAL_SKETCHES = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [glitters, setGlitters] = useState<{id: number, x: number, y: number}[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newGlitter = { id: Date.now(), x, y };
    setGlitters((prev) => [...prev, newGlitter]);

    // Remove the glitter burst after animation (2 second)
    setTimeout(() => {
      setGlitters((prev) => prev.filter((g) => g.id !== newGlitter.id));
    }, 2000);

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev % TOTAL_SKETCHES) + 1);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative mt-4 group cursor-pointer select-none"
    >
      <style jsx global>{`
        @keyframes sparkle-fly {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0);
          }
        }
      `}</style>

      {/* Glitter layer: renders on top of everything */}
      {glitters.map((g) => (
        <GlitterBurst key={g.id} x={g.x} y={g.y} />
      ))}

      {/* Backing Paper */}
      <div className="absolute inset-0 bg-slate-200 rotate-2 rounded-sm border border-gray-400 shadow-sm transition-all duration-300 group-hover:rotate-3"></div>
      
      {/* Main Paper */}
      <div 
        className={`
          relative bg-white p-2 -rotate-1 shadow-xl border border-gray-300 
          flex flex-col items-center transition-all duration-200 ease-in-out
          ${isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100 hover:rotate-0"}
        `}
      >
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200/80 rotate-1 shadow-sm z-10 backdrop-blur-[1px]"></div>

        <div className="w-full bg-slate-50 border border-slate-100 overflow-hidden relative flex justify-center">
             <Image 
                src={`/sketches/skt${currentIndex}.jpg`}
                alt={`Sketch #${currentIndex}`}
                width={500}
                height={0}
                className="w-[18vw] h-auto object-contain"
                priority={currentIndex === 1}
                draggable={false}
             />
        </div>

        <div className={`${pixel.className} text-xl text-slate-800 mt-2 self-start w-full flex justify-between items-end`}>
           <span className="text-slate-600">
             #sketch_{String(currentIndex).padStart(2, '0')}
           </span>
           <span className="text-xs font-sans text-slate-400 mb-1">
             (tap)
           </span>
        </div>
        <div className="absolute bottom-6 right-2 text-xl hover:scale-125 transition-transform z-20 drop-shadow-md">
        ❣️
      </div>
      </div>

      <div className="absolute -bottom-4 right-2 text-3xl hover:scale-125 transition-transform z-20 drop-shadow-md">
        ✨
      </div>
      <div className="absolute -top-2 -left-2 text-2xl -rotate-45 z-20 text-slate-400">
        📎
      </div>

    </div>
  );
}