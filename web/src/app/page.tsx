import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductDashboard } from "@/components/ProductDashboard";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { DeveloperApi } from "@/components/DeveloperApi";
import { OpenSource } from "@/components/OpenSource";
import { AboutKasata } from "@/components/AboutKasata";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top sticky navigation */}
      <Navbar />

      {/* Main content flow */}
      <main className="flex-1">
        <Hero />
        <Features />
        <ProductDashboard />
        <HowItWorks />
        <DeveloperApi />
        <OpenSource />
        <AboutKasata />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
