import React, { useState } from 'react';
import {
  Search,
  Box,
  RotateCw,
  Sparkles
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/githubData';
import Project3DCarousel from './Project3DCarousel';

export default function ProjectsGrid({ activeTag, onSelectProject }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: FEATURED_PROJECTS.length },
    { id: 'rag', label: 'Agentic RAG & LLMs', count: 3 },
    { id: 'vision', label: 'Vision & Diffusion', count: 2 },
    { id: 'systems', label: 'Systems & LLMOps', count: 3 }
  ];

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    // External active tag filter
    const matchesTag =
      !activeTag ||
      project.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
      (project.language && project.language.toLowerCase() === activeTag.toLowerCase());

    // Category tab filter
    let matchesTab = true;
    if (activeFilter === 'rag') {
      matchesTab = project.tags.some((t) =>
        ['agentic-rag', 'rag', 'langgraph', 'langchain', 'agentic ai'].includes(t.toLowerCase())
      );
    }
    if (activeFilter === 'vision') {
      matchesTab = project.tags.some((t) =>
        ['diffusion models', 'opencv', 'satellite vision', 'computer vision'].includes(t.toLowerCase())
      );
    }
    if (activeFilter === 'systems') {
      matchesTab = project.tags.some((t) =>
        ['vllm', 'vectordb', 'llmops', 'bert', 'vector-search', 'system-design'].includes(t.toLowerCase())
      );
    }

    // Search query
    const matchesSearch =
      !search ||
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesTag && matchesTab && matchesSearch;
  });

  return (
    <section id="projects" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-10 scroll-mt-20">
      
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase">
              04 / Selected Works
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
              <Box className="w-3 h-3 text-white" />
              3D Interactive Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-syne tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
            Open-source agentic platforms, generative diffusion thesis research at <span className="text-zinc-200 font-medium">IIT Roorkee</span>, and production LLMOps benchmarks.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stack, repos or tags…"
            className="w-full bg-[#0c0e14] border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white font-mono"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Tabs Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0b0d13] border border-zinc-800/80 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                  isSelected
                    ? 'bg-white text-black border-white font-semibold shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-Spin Toggle Button in Top Bar */}
        <button
          type="button"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
            isAutoPlay
              ? 'bg-white text-black border-white font-bold shadow-md shadow-white/20'
              : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
          }`}
          title="Toggle Auto Spin"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoPlay ? 'animate-spin' : ''}`} />
          <span>{isAutoPlay ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
        </button>
      </div>

      {/* ── 3D COVERFLOW CAROUSEL VIEW (Locked to Obsidian Theme) ── */}
      <Project3DCarousel
        projects={filteredProjects}
        theme="obsidian"
        isAutoPlay={isAutoPlay}
        onSelectProject={onSelectProject}
      />

      {/* Empty State when no project matches search */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-zinc-500 font-mono text-xs border border-dashed border-zinc-800 rounded-2xl space-y-2">
          <p>No repositories found matching "{search}".</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveFilter('all');
            }}
            className="text-white hover:underline text-xs"
          >
            Reset search
          </button>
        </div>
      )}

    </section>
  );
}
