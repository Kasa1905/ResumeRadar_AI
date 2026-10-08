import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kasata — ResumeRadar AI | AI-Powered Insights for Developer Profiles",
  description:
    "Open-source developer profiling engine by Kasata. Analyze GitHub profiles, detect frameworks and tools, evaluate repository health signals, and inspect profile structures.",
  keywords: [
    "Kasata",
    "kasata.me",
    "ResumeRadar AI",
    "developer profile insights",
    "GitHub analyzer",
    "tech stack detection",
    "open source AI developer tool",
    "FastAPI",
    "repository quality metrics",
  ],
  authors: [{ name: "Kasata", url: "https://kasata.me" }],
  creator: "Kasata",
  publisher: "Kasata",
  metadataBase: new URL("https://kasata.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kasata.me",
    siteName: "Kasata — ResumeRadar AI",
    title: "Kasata — ResumeRadar AI | AI-Powered Insights for Developer Profiles",
    description:
      "Deep automated analysis of GitHub repositories, technology stacks, code frequency, and developer project quality. 100% open-source under MIT.",
    images: [
      {
        url: "https://kasata.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kasata - ResumeRadar AI - AI-powered insights for developer profiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasata — ResumeRadar AI | AI-Powered Insights for Developer Profiles",
    description:
      "Open-source developer profiling tool by Kasata. Detect skills, analyze repositories, and evaluate project quality.",
    creator: "@Kasata",
    images: ["https://kasata.me/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#07090e] text-slate-100 antialiased font-sans flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
