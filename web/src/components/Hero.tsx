"use client";

import Link from "next/link";
import {
  Radar,
  ArrowRight,
  Code2,
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-white/5">
      {/* Background Animated Radar & Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dot/grid matrix */}
        <div className="absolute inset-0 bg-radar-grid mask-radial opacity-60" />

        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/20 to-blue-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full" />

        {/* Animated Radar Circle Array (Center-Right in desktop, Centered in mobile) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[640px] h-[640px] opacity-25">
          {/* Concentric Radar Rings */}
          <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
          <div className="absolute inset-16 rounded-full border border-indigo-500/25 border-dashed" />
          <div className="absolute inset-32 rounded-full border border-indigo-500/30" />
          <div className="absolute inset-48 rounded-full border border-indigo-500/35" />
          <div className="absolute inset-[240px] rounded-full border border-indigo-400/40" />

          {/* Radar Sweep Wedge */}
          <div className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/20 via-violet-500/5 to-transparent rounded-tl-full origin-bottom-right" />
          </div>

          {/* Pulsing Core Ping */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-400 animate-radar-ping opacity-75" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-indigo-500/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-slate-200 font-mono text-xs">
              <strong className="text-white font-black uppercase tracking-wider">Kasata</strong>
              <span className="text-slate-500 ml-1.5 font-normal">/ AI Developer Infrastructure</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-300 flex items-center gap-1 font-medium text-xs">
              Open-Source FastAPI Engine
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            AI-powered insights for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-blue-400">
              developer profiles.
            </span>
          </h1>

          {/* Subtitle / 1-2 sentence description strictly grounded in repo */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
            Built by <strong className="text-white font-extrabold underline decoration-indigo-500/50 underline-offset-4">Kasata</strong>, ResumeRadar AI parses public GitHub repositories to extract programming languages, detects underlying frameworks from README documentation, and evaluates project health signals through a production-grade FastAPI engine.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/45 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Radar className="w-4 h-4 text-indigo-200" />
              <span>Try ResumeRadar AI</span>
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </Link>

            <a
              href="https://github.com/Kasa1905/ResumeRadar_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* Truthful Specs Banner */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Open Source (MIT)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>41 Passing Pytest Tests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Hallucinations</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Dashboard Teaser */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Subtle outer glow border */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-blue-500/20 blur-xl opacity-75" />

          <div className="relative rounded-2xl glass-panel p-4 sm:p-6 shadow-2xl shadow-black/80">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400 hidden sm:inline-block">
                  resumeradar-ai // profile-analysis-engine
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  API 200 OK
                </span>
                <span className="font-mono text-xs text-slate-500">
                  POST /analyze
                </span>
              </div>
            </div>

            {/* Quick Metrics preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-5">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Profile Analyzed</span>
                  <GithubIcon className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  @Kasa1905
                </div>
                <div className="text-[11px] text-indigo-400/80 mt-0.5">
                  18 Public Repositories
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Technologies</span>
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  10 Detected
                </div>
                <div className="text-[11px] text-emerald-400 mt-0.5">
                  FastAPI, React, Docker +7
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Quality Signals</span>
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  6 Indicators
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  README, Freshness, Topics
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>LinkedIn Schema</span>
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  Roles & Certs
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Structured Model Ready
                </div>
              </div>
            </div>

            {/* Micro Teaser Row */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Deterministic & Verifiable:</strong>{" "}
                  Skills are counted by occurrences across repository languages and README heuristics.
                </p>
              </div>

              <Link
                href="#product"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
              >
                <span>Open Interactive Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
