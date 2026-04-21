'use client';

import Link from 'next/link';
import { GALLERY_ROWS } from '@/app/gallery/photos';
import { useState } from 'react';

// A small component representing a single polaroid slice in the stack
function PolaroidSlice({ src, rotation, zIndex, offset }: { src: string, rotation: number, zIndex: number, offset: number }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className="absolute top-0 left-0 bg-[#f0ece0] p-1.5 pb-5 shadow-md border border-slate-300/50 transition-all duration-300 group-hover:shadow-xl"
      style={{
        width: '90px',
        height: '110px',
        transformOrigin: 'bottom center',
        transform: `translateX(${offset}px) translateY(10px) rotate(${rotation}deg)`,
        zIndex,
        boxShadow: zIndex === 3 ? '4px 8px 12px rgba(0,0,0,0.5)' : '2px 4px 8px rgba(0,0,0,0.4)',
      }}
    >
      <div className="w-full h-full bg-[#120a02] overflow-hidden flex items-center justify-center relative">
        {hasError ? (
          <span className="text-2xl opacity-40">📸</span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={src} 
            alt="stack photo" 
            className="w-full h-full object-cover grayscale-[30%] contrast-125"
            onError={() => setHasError(true)}
          />
        )}
        
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] pointer-events-none" />
      </div>
    </div>
  );
}

export default function GalleryStackWidget() {
  // Grab a few photos to show in the stack (now fully powered by Cloudinary)
  const pick1 = GALLERY_ROWS[0]?.[0]?.src || '/placeholder.jpg';
  const pick2 = GALLERY_ROWS[0]?.[1]?.src || '/placeholder.jpg';
  const pick3 = GALLERY_ROWS[1]?.[0]?.src || '/placeholder.jpg';

  return (
    <Link href="/gallery" className="group block w-full relative h-[240px] font-mono border border-slate-800 shadow-md">
      <div className="h-full w-full bg-slate-900/80 p-3 flex flex-col">
        <div className="border border-slate-800 bg-slate-950/50 p-2 rounded-lg flex flex-col items-center justify-center relative h-full overflow-hidden">
          
          <div className="relative w-[90px] h-[110px] mb-4 mt-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] flex justify-center">
            <PolaroidSlice src={pick2} rotation={-20} zIndex={1} offset={-45} />
            <PolaroidSlice src={pick3} rotation={0} zIndex={2} offset={0} />
            <PolaroidSlice src={pick1} rotation={20} zIndex={3} offset={45} />
          </div>

          <div className="text-center w-full z-10 relative">
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-widest border-b border-cyan-500/30 pb-1 mb-1 shadow-sm w-max mx-auto px-2">
              My Gallery
            </h3>
            <p className="text-xs text-slate-400 font-serif italic">
              visit my gallery
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
