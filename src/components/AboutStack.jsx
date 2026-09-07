import React from 'react';
import { GraduationCap, Lightbulb } from 'lucide-react';
import { PROFILE } from '../data/githubData';

export default function AboutStack() {
  return (
    <section id="about" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 scroll-mt-20">
      {/* ── Section Header (Unified Editorial Hierarchy) ── */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase block">
          01 / Philosophy &amp; Research
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-syne tracking-tight">
          About &amp; Thesis
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
          Academic specialization at IIT Roorkee and engineering principles for scalable AI systems.
        </p>
      </div>

      {/* Bio & Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Academic Bio */}
        <div className="p-6 rounded-2xl bg-[#0d0f14] border border-white/10 shadow-xl space-y-4 hover:border-white/25 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-syne">M.Tech Scholar @ IIT Roorkee</h2>
              <p className="text-xs font-mono text-gray-400">Department of Computer Science &amp; Engineering</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Researching <strong className="text-white">Generative Diffusion Models for Industrial Anomaly Detection</strong> and
            engineering production-grade <strong className="text-white">Multi-Agent RAG Architectures</strong>.
            Focused on scalable LLM inference and edge-ready vision models.
          </p>
        </div>

        {/* Engineering Philosophy */}
        <div className="p-6 rounded-2xl bg-[#0d0f14] border border-white/10 shadow-xl space-y-4 hover:border-white/25 transition-all group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-syne">Engineering Philosophy</h2>
              <p className="text-xs font-mono text-gray-400">Core Principles &amp; Execution Focus</p>
            </div>
          </div>
          <blockquote className="text-xs text-gray-300 italic border-l-2 border-purple-400/50 pl-3 py-1 font-serif-title text-sm">
            "{PROFILE.philosophy}"
          </blockquote>
          <p className="text-xs text-gray-400 leading-relaxed">
            I prioritize building clean, modular software that solves real technical bottlenecks over hype.
            From local vector indices to vLLM inference microservices.
          </p>
        </div>

      </div>
    </section>
  );
}
