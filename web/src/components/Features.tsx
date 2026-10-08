"use client";

import {
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  FileSearch,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export function Features() {
  const features = [
    {
      icon: GithubIcon,
      badge: "Core Engine",
      title: "GitHub Profile Analysis",
      description:
        "Fetches public repositories asynchronously via the GitHub REST API. Inspects repository metadata, commit recency, primary programming languages, and default branches with full rate-limit handling.",
      details: [
        "Async HTTP client via httpx",
        "Supports up to 5,000 req/hr with GitHub token",
        "Extracts branch, topics, and updated timestamps",
      ],
      gradient: "from-blue-500/20 to-indigo-500/10",
      accent: "text-blue-400",
    },
    {
      icon: Cpu,
      badge: "Dual-Layer Scan",
      title: "Repository & Technology Detection",
      description:
        "Combines the GitHub Languages API with regex-based keyword detection in README files to discover underlying technologies like FastAPI, React, Docker, Redis, TensorFlow, and PostgreSQL.",
      details: [
        "18+ pre-configured technology keywords",
        "README first-line parsing and extraction",
        "Aggregates language byte counts and tool mentions",
      ],
      gradient: "from-indigo-500/20 to-violet-500/10",
      accent: "text-indigo-400",
    },
    {
      icon: FileSearch,
      badge: "Deterministic Signals",
      title: "Developer Project Insights",
      description:
        "Evaluates project health across 6 concrete criteria: README availability, non-empty description, updates within 365 days, multi-language usage, topic tags, and external project links.",
      details: [
        "Computes strong_project benchmark flag",
        "Detects live deployment and doc URLs in markdown",
        "Quantifies maintenance freshness and activity",
      ],
      gradient: "from-violet-500/20 to-purple-500/10",
      accent: "text-violet-400",
    },
    {
      icon: LinkedinIcon,
      badge: "Structured Schema",
      title: "Optional LinkedIn Profile Input",
      description:
        "Accepts optional LinkedIn URLs to parse structured role and certification data. Built with an extensible schema that seamlessly bridges public snapshots with official LinkedIn OAuth APIs.",
      details: [
        "Validates profile ID formats and domains",
        "Structures professional roles and certification records",
        "Transparent error handling for restricted profiles",
      ],
      gradient: "from-sky-500/20 to-blue-500/10",
      accent: "text-sky-400",
    },
    {
      icon: Sparkles,
      badge: "Developer Intelligence",
      title: "AI-Assisted Analysis",
      description:
        "Transforms fragmented Git repositories into an aggregated developer tech stack profile. Synthesizes technology frequencies and quality indicators without black-box hallucinations.",
      details: [
        "Zero fabricated numbers or synthetic metrics",
        "Every detected skill links to real code evidence",
        "Clean, serializable Pydantic data schemas",
      ],
      gradient: "from-purple-500/20 to-pink-500/10",
      accent: "text-purple-400",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative border-b border-white/5">
      {/* Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Built-in Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Ground Truth,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Not Fluff
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Every feature in ResumeRadar AI is rooted directly in the open-source repository. No hallucinated resumes, no black-box scoring.
          </p>
        </div>

        {/* Feature Cards Grid (3 top, 2 bottom centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {features.slice(0, 3).map((f, idx) => (
            <div
              key={idx}
              className="group rounded-2xl glass-panel p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} border border-white/10 flex items-center justify-center`}
                  >
                    <f.icon className={`w-6 h-6 ${f.accent}`} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {f.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                {f.details.map((d, di) => (
                  <div key={di} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {features.slice(3).map((f, idx) => (
            <div
              key={idx}
              className="group rounded-2xl glass-panel p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} border border-white/10 flex items-center justify-center`}
                  >
                    <f.icon className={`w-6 h-6 ${f.accent}`} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {f.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                {f.details.map((d, di) => (
                  <div key={di} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
