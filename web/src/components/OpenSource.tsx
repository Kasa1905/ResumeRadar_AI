"use client";

import { useState } from "react";
import {
  Star,
  GitBranch,
  FileCheck,
  Shield,
  Copy,
  Check,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export function OpenSource() {
  const [copiedClone, setCopiedClone] = useState(false);

  const cloneCommand = "git clone https://github.com/Kasa1905/ResumeRadar_AI.git";

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <section id="open-source" className="py-20 md:py-32 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-black/80">
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Shield className="w-3.5 h-3.5" />
              <span>MIT Licensed & Free Forever</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              100% Open Source.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400">
                Community Driven.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              ResumeRadar AI is licensed under the permissive MIT License. Inspect the source code, run the 41 automated pytest test suites, fork the repository, or deploy your own private profiling instance without vendor lock-in.
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10 max-w-2xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-white font-mono">41/41</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Pytest Tests Pass</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-indigo-400 font-mono">MIT</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Permissive License</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-violet-400 font-mono">Python 3.12+</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">FastAPI Backend</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-emerald-400 font-mono">0 Fake Data</div>
                <div className="text-xs text-slate-400 mt-1 font-mono">Verified Extraction</div>
              </div>
            </div>

            {/* Clone Box */}
            <div className="max-w-lg mx-auto mb-8 p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 overflow-x-auto text-slate-300">
                <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{cloneCommand}</span>
              </div>
              <button
                onClick={handleCopyClone}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors shrink-0"
                title="Copy clone command"
              >
                {copiedClone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/Kasa1905/ResumeRadar_AI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
              >
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Star on GitHub</span>
              </a>

              <a
                href="https://github.com/Kasa1905/ResumeRadar_AI/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
              >
                <GitBranch className="w-4 h-4 text-slate-300" />
                <span>Fork Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
