"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Bangers, Kalam, Luckiest_Guy } from "next/font/google";
import { ArrowLeft, ExternalLink, Github, FileVideo, Cpu, Layers, Terminal, Smartphone, Network, Database, Music, Wallet } from "lucide-react";
import { useSpideyAudio } from "../../hooks/spidey-audio";

const bangers = Bangers({ weight: "400", subsets: ["latin"] });
const kalam = Kalam({ weight: ["400", "700"], subsets: ["latin"] });
const luckiest = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

// project data
const projects = [
    {
        id: 0,
        title: "sift-video",
        desc: "Semantic video search system that indexes audio and visual content to enable timestamp-accurate retrieval inside videos using natural language queries.",
        tech: ["C++", "Rust", "FFmpeg", "whisper.cpp", "CLIP", "VectorDB", "Docker"],
        status: "RUNNING",
        type: "SYSTEMS",
        links: { github: "https://github.com/sourav4243/sift-video", demo: "" },
        icon: <FileVideo size={36} />
    },
    {
        id: 1,
        title: "CHIP8_Emulator",
        desc: "A low-level CHIP-8 virtual machine implemented from scratch in C++. Includes full CPU emulation, opcode decoding, memory/register management, timers, input handling, and SDL-based rendering.",
        tech: ["C++", "SDL3", "Bitwise Operations", "Emulation"],
        status: "COMPLETED",
        type: "SYSTEMS",
        links: { github: "https://github.com/sourav4243/chip8-emulator", demo: "" },
        icon: <Cpu size={36} />
    },
    {
        id: 2,
        title: "Ray_Tracer",
        desc: "A physically-based rendering engine built from scratch in C++. Features BVH acceleration, global illumination, and material systems.",
        tech: ["C++", "Linear Algebra"],
        status: "RUNNING",
        type: "ENGINEERING",
        links: { github: "https://github.com/sourav4243/rayTracer", demo: "" },
        icon: <Cpu size={36} />
    },
    {
        id: 3,
        title: "TheFlowMind",
        desc: "Collaborative mind-mapping tool with a digital canvas. Real-time syncing and infinite whiteboard capabilities.",
        tech: ["Next.js", "Liveblocks", "Convex", "Tailwind"],
        status: "COMPLETED",
        type: "WEB_APP",
        links: { github: "https://github.com/sourav4243/TheFlowMind", demo: "https://the-flow-mind.vercel.app/" },
        icon: <Layers size={36} />
    },
    {
        id: 4,
        title: "Integral_Space",
        desc: "The retro portfolio you are looking at right now. Designed as a web-based operating system.",
        tech: ["Next.js", "Framer Motion", "TypeScript"],
        status: "LIVE",
        type: "FRONTEND",
        links: { github: "https://github.com/sourav4243", demo: "/" },
        icon: <Terminal size={36} />
    },
    {
        id: 5,
        title: "MyKeyboard",
        desc: "A custom Android keyboard built with Kotlin. Focuses on privacy, speed, and custom layout configurations.",
        tech: ["Kotlin", "Android SDK", "XML"],
        status: "ARCHIVED",
        type: "MOBILE",
        links: { github: "https://github.com/sourav4243/myKeyboard", demo: "" },
        icon: <Smartphone size={36} />
    },
    {
        id: 6,
        title: "Federated_Learning",
        desc: "A simulation framework demonstrating privacy-preserving AI training. Models are trained locally on independent nodes and aggregated globally without data sharing.",
        tech: ["Python", "Scikit-Learn", "XGBoost", "Next.js"],
        status: "COMPLETED",
        type: "AI_RESEARCH",
        links: { github: "https://github.com/sourav4243/federated-learning-simulation", demo: "" },
        icon: <Network size={36} />
    },
    {
        id: 7,
        title: "CineMaa",
        desc: "A content-based movie recommendation system. Uses vectorization and cosine similarity to analyze metadata and suggest similar films.",
        tech: ["Python", "Jupyter", "Scikit-Learn"],
        status: "COMPLETED",
        type: "AI_ML",
        links: { github: "https://github.com/sourav4243/CineMaa", demo: "" },
        icon: <Database size={36} />
    },
    {
        id: 8,
        title: "Music_Player",
        desc: "A lightweight, offline audio player focusing on minimalism and high-fidelity playback.",
        tech: ["HTML", "CSS", "Vanilla JS"],
        status: "COMPLETED",
        type: "MEDIA",
        links: { github: "https://github.com/sourav4243/A-Music-Player", demo: "" },
        icon: <Music size={36} />
    },
    {
        id: 9,
        title: "PennyWise",
        desc: "A smart expense tracker application designed to help users manage finances, visualize spending habits, and plan budgets effectively.",
        tech: ["Kotlin", "Android SDK", "Firebase", "Gemini-AI"],
        status: "COMPLETED",
        type: "FINTECH",
        links: { github: "https://github.com/sourav4243/PennyWise", demo: "" },
        icon: <Wallet size={36} />
    },
];

const COLORS = ["bg-red-500", "bg-blue-500", "bg-yellow-400", "bg-green-500", "bg-purple-500", "bg-orange-500"];

