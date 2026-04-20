import React from "react";
import { GitCommit, Code2 } from "lucide-react";

export default function CodingStats() {
  const leetcodeUser = 'sourav__4243';
  const githubUser = "sourav4243";

  return (
    <div className="h-full w-full bg-slate-900/80 p-3 font-mono flex flex-col pt-3 gap-3 overflow-y-auto scrollbar-none">
      
      {/* LeetCode Section */}
      <div className="border border-slate-800 bg-slate-950/50 p-2 rounded-lg flex flex-col gap-1 relative shrink-0">
        <div className="flex items-center gap-2 text-pink-400 font-bold mb-1 uppercase tracking-wide text-sm px-2 mt-1">
           <Code2 size={16} /> LeetCode Stats
        </div>
        <div className="flex justify-center items-center w-full min-h-[140px]">
          <img 
            src={`https://leetcard.jacoblin.cool/${leetcodeUser}?theme=transparent&font=Syne%20Mono`}
            alt={`${leetcodeUser}'s LeetCode Stats`}
            className="w-full max-w-[340px] md:max-w-[360px] object-contain rounded opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<span class="text-sm text-red-400/80 mt-10">User not found or API error.</span>');
            }}
          />
        </div>
      </div>

      {/* GitHub Section */}
      <div className="border border-slate-800 bg-slate-950/50 p-2 rounded-lg flex flex-col gap-1 overflow-hidden shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-pink-400 font-bold uppercase tracking-wide text-sm">
            <GitCommit size={16} /> GitHub Heatmap
          </div>
          <a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-pink-400 hover:underline">
            @{githubUser}
          </a>
        </div>
        
        {/* GitHub Heatmap via API using standard green color */}
        <div className="overflow-x-auto scrollbar-none pb-1 w-full flex items-center justify-start">
          <img 
            src={`https://ghchart.rshah.org/${githubUser}`}
            alt={`${githubUser}'s GitHub Heatmap`}
            className="min-w-[500px] h-auto object-contain opacity-80 mix-blend-screen pointer-events-none"
          />
        </div>
      </div>

    </div>
  );
}
