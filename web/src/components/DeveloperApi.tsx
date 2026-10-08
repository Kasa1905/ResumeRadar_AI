"use client";

import { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Cpu,
  BookOpen,
  Settings2,
} from "lucide-react";

export function DeveloperApi() {
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "node">("curl");
  const [copied, setCopied] = useState(false);

  const snippets = {
    curl: `curl -X POST /api/analyze \\
  -H "Content-Type: application/json" \\
  -d '{
    "github_url": "https://github.com/Kasa1905",
    "linkedin_url": "https://linkedin.com/in/kaushiksambe"
  }'`,
    python: `import httpx

async def inspect_developer():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "/api/analyze",
            json={
                "github_url": "https://github.com/Kasa1905",
                "linkedin_url": "https://linkedin.com/in/kaushiksambe"
            },
            timeout=15.0
        )
        data = response.json()
        print(f"Total Repos: {data['github']['total_repos']}")
        print(f"Skills: {data['github']['skills_detected']}")

# Run with asyncio.run(inspect_developer())`,
    node: `// Next.js / Node.js 18+
const analyzeProfile = async () => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      github_url: "https://github.com/Kasa1905",
      linkedin_url: "https://linkedin.com/in/kaushiksambe"
    })
  });
  
  const result = await response.json();
  console.log("Analyzed Repositories:", result.github.repos);
};`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-20 md:py-32 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: API Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer-First Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Native REST API for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Profiling Automation
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
            ResumeRadar AI operates as a serverless REST API on Netlify. Embed profile intelligence directly into internal hiring workflows, developer dashboards, portfolio builders, or vetting pipelines.
            </p>

            {/* Spec Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Pydantic v2 Type Safety
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Strict request validation with automatic 400 Bad Request triggers on invalid GitHub or LinkedIn formats.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Configurable Rate Limits
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Configure <code className="text-indigo-300 font-mono">GITHUB_TOKEN</code> to elevate limits from 60 to 5,000 requests/hour.
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/Kasa1905/ResumeRadar_AI#api-usage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read API Documentation in README</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Code Snippet Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel border border-white/10 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Top Bar with Language Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("curl")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "curl"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    onClick={() => setActiveTab("python")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "python"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Python (httpx)
                  </button>
                  <button
                    onClick={() => setActiveTab("node")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "node"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Node / TypeScript
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  title="Copy Code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code display */}
              <pre className="p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto bg-black/60 leading-relaxed min-h-[220px]">
                <code>{snippets[activeTab]}</code>
              </pre>

              {/* Endpoint footer info */}
              <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Host: same-origin /api</span>
                </span>
                <span>Netlify Functions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