const getTranslateClass = (title: string) => {
    const len = title.length;
    if (len >= 18) return "-translate-x-[10%]";
    if (len >= 14) return "-translate-x-[15%]";
    if (len >= 11) return "-translate-x-[25%]";
    if (len >= 9) return "-translate-x-[35%]";
    return "-translate-x-[45%]";
};

const getHoverClass = (title: string) => {
    const len = title.length;
    if (len >= 18) return "hover:-translate-x-[10%]";
    if (len >= 14) return "hover:-translate-x-[15%]";
    if (len >= 11) return "hover:-translate-x-[25%]";
    if (len >= 9) return "hover:-translate-x-[35%]";
    return "hover:-translate-x-[45%]";
};


export default function Projects() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isShooting, setIsShooting] = useState(false);
    const [webTarget, setWebTarget] = useState<{ startX: number, startY: number, endX: number, endY: number } | null>(null);
    const [cardOriginY, setCardOriginY] = useState<number>(0);
    const { playThwip, playThud } = useSpideyAudio();

    const handleProjectClick = (e: React.MouseEvent, id: number) => {
        if (id === selectedId) return;

        // Trigger Spidey Web Pull interaction
        
        // Find click coordinates for the web targeting
        const rect = e.currentTarget.getBoundingClientRect();
        const yCenter = rect.top + rect.height / 2;
        
        // Calculate Y offset relative to screen vertical center for card pop-out origin
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        setCardOriginY(yCenter - screenCenterY);

        // Approximate where the right side of the card will land in the center
        const endXTarget = screenCenterX + (window.innerWidth > 768 ? 200 : 0);

        setWebTarget({ 
            startX: rect.right, 
            startY: yCenter,
            endX: endXTarget,
            endY: screenCenterY
        });

        setIsShooting(true);
        playThwip();

        setTimeout(() => {
            setIsShooting(false);
            setWebTarget(null);
        }, 900); // Long enough for total physics resolution
        
        setSelectedId(id);
    };

    const activeProject = projects.find(p => p.id === selectedId);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 select-none flex">
            {/* Global Background */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/projects-assets/background.png"
                    alt="Comic Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Back Button */}
            <Link href="/" className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] active:translate-y-2 active:shadow-none transition-all ${bangers.className} text-black text-xl tracking-wider`}>
                <ArrowLeft size={20} strokeWidth={3} /> BACK TO BASE
            </Link>

            {/* The Spidey Navigator - Sticking to extreme right edge, moved up slightly */}
            <div className="fixed -top-8 right-0 z-40 pointer-events-none">
                <div className="relative w-[150px] h-[150px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]">
                    <Image
                        src={isShooting ? "/projects-assets/best_so_far_shooting.png" : "/projects-assets/best_so_far_sitting.png"}
                        alt="Spider-Man"
                        fill
                        className="object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] object-right-top"
                        priority
                    />
                </div>
            </div>

            {/* Advanced Web Line Animation */}
            <AnimatePresence>
                {isShooting && webTarget && (
                    <motion.svg
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="fixed inset-0 w-full h-full z-100 pointer-events-none"
                    >
                        <motion.line
                            x1="88%" // approximate spidey wrist
                            y1="21.5%" // shifted lower for wrist
                            initial={{ x2: webTarget.startX, y2: webTarget.startY }}
                            animate={{ x2: webTarget.endX, y2: webTarget.endY }}
                            transition={{ type: "spring", damping: 13, stiffness: 80 }}
                            stroke="#fff"
                            strokeWidth="4"
                            style={{ filter: "drop-shadow(2px 2px 0px #000)" }}
                        />
                        <motion.line
                            x1="88%" 
                            y1="21.5%" 
                            initial={{ x2: webTarget.startX, y2: webTarget.startY }}
                            animate={{ x2: webTarget.endX, y2: webTarget.endY }}
                            transition={{ type: "spring", damping: 13, stiffness: 80 }}
                            stroke="#020617"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                        />
                        <motion.line
                            x1="91%" // approximate spidey wrist
                            y1="23.5%" // shifted lower for wrist
                            initial={{ x2: webTarget.startX, y2: webTarget.startY }}
                            animate={{ x2: webTarget.endX, y2: webTarget.endY }}
                            transition={{ type: "spring", damping: 13, stiffness: 80 }}
                            stroke="#fff"
                            strokeWidth="4"
                            style={{ filter: "drop-shadow(2px 2px 0px #000)" }}
                        />
                        <motion.line
                            x1="91%" 
                            y1="23.5%" 
                            initial={{ x2: webTarget.startX, y2: webTarget.startY }}
                            animate={{ x2: webTarget.endX, y2: webTarget.endY }}
                            transition={{ type: "spring", damping: 13, stiffness: 80 }}
                            stroke="#020617"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                        />
                    </motion.svg>
                )}
            </AnimatePresence>

            {/* Roster (Left Wall) - Parallelepiped Design */}
            <div className="fixed left-0 top-24 bottom-0 w-64 md:w-80 overflow-y-auto no-scrollbar z-20 pb-12 flex flex-col gap-5 px-2">
                {projects.map((project, index) => {
                    const colorClass = COLORS[index % COLORS.length];
                    const isActive = selectedId === project.id;
                    const translateClass = getTranslateClass(project.title);
                    const hoverClass = getHoverClass(project.title);
                    return (
                        <div
                            key={project.id}
                            onClick={(e) => handleProjectClick(e, project.id)}
                            className={`group relative cursor-pointer flex items-center transition-transform duration-300 transform -skew-x-12 ${isActive ? `${translateClass} scale-[1.02]` : `-translate-x-[60%] ${hoverClass} hover:scale-[1.02]`}`}
                        >
                            <div className={`${colorClass} flex-1 py-4 px-6 border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-end group-hover:shadow-[8px_8px_0px_#000]`}>
                                {/* Un-skew the text so it stays legible while the card slants */}
                                <h2 className={`${bangers.className} text-xl md:text-2xl text-white tracking-widest uppercase drop-shadow-[2px_2px_0_#000] skew-x-12`}>
                                    {project.title}
                                </h2>
                            </div>
                            {/* Decorative comic dots edge */}
                            <div className="absolute right-[4px] border-y-4 border-r-4 border-black border-l-0 opacity-100 pointer-events-none bg-white" style={{ width: '20px', height: '100%', top:0, bottom:0, right: -16 }}>
                                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 30%, transparent 30%)', backgroundSize: '8px 8px' }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 w-full flex flex-1 items-center justify-center pr-8 md:pr-12 pt-20 pl-[288px] md:pl-[368px]">
                {activeProject ? (
                        <motion.div
                            key={activeProject.id}
                            initial={{ scale: 0.1, x: -600, y: cardOriginY, rotate: 0 }} // Originates directly from the exact vertical height of the clicked tab without rotation
                            animate={{ scale: 1, x: 0, y: 0, rotate: 0 }} // No rotation
                            transition={{ type: "spring", damping: 13, stiffness: 80 }} // Perfect match with web tracking physics
                            className="bg-[#fdf6e3] w-full max-w-3xl border-4 border-black p-8 md:p-12 shadow-[16px_16px_0px_#000] relative"
                        >
                            {/* Tape effect */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-white/60 border-2 border-black/20 rotate-2 shadow-sm backdrop-blur-sm" />

                            <div className="border-b-4 border-black pb-4 mb-6 flex items-start justify-between">
                                <div className="pr-4 z-10">
                                    <h1 className={`${luckiest.className} text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-4 inline-block`}
                                        style={{
                                            color: '#9ac08e', 
                                            WebkitTextStroke: '2px black',
                                            textShadow: '3px 3px 0 #000, 4px 4px 0 #000, 6px 6px 0 #000, 7px 7px 0 #000',
                                            transform: 'skewX(-12deg) rotate(-4deg)'
                                        }}>
                                        {activeProject.title}
                                    </h1>
                                    <br />
                                    <div className={`text-black/80 font-bold ${kalam.className} text-xl bg-yellow-300 border-2 border-black px-2 py-1 inline-block shadow-[2px_2px_0px_#000]`}>
                                        STATUS: {activeProject.status} | TYPE: {activeProject.type}
                                    </div>
                                </div>
                                {/* Icon Removed */}
                            </div>
                            
                            <div className="mb-4">
                                <h3 className={`${bangers.className} text-3xl text-black mb-2`}>ABILITIES:</h3>
                                <p className={`${kalam.className} text-xl md:text-2xl text-black leading-relaxed font-semibold`}>
                                    {activeProject.desc}
                                </p>
                            </div>

                            <div className="mb-8 mt-8">
                                <h3 className={`${bangers.className} text-3xl text-black mb-4`}>POWERS:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {activeProject.tech.map((t, i) => (
                                        <span key={t} className={`px-4 py-1 flex items-center justify-center font-bold text-white border-4 border-black shadow-[4px_4px_0px_#000] ${bangers.className} text-xl tracking-wider ${COLORS[(i+2) % COLORS.length]} rotate-[-2deg]`}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 mt-4 border-t-4 border-black border-dashed">
                                {activeProject.links.github && (
                                    <Link href={activeProject.links.github} target="_blank" className={`${bangers.className} flex items-center justify-center gap-2 px-6 py-3 bg-white text-black border-4 border-black text-2xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]`}>
                                        <Github size={24} strokeWidth={3} /> READ SOURCE!
                                    </Link>
                                )}
                                {activeProject.links.demo && (
                                    <Link href={activeProject.links.demo} target="_blank" className={`${bangers.className} flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white border-4 border-black text-2xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_#000]`}>
                                        <ExternalLink size={24} strokeWidth={3} /> ACTION DEMO!
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`${bangers.className} text-white text-4xl text-center md:text-6xl tracking-widest max-w-lg uppercase drop-shadow-[4px_4px_0_#000] bg-blue-600/80 p-8 border-4 border-black rounded-lg shadow-[8px_8px_0px_#000] rotate-2`}
                        >
                             Select a project from the left to reveal its secrets!
                        </motion.div>
                )}
            </main>
            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
}