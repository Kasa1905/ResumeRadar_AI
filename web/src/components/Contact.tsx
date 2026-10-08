"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  Building2,
} from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = "kasata@kasta.me";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with populated subject and body
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject || `Inquiry from ${name || "Visitor"}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400">Kasata</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Have questions about <strong className="text-white font-semibold">ResumeRadar AI</strong>, custom integrations, or partnerships? Reach our team directly at <strong className="text-indigo-400 font-mono font-semibold">{contactEmail}</strong>.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Info & Verified Email Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>Company Contact</span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Kasata Headquarters
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Official inquiries, developer integration support, and open-source collaboration.
                </p>
              </div>

              {/* Verified Email Box */}
              <div className="p-4 rounded-xl bg-black/50 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Email
                  </span>
                  <span>Primary Inbox</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-base sm:text-lg font-bold font-mono text-white hover:text-indigo-300 transition-colors truncate"
                  >
                    {contactEmail}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all shrink-0 active:scale-95"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Guarantees / Highlights */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Prompt response within 24–48 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct founder & engineering team inbox</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Domain verified for kasata.me</span>
                </div>
              </div>

              {/* Direct Mailto Action */}
              <a
                href={`mailto:${contactEmail}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-md shadow-indigo-600/25 active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email to {contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Send a Message to <span className="font-extrabold text-indigo-300">Kasata</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your details below to compose a direct message.
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Inquiry regarding ResumeRadar AI / Kasata"
                    required
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, integration, or question..."
                    required
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Routes directly to kasata@kasta.me
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>

                {submitted && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn mt-3">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Message client opened! We look forward to connecting.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
