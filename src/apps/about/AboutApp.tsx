import React from 'react';
import { TerminalIcon, LayersIcon, ShieldIcon } from 'lucide-react';

export const AboutApp: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white overflow-y-auto">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-2xl">
          <TerminalIcon size={48} className="text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">PrathamOS</h1>
        <p className="text-xl text-white/70 max-w-xl leading-relaxed">
          An engineering project first, and a portfolio second.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          Architecture Version 1.0.0
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-8 md:p-12 flex flex-col gap-12">
        {/* Philosophy */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LayersIcon className="text-purple-400" /> The Philosophy
          </h2>
          <p className="text-white/70 leading-relaxed">
            PrathamOS was designed to demonstrate the application of modern software engineering principles—including modular architecture, maintainability, accessibility, security, performance, and scalability—within a cohesive desktop environment built entirely with web technologies.
          </p>
          <p className="text-white/70 leading-relaxed">
            It is not meant to be the flashiest CSS showcase, but rather the most robust and architecturally sound web-based OS. Every feature, abstraction, and engineering decision contributes to the overall coherence of the system.
          </p>
        </section>

        {/* Architecture */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldIcon className="text-green-400" /> The Architecture
          </h2>
          <p className="text-white/70 leading-relaxed">
            The system is split into three strictly isolated layers:
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            <li className="bg-black/20 p-4 rounded-lg border border-white/5">
              <strong className="text-white block mb-1 text-lg">1. Foundry (Kernel)</strong>
              <span className="text-white/60 text-sm">The core engine managing the Registry, Contexts, Windows, FileSystem, and Taskbar. Unopinionated about UI.</span>
            </li>
            <li className="bg-black/20 p-4 rounded-lg border border-white/5">
              <strong className="text-white block mb-1 text-lg">2. Shell (Desktop Environment)</strong>
              <span className="text-white/60 text-sm">The visual desktop, taskbar, start menu, and developer overlays. Bridges Foundry with User Space.</span>
            </li>
            <li className="bg-black/20 p-4 rounded-lg border border-white/5">
              <strong className="text-white block mb-1 text-lg">3. User Space (Applications)</strong>
              <span className="text-white/60 text-sm">Standalone, lazily-loaded applications (like this one) running in isolation, oblivious to the existence of others.</span>
            </li>
          </ul>
        </section>

        {/* Credits / Footer */}
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Pratham. Built with React, TypeScript, and Framer Motion.</p>
        </div>

      </div>
    </div>
  );
};

export default AboutApp;
