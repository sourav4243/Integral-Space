"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Nav } from "@/components/Nav";
import { Main } from "@/components/Main";
import CodingStats from "@/components/CodingStats";
import { MusicPlayer } from "@/components/MusicPlayer";
import GifShrine from "@/components/GifShrine";
import ArtistCorner from "@/components/ArtistCorner";
import Spiderman from "@/components/Spiderman";
import Image from "next/image";
import Link from "next/link";
import { MobileMusicTray } from "@/components/MobileMusicTray";
import { MobileArtistCornerTray } from "@/components/MobileArtistCornerTray";

export default function Home() {

  const [isSpideyHere, setIsSpideyHere] = useState(false);
  const [activeMobileTray, setActiveMobileTray] = useState<'none' | 'music' | 'artist'>('none');

  return (
    <div className="relative overflow-y-auto h-full w-full bg-slate-950 font-mono text-slate-200 selection:bg-pink-500 selection:text-slate-900">

      <AnimatePresence>
        {isSpideyHere && <Spiderman onClose={() => setIsSpideyHere(false)} />}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,6px_100%]" />

      <div className="relative z-10 h-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col col-span-3 gap-6 h-full overflow-hidden scrollbar-none pb-10">
          <div className="min-h-[380px] w-full shrink-0 border border-slate-800 bg-slate-900/80 shadow-md">
            <CodingStats />
          </div>

          <div className="shrink-0 transform hover:scale-[1.02] transition-transform duration-300 relative">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="font-mono text-md font-bold text-white uppercase tracking-widest border-b-2 border-red-400/20 pb-1 w-full">
                My Sketchbook
              </span>
              <span className="font-mono text-sm text-blue-300/80 underline"><Link href="https://www.instagram.com/art.sourav.19/" target="_blank">@art.sourav.19</Link></span>
            </div>
            <ArtistCorner />
          </div>
          <div className="p-4 border-l-2 border-slate-700 bg-slate-900/30 text-[15px] text-slate-500 font-serif italic">
            "Does this page feels Janky? Well..I missed the part where that's my problem" iykyk
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="col-span-1 lg:col-span-6 flex flex-col h-full overflow-auto">
          <div className="shrink-0">
            <Nav />
          </div>

          <div className="overflow-y-auto bg-slate-900/80 p-5 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border border-slate-800">
            <Main onSummon={() => setIsSpideyHere(prev => !prev)} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden lg:flex flex-col col-span-3 gap-4 h-full overflow-none scrollbar-none pb-10">
          <div className="w-full shrink-0 relative">
            <MusicPlayer />
          </div>
          <div className="w-fit shrink-0">
            <GifShrine />
          </div>

          <div className="flex space-x-3">
            {/* Bully maguire */}
            <div className="w-fit shrink-0 mt-1 border bg-amber-300">
              <Image
                src="/gifs/bullymaguire.gif"
                width={150}
                height={150}
                alt="bully maguire"
                unoptimized
                draggable="false"
              />
            </div>
            {/* Momo */}
            {/* <div className="w-fit shrink-0 mt-1 flex flex-col items-center border bg-sky-400 p-4">
              <Image
                src="/gifs/momo.gif"
                width={130}
                height={130}
                alt="love momo"
                unoptimized
                draggable="false"
              />
              <p className="text-xs relative -bottom-2 text-slate-600 font-bold select-none">Love Momo 💕</p>
            </div> */}
          </div>
        </div>

      </div>

      {/* MOBILE EDGE TRAYS - Exclusive State Wrapper */}
      {activeMobileTray !== 'none' && (
        <div
          className="fixed inset-0 z-80 lg:hidden"
          onClick={() => setActiveMobileTray('none')}
          aria-hidden="true"
        />
      )}
      <MobileMusicTray
        isExpanded={activeMobileTray === 'music'}
        setIsExpanded={(val) => setActiveMobileTray(val ? 'music' : 'none')}
      />
      <MobileArtistCornerTray
        isExpanded={activeMobileTray === 'artist'}
        setIsExpanded={(val) => setActiveMobileTray(val ? 'artist' : 'none')}
      />

      <style>{`
        ::-webkit-scrollbar {
            display: none;
        }
        html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
            background-color: #020618;
        }
      `}</style>
    </div>
  );
};