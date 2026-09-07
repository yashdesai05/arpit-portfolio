import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  ExternalLink,
  Github,
  Play,
  ArrowUpRight,
  Maximize2,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Hand
} from 'lucide-react';

export default function Project3DCarousel({
  projects,
  theme = 'obsidian',
  isAutoPlay = false,
  onSelectProject
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const containerRef = useRef(null);

  const total = projects.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDragging) return;
    const interval = setInterval(nextCard, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, isDragging, total]);

  // ── MOUSE DRAG HANDLERS (Rotate with Hand) ──
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 5) {
      hasDraggedRef.current = true;
    }
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 45) {
      prevCard();
    } else if (dragOffset < -45) {
      nextCard();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsHovered(false);
  };

  // ── TOUCH SWIPE HANDLERS (Mobile / Touchscreen) ──
  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    setIsDragging(true);
    dragStartXRef.current = e.touches[0].clientX;
    hasDraggedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    if (Math.abs(delta) > 5) {
      hasDraggedRef.current = true;
    }
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Obsidian Theme styling
  const currentTheme = {
    accent: 'text-zinc-200',
    borderActive: 'border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.1)]',
    badgeBg: 'bg-white/10 text-zinc-200 border-white/20',
    glow: 'from-white/15 via-zinc-800/10 to-transparent',
    btnPrimary: 'bg-white text-black hover:bg-zinc-200 shadow-white/20',
    dotActive: 'bg-white shadow-white/50',
  };

  // Individual category metadata
  const getCategoryMeta = (tags = []) => {
    const tagStr = tags.join(' ').toLowerCase();
    if (tagStr.includes('diffusion') || tagStr.includes('vision') || tagStr.includes('opencv')) {
      return {
        label: 'Vision & Diffusion Research',
        color: 'from-purple-500 to-indigo-500',
        textColor: 'text-purple-300',
        badge: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
        icon: Sparkles
      };
    }
    if (tagStr.includes('rag') || tagStr.includes('langgraph') || tagStr.includes('langchain')) {
      return {
        label: 'Agentic RAG Platform',
        color: 'from-cyan-500 to-blue-500',
        textColor: 'text-cyan-300',
        badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
        icon: Cpu
      };
    }
    if (tagStr.includes('vllm') || tagStr.includes('vectordb') || tagStr.includes('system') || tagStr.includes('llmops')) {
      return {
        label: 'Systems & High-Throughput Ops',
        color: 'from-emerald-500 to-teal-500',
        textColor: 'text-emerald-300',
        badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
        icon: Layers
      };
    }
    return {
      label: 'Deep Learning & NLP',
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-300',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
      icon: Code2
    };
  };

  if (!projects || projects.length === 0) return null;

  // Real-time drag translation offset
  const dragShift = isDragging ? dragOffset * 0.45 : 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-4 select-none"
    >
      {/* ── Left Navigation Arrow Button (Prominent & Always Visible) ── */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevCard();
        }}
        className="absolute left-1 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0c0e14]/95 hover:bg-white text-white hover:text-black border-2 border-white/30 hover:border-white shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group cursor-pointer"
        title="Previous Project (Rotate Left)"
        aria-label="Previous Project"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
      </button>

      {/* ── Right Navigation Arrow Button (Prominent & Always Visible) ── */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextCard();
        }}
        className="absolute right-1 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0c0e14]/95 hover:bg-white text-white hover:text-black border-2 border-white/30 hover:border-white shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group cursor-pointer"
        title="Next Project (Rotate Right)"
        aria-label="Next Project"
      >
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>

      {/* ── 3D Scene Viewport with Hand Grab Cursor ── */}
      <div
        className={`relative w-full h-[490px] sm:h-[460px] flex items-center justify-center px-12 sm:px-20 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1100px' }}
      >
        {projects.map((project, idx) => {
          // Calculate offset relative to active card
          let offset = idx - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // 3D positioning parameters with live hand drag physics
          let baseTranslateX = offset * 270;
          if (typeof window !== 'undefined' && window.innerWidth < 640) {
            baseTranslateX = offset * 180;
          }
          const translateX = baseTranslateX + dragShift;
          const translateZ = isActive ? 80 : -Math.abs(offset) * 140;
          const rotateY = offset * -26 + (isDragging ? dragOffset * 0.05 : 0);
          const opacity = isActive ? 1 : Math.max(0.25, 1 - Math.abs(offset) * 0.38);
          const scale = isActive ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.12);
          const zIndex = 30 - Math.abs(offset) * 10;

          const cat = getCategoryMeta(project.tags);
          const CatIcon = cat.icon;

          return (
            <div
              key={project.id}
              onClick={(e) => {
                if (hasDraggedRef.current) return;
                if (!isActive) setActiveIndex(idx);
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease',
              }}
              className={`absolute top-0 w-[310px] sm:w-[370px] md:w-[420px] h-[450px] sm:h-[430px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl border transition-shadow duration-300 ${
                isActive
                  ? `bg-[#0d1017]/95 ${currentTheme.borderActive} shadow-2xl ring-1 ring-white/15`
                  : 'bg-[#090b10]/80 border-white/10 hover:border-white/25'
              }`}
            >
              {/* Subtle Ambient Glow Behind Active Card */}
              {isActive && (
                <div
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-b ${currentTheme.glow} pointer-events-none -z-10 blur-xl opacity-75`}
                />
              )}

              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${cat.badge}`}>
                    <CatIcon className="w-3 h-3" />
                    <span className="truncate max-w-[170px] sm:max-w-none">{cat.label}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-300 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {project.stars}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {project.language}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-syne tracking-tight group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {project.title || project.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">
                    repo: {project.name}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Card Mid: Tags */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-500 self-center">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>

                {/* Active Card Quick Actions */}
                {isActive ? (
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject && onSelectProject(project);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${currentTheme.btnPrimary}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Deep Dive &amp; Arch</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-zinc-300 hover:text-white hover:bg-white/15 transition-all"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all"
                        title="Live Interactive Demo"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-xs font-mono text-zinc-500 pt-3 border-t border-white/5">
                    <span>Click or drag to rotate into center</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Centered Bottom Indicator Dots & Hand Rotation Hint ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 px-4">
        {/* Indicator dots */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? `w-6 ${currentTheme.dotActive}`
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Hand drag hint */}
        <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
          <Hand className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
          <span>Drag with hand or click arrows to rotate</span>
        </span>
      </div>
    </div>
  );
}
