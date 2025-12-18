"use client";

import Image from "next/image";

export default function GifShrine() {
  const gifs = [
    "/gifs/cat-gun.gif",
    "/gifs/happy-cat.gif",
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-slate-600 bg-black p-1 relative shadow-[4px_4px_0px_0px_rgba(71,85,105,0.5)]">
        <div className="bg-indigo-900 text-white text-[10px] px-1 font-mono mb-1 flex justify-between select-none">
          <span>cool_stuff.gif</span>
        </div>
        <div className="flex space-x-0.5">
          <div className="w-fit h-48 flex items-center justify-center bg-slate-900 overflow-hidden relative">
            <Image
              src={gifs[0]}
              alt="shrine left"
              className="flex-1 h-full object-cover opacity-90 hover:opacity-100 transition-opacity rounded-sm"
              height={150}
              width={150}
              draggable="false"
            />

            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] pointer-events-none" style={{ backgroundSize: '100% 2px' }}></div>
          </div>
          <div className="w-fit h-48 flex items-center justify-center bg-slate-900 overflow-hidden relative">
            <Image
              src={gifs[1]}
              alt="shrine left"
              className="flex-1 h-full object-cover opacity-90 hover:opacity-100 transition-opacity rounded-sm"
              height={150}
              width={150}
              draggable="false"
            />

            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] pointer-events-none" style={{ backgroundSize: '100% 2px' }}></div>
          </div>
        </div>

      </div>

    </div>
  );
}