import React from 'react';

export const MusicPlayer = () => {
    return (
        <div className=' w-full bg-slate-950'>
            <div
                className='relative w-full bg-[#0f172a] text-slate-200 select-none'
                style={{
                    boxShadow: `
                        inset 1px 1px 0px 0px #475569,
                        inset -1px -1px 0px 0px #020617,
                        0 0 0 2px #1e293b,
                        0 0 0 4px #020617  
                    `
                }}
            >
                {/* header */}
                <div className='flex justify-between items-center bg-[#1e293b] px-2 py-1 border-b-2 border-[#020617]'>
                    <span className='font-mono text-xs tracking-wider text-slate-300 font-bold ml-1'>
                        Music
                    </span>

                    <div className='flex gap-0.5'>
                        <div className='w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-end justify-center pb-0.5 cursor-pointer hover:bg-[#475569]'>
                            <div className='w-2 h-[1.2px] bg-slate-400'></div>
                        </div>
                        <div className='w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-center justify-center cursor-pointer hover:bg-[#475569]'>
                            <div className='w-2 h-2 border-[1.5px] border-slate-400'></div>
                        </div>
                        <div className='w-4 h-4 bg-[#334155] border border-[#0f172a] flex items-center justify-center cursor-pointer hover:bg-red-900 group'>
                            <span className='text-[16px] leading-none text-slate-400 group-hover:text-white relative -top-3px font-extrabold'>×</span>
                        </div>
                    </div>
                </div>


                <div className='p-4 flex gap-5'>

                    <div className='relative shrink-0'>
                        <div className='w-28 h-28 bg-[#1e1b4b] border-4 border-[#334155] shadow-lg relative overflow-hidden group'>
                            <div className='absolute inset-0 flex flex-col items-center justify-center bg-indigo-950'>
                                <div className='w-12 h-12 rounded-full bg-indigo-500 blur-[1px] mb-2 opacity-80'></div>
                                <div className='w-full h-1/2 bg-linear-to-t from-indigo-900 to-transparent absolute bottom-0'></div>
                                {/* Text overlay on album*/}
                                <div className='absolute top-2 text-[8px] text-indigo-200 tracking-widest opacity-70'>SONU NIGAM</div>
                                <div className='absolute bottom-2 text-[8px] text-center leading-tight text-white font-mono'>KOI<br />TUMSA NAHI</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 min-w-0 justify-between py-1'>
                        <div className='space-y-1'>
                            <div className='text-[10px] text-slate-400 font-mono tracking-wide uppercase'>
                                Now Playing:
                            </div>
                            <div className='font-mono text-sm text-cyan-50 truncate'>
                                <span className='text-cyan-200 font-bold'>KOI TUMSA NAHI</span>
                                <span className='text-slate-500 mx-2'>-</span>
                                <span className='text-slate-400'>SONU NIGAM</span>
                            </div>
                        </div>

                        <div className='flex items-end gap-[3px] h-12 mt-3 pb-1 border-b border-slate-800/50'>
                            {[40, 60, 45, 70, 90, 60, 50, 40, 30, 45, 55, 65, 50, 40, 30, 20, 15, 10].map((height, i) => (
                                <div
                                    key={i}
                                    className='w-2 bg-linear-to-t from-cyan-500 via-teal-400 to-indigo-500 opacity-90 animate-music-bar'
                                    style={{
                                        height: `${height}%`,
                                        animationDelay: `${i * 0.05}s`,
                                        animationDuration: '0.8s'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style>{` 
                @keyframes music-bar {
                0%, 100% {transform: scaleY(1); opacity: 0.8;}
                50% {transform: scaleY(1.2); opacity: 1;}    
            }   
            .animate-music-bar {
                transition-origin: bottom;
                animation: music-bar 1s infinite ease-in-out;
            }
            `}</style>
        </div>
    );
};