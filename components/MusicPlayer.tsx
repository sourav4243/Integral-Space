"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type TrackData = {
    isPlaying: boolean;
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
} | null;

export const MusicPlayer = () => {
    const [track, setTrack] = useState<TrackData>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;
                const USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME;

                if (API_KEY === process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
                    console.warn("Last.fm API Key missing");
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
                );
                const data = await res.json();
                const latest = data.recenttracks.track[0];

                setTrack({
                    isPlaying: latest["@attr"]?.nowplaying === "true",
                    name: latest.name,
                    artist: latest.artist["#text"],
                    album: latest.album["#text"],
                    image: latest.image[2]["#text"],
                    url: latest.url,
                });
            } catch (error) {
                console.error("Error fetching music:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMusic();
        const interval = setInterval(fetchMusic, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full bg-slate-950'>
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
                            {loading ? (
                                // Loading Placeholder
                                <div className='absolute inset-0 flex items-center justify-center bg-indigo-950'>
                                    <div className='w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin'></div>
                                </div>
                            ) : track?.image ? (
                                // Real Album Art
                                <div className="relative w-full h-full">
                                    <Image
                                        src={track.image}
                                        alt={track.album}
                                        fill
                                        className={`object-cover ${!track.isPlaying ? 'grayscale opacity-60' : ''}`}
                                    />
                                    {/* Text Overlay (Only shows if image fails or just for aesthetic) */}
                                    <div className='w-full h-1/2 bg-linear-to-t from-black/80 to-transparent absolute bottom-0'></div>
                                </div>
                            ) : (
                                // Fallback CSS Art (If no image found)
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-indigo-950'>
                                    <div className='w-12 h-12 rounded-full bg-indigo-500 blur-[1px] mb-2 opacity-80'></div>
                                    <div className='w-full h-1/2 bg-linear-to-t from-indigo-900 to-transparent absolute bottom-0'></div>
                                    <div className='absolute bottom-2 text-[8px] text-center leading-tight text-white font-mono'>NO<br />SIGNAL</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Track Info Section */}
                    <div className='flex flex-col flex-1 min-w-0 justify-between py-1'>
                        <div className='space-y-1'>
                            <div className='text-[10px] text-slate-400 font-mono tracking-wide uppercase flex items-center gap-2'>
                                {loading ? "CONNECTING..." : track?.isPlaying ? (
                                    <span className="text-cyan-400 animate-pulse">● NOW PLAYING</span>
                                ) : (
                                    <span>LAST PLAYED:</span>
                                )}
                            </div>
                            
                            {loading ? (
                                <div className="h-4 w-32 bg-slate-800 animate-pulse rounded"></div>
                            ) : (
                                <div className='font-mono text-sm text-cyan-50 truncate'>
                                    <Link 
                                        href={track?.url || '#'} 
                                        target="_blank"
                                        className='text-cyan-200 font-bold hover:underline hover:text-cyan-400 transition-colors'
                                    >
                                        {track?.name || "OFFLINE"}
                                    </Link>
                                    <span className='text-slate-500 mx-2'>-</span>
                                    <span className='text-slate-400'>{track?.artist || "Unknown"}</span>
                                </div>
                            )}
                        </div>
                        <div className='flex items-end gap-[3px] h-12 mt-3 pb-1 border-b border-slate-800/50'>
                            {[40, 60, 45, 70, 90, 60, 50, 40, 30, 45, 55, 65, 50, 40, 30, 20, 15, 10].map((height, i) => (
                                <div
                                    key={i}
                                    className={`w-2 opacity-90 ${track?.isPlaying ? 'bg-linear-to-t from-cyan-500 via-teal-400 to-indigo-500 animate-music-bar' : 'bg-slate-700 h-0.5'}`}
                                    style={{
                                        height: track?.isPlaying ? `${height}%` : '5%', // Flat line if not playing
                                        animationDelay: `${i * 0.05}s`,
                                        animationDuration: '0.8s'
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

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