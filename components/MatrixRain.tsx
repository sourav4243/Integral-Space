"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∫∂λφπΣΩ<>";

export default function RetroMatrixTerminal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // This creates the "trails" behind the letters
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22d3ee"; // Cyan-400 
      ctx.font = `${fontSize}px monospace`;
      
      // 3. Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        
        // Randomly brighten some characters for "glint" effect
        if (Math.random() > 0.98) {
           ctx.fillStyle = "#ccfbf1";
        } else {
           ctx.fillStyle = "#0ea5e9";
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      
      {/* retro window container */}
      <div 
        className="relative w-full h-[300px] md:h-full min-h-[300px] bg-[#0f172a] flex flex-col"
        style={{
          boxShadow: `
            inset 1px 1px 0px 0px #475569,
            inset -1px -1px 0px 0px #020617,
            0 0 0 2px #1e293b,
            0 0 0 4px #020617
          `
        }}
      >
        
        <div className="flex justify-between items-center bg-[#1e293b] px-2 py-1 border-b-2 border-[#020617] shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full"></div>
             <span className="font-mono text-xs tracking-wider text-slate-300 font-bold select-none">
               System_Log.exe
             </span>
          </div>
          
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-end justify-center pb-0.5 cursor-pointer hover:bg-[#475569]">
              <div className="w-2 h-[1.2px] bg-slate-400"></div>
            </div>
            <div className="w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-center justify-center cursor-pointer hover:bg-[#475569]">
               <div className="w-2 h-2 border-[1.5px] border-slate-400"></div>
            </div>
            <div className="w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-center justify-center group cursor-pointer hover:bg-red-900">
               <span className="text-[16px] leading-none text-slate-400 group-hover:text-white relative -top-3px font-extrabold">×</span>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative flex-1 bg-[#020617] overflow-hidden p-1">
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[:100%_4px,3px_100%]"></div>
          
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full opacity-80"
          />

          <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-cyan-700 bg-slate-950 select-none">
             <span className="animate-pulse">_CONNECTING TO INTEGRAL SPACE...</span>
          </div>
        </div>

      </div>
    </div>
  );
};