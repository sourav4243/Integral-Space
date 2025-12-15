"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Github, Cpu, Layers, Terminal,
  Smartphone, Network, Database, Music, Wallet, Folder,
  FileCode, ChevronRight, ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Rubik } from "next/font/google";

const font = Rubik({
  subsets: ["latin"],
  weight: ["500"]
});

//  project data
const projects = [
  {
    id: 1,
    title: "Ray_Tracer",
    desc: "A physically-based rendering engine built from scratch in C++. Features BVH acceleration, global illumination, and material systems.",
    tech: ["C++", "Linear Algebra"],
    status: "RUNNING",
    type: "ENGINEERING",
    links: { github: "https://github.com/sourav4243/rayTracer", demo: "" },
    icon: <Cpu size={24} className="text-blue-400" />
  },
  {
    id: 2,
    title: "TheFlowMind",
    desc: "Collaborative mind-mapping tool with a digital canvas. Real-time syncing and infinite whiteboard capabilities.",
    tech: ["Next.js", "Liveblocks", "Convex", "Tailwind"],
    status: "COMPLETED",
    type: "WEB_APP",
    links: { github: "https://github.com/sourav4243/TheFlowMind", demo: "https://the-flow-mind.vercel.app/" },
    icon: <Layers size={24} className="text-yellow-400" />
  },
  {
    id: 3,
    title: "Integral_Space",
    desc: "The retro-futuristic portfolio you are looking at right now. Designed as a web-based operating system.",
    tech: ["Next.js", "Framer Motion", "Pixel Art", "TypeScript"],
    status: "LIVE",
    type: "FRONTEND",
    links: { github: "https://github.com/sourav4243", demo: "/" },
    icon: <Terminal size={24} className="text-emerald-400" />
  },
  {
    id: 4,
    title: "MyKeyboard",
    desc: "A custom Android keyboard built with Kotlin. Focuses on privacy, speed, and custom layout configurations.",
    tech: ["Kotlin", "Android SDK", "XML"],
    status: "ARCHIVED",
    type: "MOBILE",
    links: { github: "https://github.com/sourav4243/myKeyboard", demo: "" },
    icon: <Smartphone size={24} className="text-purple-400" />
  },
  {
    id: 5,
    title: "Federated_Learning_Simulation",
    desc: "A simulation framework demonstrating privacy-preserving AI training. Models are trained locally on independent nodes and aggregated globally without data sharing.",
    tech: ["Python", "Scikit-Learn", "XGBoost", "Next.js"],
    status: "COMPLETED",
    type: "AI_RESEARCH",
    links: { github: "https://github.com/sourav4243/federated-learning-simulation", demo: "" },
    icon: <Network size={24} className="text-orange-400" />
  },
  {
    id: 6,
    title: "CineMaa",
    desc: "A content-based movie recommendation system. Uses vectorization and cosine similarity to analyze metadata and suggest similar films.",
    tech: ["Python", "Jupyter", "Scikit-Learn"],
    status: "COMPLETED",
    type: "AI_ML",
    links: { github: "https://github.com/sourav4243/CineMaa", demo: "" },
    icon: <Database size={24} className="text-red-400" />
  },
  {
    id: 7,
    title: "A_Music_Player",
    desc: "A lightweight, offline audio player focusing on minimalism and high-fidelity playback.",
    tech: ["HTML", "CSS", "Vanilla JS"],
    status: "COMPLETED",
    type: "MEDIA",
    links: { github: "https://github.com/sourav4243/A-Music-Player", demo: "" },
    icon: <Music size={24} className="text-pink-400" />
  },
  {
    id: 8,
    title: "PennyWise",
    desc: "A smart expense tracker application designed to help users manage finances, visualize spending habits, and plan budgets effectively.",
    tech: ["Kotlin", "Android SDK", "Firebase", "Gemini-AI"],
    status: "COMPLETED",
    type: "FINTECH",
    links: { github: "https://github.com/sourav4243/PennyWise", demo: "" },
    icon: <Wallet size={24} className="text-green-400" />
  },
];

