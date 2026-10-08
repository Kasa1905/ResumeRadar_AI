"use client";

import {
  Building2,
  Code2,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export function AboutKasata() {
  return (
    <section id="about-kasata" className="py-20 md:py-32 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>Behind The Product</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Kasata
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300">
              The technology venture creating transparent developer tooling.
            </p>
          </div>

          {/* Clean Content Card */}
          <div className="rounded-2xl glass-panel p-8 sm:p-10 border border-white/10 space-y-6">
            <div className="space-y-4 text-base text-slate-200 leading-relaxed">
              <p>
                <strong className="text-white text-lg font-black tracking-tight underline decoration-indigo-500/60 underline-offset-4">Kasata</strong> is a specialized developer tools venture focused on automated code analysis engines, developer profile intelligence, and open-source infrastructure.
              </p>
              <p>
                Our flagship open-source release, <strong className="text-white font-bold">ResumeRadar AI</strong>, was founded on a simple principle: developer evaluation should be deterministic, verifiable, and free of synthetic inflation. Rather than predicting unverified skills or relying on buzzwords, ResumeRadar AI inspects public Git commits, repository languages, and documentation signals to present an authentic picture of developer capability.
              </p>
              <p>
                Operating at <strong className="text-indigo-300 font-mono font-semibold">kasata.me</strong>, we believe in the power of open-source software, transparent algorithms, and developer-first APIs that can be independently audited and integrated without friction.
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Verifiable Data
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every detected skill links to verifiable repositories and public markdown documentation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-2.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Open Source
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  MIT licensed architecture with public test suites, transparent roadmap, and community contributions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Developer First
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Built by developers for developers, with clean REST APIs and modular Pydantic data schemas.
                </p>
              </div>
            </div>

            {/* Author note */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 border-t border-white/5">
              <span>
                Maintained by <strong className="text-white">Kaushik Sambe</strong> & <strong className="text-white font-bold">Kasata</strong>
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:kasata@kasta.me"
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-mono"
                >
                  <span>kasata@kasta.me</span>
                </a>
                <span>•</span>
                <a
                  href="https://github.com/Kasa1905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-mono"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>github.com/Kasa1905</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
