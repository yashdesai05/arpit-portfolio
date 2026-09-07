import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  Linkedin,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/githubData';

export default function WorkExperience() {
  const [activeId, setActiveId] = useState(WORK_EXPERIENCE[0]?.id || 'meril-ai');
  const [expandedId, setExpandedId] = useState('meril-ai');
  const [scrollPercent, setScrollPercent] = useState(0);

  const containerRef = useRef(null);
  const milestoneRefs = useRef({});

  // Listen to scroll to activate the corresponding milestone in the sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through this section
      const totalDist = rect.height;
      const currentDist = windowHeight * 0.4 - rect.top;
      const pct = Math.max(0, Math.min(100, (currentDist / totalDist) * 100));
      setScrollPercent(pct);

      // Find closest card to viewport center
      let closestId = null;
      let minDistance = Infinity;

      WORK_EXPERIENCE.forEach((exp) => {
        const el = milestoneRefs.current[exp.id];
        if (el) {
          const cardRect = el.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const dist = Math.abs(cardCenter - windowHeight * 0.45);
          if (dist < minDistance) {
            minDistance = dist;
            closestId = exp.id;
          }
        }
      });

      if (closestId) {
        setActiveId(closestId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMilestone = (id) => {
    const el = milestoneRefs.current[id];
    if (el) {
      const offset = -100;
      const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" ref={containerRef} className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
      
      {/* 2-Column Editorial Grid: Left Sticky Nav + Right Flowing Story */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* ── LEFT COLUMN: Sticky Overview & Milestone Tracker (Desktop) ── */}
        <div className="w-full lg:w-[32%] lg:sticky lg:top-24 space-y-8 self-start">
          
          <div className="space-y-3">
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase block">
              03 / Chronology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-syne tracking-tight">
              Work Experience
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Career trajectory across generative diffusion modeling, agentic systems, M.Tech research at <span className="text-zinc-200 font-medium">IIT Roorkee</span>, and enterprise backend engineering.
            </p>
          </div>

          {/* Clean Human-Crafted Milestone Index */}
          <div className="relative pl-5 border-l border-zinc-800 space-y-4 pt-1">
            
            {/* Smooth glowing indicator track along the border */}
            <div 
              className="absolute left-0 top-0 w-[2px] bg-white transition-all duration-300 ease-out"
              style={{ height: `${Math.max(10, scrollPercent)}%` }}
            />

            {WORK_EXPERIENCE.map((exp, idx) => {
              const isActive = activeId === exp.id;
              const isCurrent = exp.status === 'Current';

              return (
                <button
                  key={exp.id}
                  onClick={() => scrollToMilestone(exp.id)}
                  className={`group w-full text-left transition-all duration-200 block ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-0.5">
                    <span className={`font-semibold ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                      {exp.period.split(' ')[0]} — {exp.period.includes('Present') ? 'Now' : exp.period.split(' - ')[1]}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <div className={`text-sm font-syne font-medium truncate transition-colors ${
                    isActive ? 'text-zinc-100 font-bold' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}>
                    {exp.companyFull || exp.organization}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate font-sans">
                    {exp.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Resume / LinkedIn link */}
          <div className="pt-2">
            <a
              href="https://linkedin.com/in/arpit-avasarmol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>
          </div>

        </div>

        {/* ── RIGHT COLUMN: Detailed Milestone Cards ── */}
        <div className="w-full lg:w-[68%] space-y-8">
          
          {WORK_EXPERIENCE.map((exp) => {
            const isActive = activeId === exp.id;
            const isCurrent = exp.status === 'Current';
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                ref={(el) => (milestoneRefs.current[exp.id] = el)}
                className={`p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border transition-all duration-300 relative ${
                  isActive
                    ? 'border-zinc-700 shadow-2xl shadow-black/60'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                {/* Header: Company & Dates */}
                <div className="space-y-3 border-b border-zinc-800/80 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {exp.period}
                    </span>

                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current Role
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-zinc-500">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-syne leading-snug">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-mono text-zinc-400">
                      <span className="text-zinc-200 font-semibold">{exp.companyFull || exp.organization}</span>
                      <span>·</span>
                      <span className="text-zinc-400">{exp.location}</span>
                      <span>·</span>
                      <span className="text-zinc-500">({exp.mode})</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="pt-5 space-y-4">
                  
                  {/* Summary Narrative */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {exp.summary}
                  </p>

                  {/* For Grouped / Academic Roles (IIT Roorkee) */}
                  {exp.isGrouped && exp.subRoles ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {exp.subRoles.map((sr) => (
                        <div
                          key={sr.id}
                          className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-white font-syne truncate">
                              {sr.role}
                            </h4>
                            <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                              {sr.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {sr.summary}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Key Deliverables */
                    exp.highlights && (
                      <div className="space-y-2.5 pt-1">
                        <ul className="space-y-2">
                          {(isExpanded ? exp.highlights : exp.highlights.slice(0, 2)).map((item, i) => (
                            <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {exp.highlights.length > 2 && (
                          <button
                            onClick={() => toggleExpand(exp.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors pt-1"
                          >
                            {isExpanded ? (
                              <>Show less <ChevronUp className="w-3 h-3" /></>
                            ) : (
                              <>+{exp.highlights.length - 2} more accomplishments <ChevronDown className="w-3 h-3" /></>
                            )}
                          </button>
                        )}
                      </div>
                    )
                  )}

                  {/* Clean Technical Skills Pills */}
                  {exp.skills && (
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:text-zinc-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
