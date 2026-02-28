import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Skills } from "@/components/sections/Skills";
import { Languages } from "@/components/sections/Languages";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden selection:bg-purple-500/30 selection:text-white">
      <div className="flex-1 w-full">
        <Hero />
        <WhatIDo />
        <Skills />
        <Languages />
        <Projects />
        <Contact />
      </div>

      <footer className="w-full bg-neutral-950/80 backdrop-blur-md border-t border-white/5 py-8 mt-12 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} YSF. All rights reserved.</p>
      </footer>
    </main>
  );
}