// Terminal component
const TerminalMode = ({ onClose }: { onClose: () => void }) => {
  const [history, setHistory] = useState<Array<{ type: 'cmd' | 'output', content: React.ReactNode }>>([
    { type: 'output', content: 'Welcome to Integral_OS Terminal v2.1.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      setHistory(prev => [...prev, { type: 'cmd', content: cmd }]);

      const args = cmd.split(' ');
      const command = args[0].toLowerCase();
      const target = args[1];

      let output: React.ReactNode = "";

      switch (command) {
        case 'help':
          output = (
            <div className="text-slate-400 space-y-1">
              <div><span className="text-cyan-400">ls</span>       - List all projects</div>
              <div><span className="text-cyan-400">cd [name]</span> - View project details (e.g. "cd Ray_Tracer")</div>
              <div><span className="text-cyan-400">cat [name]</span>- Read project README</div>
              <div><span className="text-cyan-400">clear</span>    - Clear terminal</div>
              <div><span className="text-cyan-400">exit</span>     - Return to GUI mode</div>
              <div><span className="text-cyan-400">cd ..</span>    - Go Home</div>
            </div>
          );
          break;
        case 'ls':
          output = (
            <div className="text-[#8baed3]">
              {projects.map(p =>
                <div key={p.id} className={`flex gap-1 ${font.className}`}>
                  <Image src="/folder.svg" height={20} width={20} alt="folder icon" className="" />
                  {p.title}/
                </div>
              )}
            </div>
          );
          break;
        case 'cd':
        case 'cat':
          if (!target) {
            output = "Usage: cd [project_name] or cd ..";
          } else if (target === '..') {
            output = "Navigating...";
            if (command === 'cd') router.push('/');
          } else {
            const project = projects.find(p => p.title.toLowerCase() === target.toLowerCase());
            if (project) {
              output = (
                <div className="border-l-2 border-emerald-500 pl-4 py-2 my-2 bg-emerald-900/10">
                  <h3 className="text-emerald-400 font-bold text-lg mb-1">{project.title}</h3>
                  <div className="text-slate-500 text-xs uppercase mb-2">
                    STATUS: {project.status} | TYPE: {project.type}
                  </div>
                  <p className="text-slate-300 mb-2">{project.desc}</p>
                  <div className="flex gap-2 text-xs">
                    {project.tech.map(t => <span key={t} className="text-cyan-600">[{t}]</span>)}
                  </div>
                  <div className="mt-3 flex gap-4 text-xs">
                    {project.links.github && <a href={project.links.github} target="_blank" className="text-blue-400 underline">Github_Link</a>}
                    {project.links.demo && <a href={project.links.demo} target="_blank" className="text-purple-400 underline">Live_Demo</a>}
                  </div>
                </div>
              );
            } else {
              output = `Error: Project "${target}" not found.`;
            }
          }
          break;
        case 'clear':
          setHistory([]);
          setInput("");
          return;
        case 'exit':
        case 'gui':
          onClose();
          return;
        case '':
          break;
        default:
          output = `Command not found: ${command}. Type "help" for list.`;
      }

      if (output) {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
      setInput("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black p-6 font-mono overflow-y-auto text-sm md:text-base"
      onClick={() => inputRef.current?.focus()}
    >
      <Image src="/wallpaper.jpg" width={100} height={0} className="w-full h-full inset-0 object-cover fixed -z-100" alt="wallpaper" unoptimized priority />
      <div className="max-w-6xl w-full p-6 border-2 border-black/10 bg-slate-950/60 mx-auto min-h-full flex flex-col backdrop-blur-md shadow-[0px_0px_30px_1px_#000000] rounded-3xl">
        {/* Output History */}
        <div className="space-y-2 mb-4">
          {history.map((line, i) => (
            <div key={i} className={`${line.type === 'cmd' ? 'text-pink-100/90 mt-4' : 'text-slate-300'}`}>
              {line.type === 'cmd' &&
                <span className="text-[e6d1dc] mr-2 text-sm space-x-1 relative bottom-px">
                  <span className="text-pink-100 relative bottom-[0.3px]">◄</span>
                  <span className="text-[17px] text-pink-100 italic relative -bottom-px pr-0.5">0s</span>
                  <span className="bottom-[0.3px] text-emerald-100">◎</span>
                </span>
              }
              {line.content}
            </div>
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-center gap-2 mt-auto pb-8">
          <span className="text-[e6d1dc] mr-2 text-sm space-x-1 relative bottom-px">
            <span className="text-pink-100 relative bottom-[0.3px]">◄</span>
            <span className="text-[17px] text-pink-100 italic relative -bottom-px pr-0.5">0s</span>
            <span className="bottom-[0.3px] text-emerald-100">◎</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-indigo-400 w-full caret-pink-100"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />

        {/* floating exit hint */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-xs text-slate-600 hover:text-red-400 border border-slate-800 px-2 py-1 rounded"
        >
          [ESC] to Exit Terminal
        </button>
      </div>
    </div>
  );
};


// Main
export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isTerminal, setIsTerminal] = useState(false);

  // toggle function handles clicking the same item to close it (Accordion style)
  const handleProjectClick = (id: number) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  // active project object for desktop right panel
  const activeProject = projects.find(p => p.id === selectedId);

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,6px_100%]" />
      {/* conditionally render terminal mode */}
      <AnimatePresence>
        {isTerminal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TerminalMode onClose={() => setIsTerminal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen md:h-screen w-full bg-slate-900/80 font-mono text-slate-200 selection:bg-cyan-500/30 overflow-hidden flex flex-col md:flex-row relative">

        {/* background grid */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* left: directory list */}
        <div className="w-full md:w-1/3 h-full md:border-r border-slate-800 bg-slate-900/80 flex flex-col z-10 relative">

          {/* Header with Mode Toggle */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs">cd ..</span>
              </Link>
              <span className="text-[10px] text-slate-600 hidden sm:inline">~/projects</span>
            </div>

            {/* terminal toggle button */}
            <button
              onClick={() => setIsTerminal(true)}
              className="flex items-center gap-2 px-2 py-1 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-[10px] text-slate-400 hover:text-emerald-400 transition-all rounded-sm group"
            >
              <Terminal size={12} />
              <span className="group-hover:underline">TERM_MODE</span>
            </button>
          </div>

          {/* ls output */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800 pb-20 md:pb-4">
            {/* <div className="text-slate-500 text-xs mb-4 px-2 select-none">
              drwxr-xr-x  8 sourav  staff  4096 Dec 14 .<br />
              drwxr-xr-x  3 sourav  staff  4096 Dec 14 ..
            </div> */}

            {projects.map((project) => (
              <div key={project.id} className="flex flex-col">
                {/* folder row */}
                <div
                  // Desktop: hover triggers preview
                  onMouseEnter={() => window.innerWidth >= 768 && setSelectedId(project.id)}
                  // Mobile: click toggles accordion
                  onClick={() => handleProjectClick(project.id)}
                  className={`
                              group flex items-center justify-between px-3 py-3 md:py-2 cursor-pointer rounded-sm border border-transparent transition-all
                              ${selectedId === project.id ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}
                          `}
                >
                  <div className="flex items-center gap-3">
                    {selectedId === project.id ? (
                      <Folder size={16} className="fill-current text-cyan-500" />
                    ) : (
                      <Folder size={16} className="fill-current text-slate-600" />
                    )}
                    <span className="text-sm tracking-wide">{project.title}/</span>
                  </div>

                  <div className="flex items-center">
                    <ChevronRight size={14} className={`hidden md:block opacity-0 -translate-x-2 transition-all ${selectedId === project.id ? 'opacity-100 translate-x-0' : 'group-hover:opacity-50'}`} />
                    <ChevronDown size={14} className={`md:hidden transition-transform duration-300 ${selectedId === project.id ? 'rotate-180 text-cyan-500' : 'text-slate-600'}`} />
                  </div>
                </div>

                {/* mobile accordion */}
                <AnimatePresence>
                  {selectedId === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="md:hidden overflow-hidden"
                    >
                      <div className="pl-4 pr-2 py-4 border-l-2 border-slate-800 ml-3 bg-slate-900/50 my-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                          {project.desc}
                        </p>
                        <div className="flex gap-3">
                          {project.links.github && (
                            <Link href={project.links.github} target="_blank" className="flex items-center gap-1 text-xs text-cyan-400 hover:underline">
                              <Github size={12} /> Source
                            </Link>
                          )}
                          {project.links.demo && (
                            <Link href={project.links.demo} target="_blank" className="flex items-center gap-1 text-xs text-emerald-400 hover:underline">
                              <ExternalLink size={12} /> Live
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Blink Cursor */}
            <div className="mt-4 px-3 flex items-center gap-2 text-slate-500">
              <span className="text-emerald-500">➜</span>
              <span className="w-0.5 h-5 bg-slate-500 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Right: desktop only preview */}
        <div className={`
           hidden md:flex flex-1 bg-slate-950/50 relative items-center justify-center p-12
        `}>
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0.5, x: -20, scale: 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}

                style={{
                  boxShadow: `
                    inset 1px 1px 1px 1px #475569,
                    inset -3px -2px 3px 0px #020617,
                    0 -2px 0 8px #1e293b,
                    0 0 0 4px #020617
                  `
                }}
                className="w-full max-w-2xl bg-[#0f172a] p-8 relative select-none rounded-xs"
              >
                <div className="absolute -left-1 top-8 w-1 h-12 bg-cyan-500"></div>
                <div className="absolute -top-1 right-8 w-12 h-1 bg-cyan-500"></div>

                <div className="flex items-start justify-between mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 border border-slate-700 rounded-md shrink-0">
                      {activeProject.icon}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-slate-100">{activeProject.title}</h1>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest mt-1">
                        <span className="text-slate-500">{activeProject.type}</span>
                        <span className="text-emerald-500">● {activeProject.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono text-right">
                    ID: {String(activeProject.id).padStart(3, '0')}<br />
                    PERM: 0755
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FileCode size={12} /> README.md
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {activeProject.desc}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-2">Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-slate-950 border border-slate-800 text-xs text-cyan-400 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  {activeProject.links.github && (
                    <Link href={activeProject.links.github} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 rounded-sm">
                      <Github size={14} /> VIEW_SOURCE
                    </Link>
                  )}
                  {activeProject.links.demo && (
                    <Link href={activeProject.links.demo} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-400 text-xs font-bold transition-colors border border-cyan-900/50 rounded-sm">
                      <ExternalLink size={14} /> LAUNCH_PREVIEW
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-slate-600 opacity-50"
              >
                <Folder size={64} className="mb-4 stroke-[1px]" />
                <p className="text-sm tracking-widest uppercase text-center px-4">
                  Select a module from the terminal<br />to decrypt data
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}