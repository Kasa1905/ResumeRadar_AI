"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radar, Star, Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon } from "./Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent border border-indigo-500/30 group-hover:border-indigo-400/60 transition-all shadow-inner">
            <Radar className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors group-hover:rotate-45 duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#07090e]" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              Kasata
            </span>
            <span className="text-slate-600 font-light text-base">/</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-200">
                ResumeRadar <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                v1.0
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            href="#features"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150"
          >
            Features
          </Link>
          <Link
            href="#product"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150"
          >
            Product
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150"
          >
            How it Works
          </Link>
          <Link
            href="#api"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150 flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            API
          </Link>
          <Link
            href="#open-source"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150"
          >
            Open Source
          </Link>
          <Link
            href="#about-kasata"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150"
          >
            Kasata
          </Link>
          <Link
            href="#contact"
            className="hover:text-white transition-colors hover:translate-y-[-1px] duration-150 text-indigo-300 font-semibold"
          >
            Contact
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/Kasa1905/ResumeRadar_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
            title="Star ResumeRadar AI on GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <span className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-white/10 text-amber-300">
              <Star className="w-3 h-3 fill-amber-300/80" />
              <span>Star</span>
            </span>
          </a>

          <Link
            href="#product"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-[0.98]"
          >
            <span>Try ResumeRadar AI</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://github.com/Kasa1905/ResumeRadar_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d17]/95 border-b border-white/10 px-5 pt-3 pb-6 space-y-4 backdrop-blur-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              Product Dashboard
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              How it Works
            </Link>
            <Link
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              API Reference
            </Link>
            <Link
              href="#open-source"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              Open Source
            </Link>
            <Link
              href="#about-kasata"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white"
            >
              About Kasata
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-white text-indigo-300 font-semibold"
            >
              Contact (kasata@kasta.me)
            </Link>
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600"
            >
              Try ResumeRadar AI
            </Link>
            <a
              href="https://github.com/Kasa1905/ResumeRadar_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/5 border border-white/10"
            >
              <GithubIcon className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
