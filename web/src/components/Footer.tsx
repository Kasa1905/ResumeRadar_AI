"use client";

import Link from "next/link";
import { Radar, Terminal, Shield, Mail, Heart } from "lucide-react";
import { GithubIcon } from "./Icons";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#05070a] border-t border-white/5 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Radar className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">
                  Kasata
                </span>
                <span className="text-slate-600">/</span>
                <span className="font-bold text-slate-300 text-sm tracking-tight">
                  ResumeRadar <span className="text-indigo-400">AI</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              AI-powered insights for developer profiles. Automated analysis of GitHub repositories, technology detection, and project quality metrics.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MIT License
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                FastAPI v1.0.0
              </span>
            </div>
          </div>

          {/* Product & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Product & Docs
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#product" className="hover:text-white transition-colors">
                  Interactive Dashboard
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905/ResumeRadar_AI#api-usage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3 text-indigo-400" />
                  Documentation / API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905/ResumeRadar_AI#quick-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Local Setup Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Open Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Kasata & Open Source
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="#about-kasata" className="hover:text-white transition-colors">
                  About Kasata
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors text-indigo-300 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Contact: kasata@kasta.me</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905/ResumeRadar_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <GithubIcon className="w-3 h-3" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905/ResumeRadar_AI/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3 h-3 text-emerald-400" />
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905/ResumeRadar_AI/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Issues
                </a>
              </li>
              <li>
                <a
                  href="https://kasata.me"
                  className="hover:text-white transition-colors text-slate-400 font-mono"
                >
                  kasata.me
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kasa1905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Author: @Kasa1905
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Kasata. Open source under the MIT License.
          </div>
          <div className="flex items-center gap-4">
            <span>Built for developers worldwide</span>
            <span>•</span>
            <a
              href="https://github.com/Kasa1905/ResumeRadar_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
