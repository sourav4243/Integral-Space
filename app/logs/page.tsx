"use client";

import Link from "next/link";
import { 
  ArrowLeft, GitCommit, Copy, Code,
  ChevronDown, GitBranch, User, Menu, Search, 
  Plus, Inbox, CircleDot, GitPullRequest, 
  PlayCircle, Layout, Book, Shield, LineChart, Settings 
} from "lucide-react";
import { motion } from "framer-motion";

const commitGroups = [
  {
    date: "Dec 16, 2025",
    commits: [
      { id: "9cf883a", message: "refactor(core): switch to zsh-style cli architecture", author: "sourav4243", time: "6 hours ago", verified: true },
      { id: "c466f0f", message: "feat: add github actions workflow for next.js deployment", author: "sourav4243", time: "8 hours ago", verified: true },
    ]
  },
  {
    date: "Dec 15, 2025",
    commits: [
      { id: "9f036f7", message: "chore: create CNAME for custom domain", author: "sourav4243", time: "yesterday", verified: true },
      { id: "f5563cb", message: "style: add folder icon and terminal wallpaper assets", author: "sourav4243", time: "yesterday", verified: false },
      { id: "50b053c", message: "feat(projects): add terminal mode for desktop and accordion view for mobile", author: "sourav4243", time: "yesterday", verified: false },
    ]
  },
  {
    date: "Dec 10, 2025",
    commits: [
      { id: "6376f71", message: "fix: resolve bvh traversal cache miss in ray tracer", author: "sourav4243", time: "5 days ago", verified: true },
    ]
  }
];

