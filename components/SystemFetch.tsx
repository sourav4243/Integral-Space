"use client";

import { useState, useEffect } from "react";

const SystemFetch = () => {
  // Simulating a live uptime counter based on your data
  // Base: 2h 42m
  const [uptime, setUptime] = useState(162); // minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="w-full font-mono text-xs select-none">
      
      {/* 1. The Header: User@Host */}
      <div className="flex items-center gap-2 mb-3 border-b border-emerald-900/50 pb-2">
        <span className="text-emerald-400 font-bold">sourav@manjaro</span>
        <span className="text-slate-600">~</span>
        <span className="bg-emerald-500/10 text-emerald-300 px-1 rounded text-[10px]">
          HYPRLAND
        </span>
      </div>

      {/* 2. The Split Layout: Logo vs Stats */}
      <div className="flex gap-4 items-start">
        
        {/* LEFT: The Manjaro Block Logo (CSS Gradient Text) */}
        <div className="hidden xl:block text-[10px] leading-[1.1] font-bold text-transparent bg-clip-text bg-linear-to-b from-emerald-400 to-cyan-600 opacity-90">
          <pre>{`
██████████████████  ████████
██████████████████  ████████
██████████████████  ████████
██████████████████  ████████
████████            ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
████████  ████████  ████████
        `}</pre>
        </div>

        {/* RIGHT: The Stats Grid */}
        <div className="flex-1 space-y-1.5">
          
          {/* OS */}
          <div className="flex justify-between">
            <span className="text-emerald-700 font-bold">OS</span>
            <span className="text-slate-300">Manjaro 25.0.10</span>
          </div>

          {/* Kernel */}
          <div className="flex justify-between">
            <span className="text-emerald-700 font-bold">KER</span>
            <span className="text-slate-400">6.12.48-1</span>
          </div>

          {/* Uptime */}
          <div className="flex justify-between group">
            <span className="text-emerald-700 font-bold">UP</span>
            <span className="text-emerald-200 group-hover:animate-pulse">
              {formatUptime(uptime)}
            </span>
          </div>

          {/* Shell */}
          <div className="flex justify-between">
            <span className="text-emerald-700 font-bold">SH</span>
            <span className="text-slate-300">fish 4.2.1</span>
          </div>

          {/* CPU (Truncated for space) */}
          <div className="flex justify-between">
            <span className="text-emerald-700 font-bold">CPU</span>
            <span className="text-slate-400">i5-13500H</span>
          </div>

          {/* Memory Bar Visualization */}
          <div className="pt-1">
             <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
               <span>RAM</span>
               <span>9.1 GiB / 15.6 GiB</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded-sm overflow-hidden">
               {/* 9197 / 15613 = ~59% */}
               <div className="h-full bg-linear-to-r from-emerald-600 to-cyan-500 w-[59%] relative">
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
               </div>
             </div>
          </div>

          {/* Disk Bar Visualization */}
          <div className="pt-1">
             <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
               <span>DISK</span>
               <span>90G / 116G</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded-sm overflow-hidden">
               {/* 82% */}
               <div className="h-full bg-amber-700 w-[82%]"></div>
             </div>
          </div>

          {/* The "Distro" Flex */}
          <div className="mt-2 pt-2 border-t border-dashed border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 mr-2">BASE:</span>
            <span className="text-cyan-400 font-bold tracking-widest">ARCH_LINUX</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemFetch;