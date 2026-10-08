"use client";

import {
  Cpu,
  BarChart3,
  ArrowRight,
  CheckCircle,
  FileCode,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Enter GitHub Profile",
      description:
        "Provide any public GitHub username or URL. ResumeRadar AI validates the handle format and prepares async requests to the GitHub REST API.",
      icon: GithubIcon,
      detail: 'github_url: "https://github.com/username"',
      badge: "Target Definition",
    },
    {
      step: "02",
      title: "Add LinkedIn Optionally",
      description:
        "Attach a LinkedIn profile identifier to extract role records and certifications alongside code artifacts, using standard schema models.",
      icon: LinkedinIcon,
      detail: 'linkedin_url: "https://linkedin.com/in/..."',
      badge: "Optional Enrichment",
    },
    {
      step: "03",
      title: "Analyze Developer Profile",
      description:
        "FastAPI orchestrates parallel queries: interrogating the GitHub Languages API, scanning README markdown for 18+ frameworks, and testing 6 quality benchmarks.",
      icon: Cpu,
      detail: "POST /analyze -> 200 OK (FastAPI)",
      badge: "Heuristic Engine",
    },
    {
      step: "04",
      title: "Explore Generated Insights",
      description:
        "Consume clean, structured JSON detailing skill occurrence frequencies, strong project classifications, and comprehensive developer profile health.",
      icon: BarChart3,
      detail: "skills_detected + repos[].analysis",
      badge: "Deterministic Output",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Workflow Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How ResumeRadar AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Operates
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Four simple steps from raw developer links to deep, actionable technical insights.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl glass-panel p-6 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Step counter top indicator */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-indigo-400/80 group-hover:text-indigo-300 transition-colors">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {s.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                  <s.icon className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              {/* Code snippet callout */}
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-[11px] text-indigo-300 truncate">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