export default function Logs() {
  return (
    <div className="min-h-screen w-full bg-[#0d1117] font-sans text-[#e6edf3]">
      
      <header className="bg-[#010409] border-b border-[#30363d] text-[#e6edf3]">
        
        {/* ROW 1: Top Bar */}
        <div className="px-4 py-3 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
                <button className="p-1.5 border border-[#30363d] rounded-md text-[#7d8590] hover:text-[#e6edf3]">
                    <Menu size={16} />
                </button>
                
                <div className="flex items-center gap-2 text-sm md:text-md whitespace-nowrap">
                   <Link href="/" className="hover:text-[#58a6ff]">sourav4243</Link>
                   <span className="text-[#7d8590]">/</span>
                   <Link href="/" className="font-bold hover:text-[#58a6ff]">Integral-Space</Link>
                   <span className="hidden sm:inline-block px-2 py-0.5 text-xs border border-[#30363d] rounded-full text-[#7d8590] font-medium ml-2">Public</span>
                </div>
            </div>


            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-xs text-[#7d8590] w-48 lg:w-64">
                    <Search size={14} className="mr-2" />
                    <span>Type <kbd className="border border-[#30363d] px-1 rounded text-[10px] mx-1">/</kbd> to search</span>
                </div>

                <div className="md:flex items-center gap-2 md:gap-4 text-[#e6edf3] hidden">
                    <div className="h-8 w-px bg-[#30363d] mx-1 hidden md:block"></div>
                    <button className="text-[#e6edf3] hover:text-[#7d8590]"><Plus size={16} /></button>
                    <button className="text-[#e6edf3] hover:text-[#7d8590]"><CircleDot size={16} /></button>
                    <button className="text-[#e6edf3] hover:text-[#7d8590]"><GitPullRequest size={16} /></button>
                    <button className="text-[#e6edf3] hover:text-[#7d8590]"><Inbox size={16} /></button>
                    
                    {/* Avatar Circle */}
                    <div className="w-5 h-5 rounded-full bg-gray-600 border border-[#e6edf3] ml-1"></div>
                </div>
            </div>
        </div>

        {/* ROW 2: Navigation Tabs */}
        <div className="px-4 pt-2 overflow-x-hidden scrollbar-hide">
            <div className="flex gap-1 text-sm">
               <NavItem icon={<Code size={16}/>} label="Code" active />
               <NavItem icon={<CircleDot size={16}/>} label="Issues" />
               <NavItem icon={<GitPullRequest size={16}/>} label="Pull requests" />
               <NavItem icon={<PlayCircle size={16}/>} label="Actions" />
               <NavItem icon={<Layout size={16}/>} label="Projects" />
               <NavItem icon={<Book size={16}/>} label="Wiki" />
               <NavItem icon={<Shield size={16}/>} label="Security" />
               <NavItem icon={<LineChart size={16}/>} label="Insights" />
               <NavItem icon={<Settings size={16}/>} label="Settings" />
            </div>
        </div>
      </header>


      {/* MAIN PAGE CONTENT*/}
      <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-semibold">Commits</h1>
            <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e] transition-all flex items-center gap-2">
                    <GitBranch size={16} className="text-[#7d8590]" />
                    main
                    <ChevronDown size={14} className="text-[#7d8590]" />
                    </button>
                    <div className="h-4 w-px bg-[#30363d] mx-1"></div>
                    <Link href="/" className="px-3 py-1.5 text-[#58a6ff] hover:underline text-sm flex items-center gap-1">
                    <ArrowLeft size={14}/> Go back
                    </Link>
            </div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-0 md:pl-4">
            
            {/* Vertical Line */}
            <div className="absolute left-[7px] md:left-2.5 top-0 bottom-0 w-0.5 bg-[#30363d] z-0 hidden md:block"></div>

            {commitGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="relative z-10 mb-8">
                    
                    {/* Date Header */}
                    <div className="flex items-center gap-2 mb-2.5 md:-ml-5">
                        <div className="w-8 h-8 rounded-full bg-[#0d1117] flex items-center justify-center shrink-0 z-20">
                            <GitCommit size={20} className="text-[#7d8590]" />
                        </div>
                        <span className="text-md font-medium text-[#7d8590]">Commits on {group.date}</span>
                    </div>

                    {/* Commit Box */}
                    <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden shadow-sm">
                        {group.commits.map((commit, i) => (
                            <motion.div 
                                key={commit.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 hover:bg-[#161b22] border-b border-[#30363d] last:border-0 transition-colors gap-3 md:gap-0"
                            >
                                {/* Message & Author */}
                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="text-[15px] font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer truncate pr-4">
                                        {commit.message}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7d8590]">
                                        <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                           <User size={12} className="text-slate-300"/>
                                        </div>
                                        <span className="font-bold text-[#e6edf3]">{commit.author}</span>
                                        <span>authored {commit.time}</span>
                                    </div>
                                </div>

                                {/* Actions & Hash */}
                                <div className="flex items-center gap-3 shrink-0 self-start md:self-auto mt-2 md:mt-0">
                                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-[#7d8590] hover:text-[#58a6ff] hover:bg-[#1f242c] rounded-md" title="Copy full SHA">
                                            <Copy size={14} />
                                        </button>
                                        <button className="p-1.5 text-[#7d8590] hover:text-[#58a6ff] hover:bg-[#1f242c] rounded-md" title="Browse repository at this point">
                                            <Code size={14} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {commit.verified && (
                                            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full border border-[rgba(63,185,80,0.4)] text-[#3fb950] text-xs font-medium">
                                                <span className="text-[10px]">Verified</span>
                                            </div>
                                        )}
                                        <div className="flex items-center font-mono text-xs text-[#7d8590]">
                                            <span className="p-1 px-2 bg-transparent border-0 md:border border-[#30363d] rounded-md hover:text-[#58a6ff] hover:border-[#8b949e] cursor-pointer transition-colors">
                                                {commit.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center py-5 text-[#30363d] text-sm select-none">
            Buttons are not working? lol it's just a static page
        </div>
      </div>
      <style jsx global>{`
        html, body {
            background-color: #0d1117; /* Matches the GitHub Dark color so overscroll looks seamless */
        }
      `}</style>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`
            flex items-center gap-2 px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap
            ${active 
                ? 'border-[#f78166] text-[#e6edf3] font-semibold' 
                : 'border-transparent text-[#e6edf3] hover:bg-[#161b22] hover:border-[#8b949e]/50 rounded-t-md'}
        `}>
            <span className={active ? "text-[#e6edf3]" : "text-[#7d8590]"}>
                {icon}
            </span>
            <span>{label}</span>
        </div>
    )
}