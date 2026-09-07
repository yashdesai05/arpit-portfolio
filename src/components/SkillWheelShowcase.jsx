import React, { useState } from 'react';
import OptionWheel from './OptionWheel';
import { FEATURED_PROJECTS } from '../data/githubData';
import { Sparkles, ExternalLink, Star, ArrowUpRight, Cpu, Terminal } from 'lucide-react';

export default function SkillWheelShowcase({ onSelectProject }) {
  const skillList = [
    'Python',
    'PyTorch',
    'LangGraph',
    'LangChain',
    'vLLM',
    'FastAPI',
    'Diffusion Models',
    'Vector DBs',
    'OpenCV',
    'Docker'
  ];

  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const selectedSkill = skillList[selectedSkillIndex];

  const relatedProjects = FEATURED_PROJECTS.filter(project => {
    const s = selectedSkill.toLowerCase();
    return (
      project.tags.some(t => t.toLowerCase().includes(s) || s.includes(t.toLowerCase())) ||
      (project.language && project.language.toLowerCase().includes(s)) ||
      project.description.toLowerCase().includes(s) ||
      (project.readmeSnippet && project.readmeSnippet.toLowerCase().includes(s))
    );
  });

  return (
    <section id="skills" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 scroll-mt-20">
      {/* ── Section Header (Unified Editorial Hierarchy) ── */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase block">
          02 / Technical Arsenal
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-syne tracking-tight">
          Skills &amp; Frameworks
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
          Interactive dial to explore core competencies across generative diffusion, deep learning, agentic RAG, and production systems.
        </p>
      </div>

      {/* 2-Column Wheel + Projects Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090b10] border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">

        {/* ── LEFT COLUMN: ReactBits OptionWheel Component ── */}
        <div className="lg:col-span-5 bg-black/80 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between w-full border-b border-white/10 pb-2 px-2">
            <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SKILL_DIAL.EXE
            </span>
            <span className="text-[10px] font-mono text-gray-400 px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
              Drag / Scroll ↑↓
            </span>
          </div>

          {/* ReactBits OptionWheel */}
          <OptionWheel
            items={skillList}
            defaultSelected={0}
            textColor="#a6a6a6"
            activeColor="#ffffff"
            side="left"
            fontSize={1.75}
            spacing={1.5}
            curve={0.4}
            tilt={2}
            blur={0}
            fade={0.25}
            smoothing={200}
            inset={30}
            loop={true}
            draggable={true}
            onChange={(index, item) => setSelectedSkillIndex(index)}
          />
        </div>

        {/* ── RIGHT COLUMN: Dynamic Projects List ── */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-syne flex items-center gap-2">
              Projects Powered by <span className="text-cyan-300 underline underline-offset-4 decoration-cyan-400 font-mono">{selectedSkill}</span>
            </h3>
            <span className="text-xs font-mono text-gray-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 font-bold">
              {relatedProjects.length} Repositories
            </span>
          </div>

          {/* Projects Display */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {relatedProjects.length > 0 ? (
              relatedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="group relative p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer space-y-3 shadow-lg hover:shadow-cyan-500/10 overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 font-syne flex items-center gap-1.5 truncate min-w-0 flex-1" title={project.name}>
                      <span className="truncate">{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </h4>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 flex-shrink-0 font-semibold">
                      {project.language}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 font-mono text-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[9px] bg-white/5 text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-gray-400 text-[11px]">
                      <span className="flex items-center gap-1 text-amber-300">
                        <Star className="w-3 h-3 fill-amber-400" /> {project.stars}
                      </span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-white flex items-center gap-1"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center font-mono text-xs text-gray-400 border border-dashed border-white/15 rounded-2xl space-y-2">
                <Terminal className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <p className="text-gray-300">Multiple internal research scripts &amp; IIT Roorkee thesis experiments use <strong className="text-white">{selectedSkill}</strong>.</p>
                <p className="text-[10px] text-gray-500">Select another skill on the wheel to view public repositories.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
