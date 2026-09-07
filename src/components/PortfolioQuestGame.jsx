import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROFILE, FEATURED_PROJECTS } from '../data/githubData';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  FolderGit2,
  GraduationCap,
  Zap,
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';

// 8-bit sound effects using Web Audio API
class RetroAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }
  playTone(freq, type = 'square', duration = 0.08, vol = 0.04) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not permitted or suspended
    }
  }
  move() { this.playTone(220, 'sine', 0.04, 0.02); }
  collect() {
    this.playTone(587.33, 'triangle', 0.06, 0.05);
    setTimeout(() => this.playTone(880, 'triangle', 0.1, 0.05), 60);
  }
  milestone() {
    [440, 554, 659, 880].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'square', 0.1, 0.06), i * 70);
    });
  }
  win() {
    [523, 659, 784, 1046, 1318].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.2, 0.07), i * 110);
    });
  }
}

const audio = new RetroAudio();

const GRID_COLS = 13;
const GRID_ROWS = 9;

// Milestones corresponding to Arpit's real credentials & projects
const MILESTONES = [
  {
    id: 'm1',
    x: 2,
    y: 2,
    symbol: '⚡',
    code: '[PRJ-1]',
    name: 'Industrial Diffusion Studio',
    category: 'Computer Vision & GenAI',
    role: 'Lead Architect',
    description: 'Generative diffusion pipeline engineered for industrial defect synthesis, zero-shot anomaly localization, and latent feature extraction.',
    stats: '99.2% Detection Rate · PyTorch / Diffusers',
    tags: ['Diffusion Models', 'PyTorch', 'FastAPI', 'CUDA'],
    projectData: FEATURED_PROJECTS[0] || null,
    github: PROFILE.socials.github
  },
  {
    id: 'm2',
    x: 10,
    y: 2,
    symbol: '🤖',
    code: '[PRJ-2]',
    name: 'Multi-Agent Autonomous RAG',
    category: 'LLM & Systems Architecture',
    role: 'Core Developer',
    description: 'Self-reflective hierarchical multi-agent retrieval system with hybrid vector indexing, graph context routing, and sub-100ms inference.',
    stats: '10x Faster Retrieval · LangGraph / vLLM',
    tags: ['LangGraph', 'Qdrant', 'vLLM', 'FastAPI'],
    projectData: FEATURED_PROJECTS[1] || null,
    github: PROFILE.socials.github
  },
  {
    id: 'm3',
    x: 2,
    y: 6,
    symbol: '🎓',
    code: '[IITR]',
    name: 'IIT Roorkee M.Tech Research',
    category: 'Academic & Thesis Lab',
    role: 'Graduate Researcher',
    description: 'Pursuing M.Tech in Computer Science & Engineering at Indian Institute of Technology Roorkee. Research in Generative AI & High-Performance Computing.',
    stats: 'IIT Roorkee · Dept of CSE',
    tags: ['IIT Roorkee', 'Deep Learning', 'Research Paper', 'HPC'],
    projectData: null,
    github: PROFILE.socials.github
  },
  {
    id: 'm4',
    x: 10,
    y: 6,
    symbol: '🧠',
    code: '[CUDA]',
    name: 'GPU Systems & CUDA Acceleration',
    category: 'High Performance Inference',
    role: 'Systems Engineer',
    description: 'Optimizing deep learning kernels, FP16/INT8 quantization, TensorRT acceleration, and distributed multi-GPU training workloads.',
    stats: 'Low-latency Inference · CUDA / PyTorch',
    tags: ['CUDA', 'TensorRT', 'PyTorch', 'Distributed AI'],
    projectData: null,
    github: PROFILE.socials.github
  },
  {
    id: 'm5',
    x: 6,
    y: 1,
    symbol: '🌐',
    code: '[STACK]',
    name: 'Full-Stack AI Production Core',
    category: 'Full-Stack AI Engineering',
    role: 'Full-Stack Developer',
    description: 'Building end-to-end modern AI web apps with React, Tailwind CSS, TypeScript, FastAPI, Redis queues, and Dockerized microservices.',
    stats: 'Production Ready · React / Docker / FastAPI',
    tags: ['React', 'FastAPI', 'Docker', 'TailwindCSS'],
    projectData: null,
    github: PROFILE.socials.github
  },
  {
    id: 'm6',
    x: 6,
    y: 7,
    symbol: '🏆',
    code: '[GITH]',
    name: 'GitHub Open-Source Engine',
    category: 'Contributions & Repos',
    role: 'Open-Source Contributor',
    description: `${PROFILE.stats.contributionsLastYear} contributions across ${PROFILE.stats.publicRepos} public repositories with consistent daily commits and active community tools.`,
    stats: `${PROFILE.stats.contributionsLastYear} Commits · ${PROFILE.stats.activeDays} Active Days`,
    tags: ['Open Source', 'Git', 'CI/CD', 'GitHub'],
    projectData: null,
    github: PROFILE.socials.github
  }
];

const INITIAL_SHARDS = [
  { id: 's1', x: 4, y: 3 },
  { id: 's2', x: 8, y: 3 },
  { id: 's3', x: 4, y: 5 },
  { id: 's4', x: 8, y: 5 },
  { id: 's5', x: 6, y: 4 },
];

export default function PortfolioQuestGame({ onSelectProject, onExitToCli }) {
  const [player, setPlayer] = useState({ x: 6, y: 4 });
  const [discoveredMilestones, setDiscoveredMilestones] = useState([]);
  const [shards, setShards] = useState(INITIAL_SHARDS);
  const [score, setScore] = useState(0);
  const [activeIntel, setActiveIntel] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [hudMessage, setHudMessage] = useState('Use Arrow keys / WASD to navigate Arpit\'s Neural Matrix!');
  const boardRef = useRef(null);

  // Toggle Mute
  const toggleMute = () => {
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Reset Game
  const resetGame = () => {
    setPlayer({ x: 6, y: 4 });
    setDiscoveredMilestones([]);
    setShards(INITIAL_SHARDS);
    setScore(0);
    setActiveIntel(null);
    setIsVictory(false);
    setHudMessage('Game reset. Explore the matrix to unlock Arpit\'s portfolio!');
    audio.collect();
  };

  // Movement Logic
  const movePlayer = useCallback((dx, dy) => {
    setPlayer((prev) => {
      const nextX = Math.max(0, Math.min(GRID_COLS - 1, prev.x + dx));
      const nextY = Math.max(0, Math.min(GRID_ROWS - 1, prev.y + dy));

      if (nextX === prev.x && nextY === prev.y) return prev;

      audio.move();

      // Check Shard Pickup
      setShards((prevShards) => {
        const foundIndex = prevShards.findIndex((s) => s.x === nextX && s.y === nextY);
        if (foundIndex !== -1) {
          audio.collect();
          setScore((sc) => sc + 150);
          setHudMessage('💎 Collected Data Shard! (+150 Neural Compute)');
          return prevShards.filter((_, i) => i !== foundIndex);
        }
        return prevShards;
      });

      // Check Milestone Interaction
      const steppedMilestone = MILESTONES.find((m) => m.x === nextX && m.y === nextY);
      if (steppedMilestone) {
        setActiveIntel(steppedMilestone);
        setDiscoveredMilestones((prevDisc) => {
          if (!prevDisc.includes(steppedMilestone.id)) {
            audio.milestone();
            const updated = [...prevDisc, steppedMilestone.id];
            setScore((sc) => sc + 500);
            setHudMessage(`🔓 Discovered: ${steppedMilestone.name}! (+500 XP)`);
            if (updated.length === MILESTONES.length) {
              setTimeout(() => {
                setIsVictory(true);
                audio.win();
              }, 400);
            }
            return updated;
          }
          return prevDisc;
        });
      }

      return { x: nextX, y: nextY };
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture if user is typing elsewhere
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        movePlayer(0, -1);
      } else if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        movePlayer(0, 1);
      } else if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        movePlayer(-1, 0);
      } else if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        movePlayer(1, 0);
      } else if (['Space', 'Enter'].includes(e.key)) {
        // If on a milestone, re-trigger modal or dismiss
        const onMilestone = MILESTONES.find((m) => m.x === player.x && m.y === player.y);
        if (onMilestone) {
          e.preventDefault();
          setActiveIntel(onMilestone);
        }
      } else if (e.key === 'Escape') {
        if (activeIntel) {
          e.preventDefault();
          setActiveIntel(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, player, activeIntel]);

  return (
    <div className="flex flex-col space-y-3 font-mono select-none" ref={boardRef}>
      {/* Game Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/90 border border-white/10 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-white tracking-wide flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
            ARPIT.OS // NEURAL RUNNER
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-400 hidden sm:inline">
            Milestones: <strong className="text-cyan-400">{discoveredMilestones.length}/{MILESTONES.length}</strong>
          </span>
          <span className="text-gray-400">
            Score: <strong className="text-emerald-400">{score}</strong>
          </span>
          <button
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={resetGame}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Restart Mission"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Game Stage + Intel Viewport */}
      <div className="relative bg-[#050608] border border-cyan-500/20 rounded-xl p-3 shadow-2xl overflow-hidden">
        {/* Subtle Cyber Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* 2D ASCII Grid World */}
        <div className="relative z-10 grid grid-cols-13 gap-1 w-full max-w-lg mx-auto aspect-[13/9] bg-black/70 border border-white/10 rounded-lg p-2 shadow-inner">
          {Array.from({ length: GRID_ROWS }).map((_, r) =>
            Array.from({ length: GRID_COLS }).map((_, c) => {
              const isPlayer = player.x === c && player.y === r;
              const milestone = MILESTONES.find((m) => m.x === c && m.y === r);
              const isDiscovered = milestone && discoveredMilestones.includes(milestone.id);
              const shard = shards.find((s) => s.x === c && s.y === r);

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => {
                    const dx = c - player.x;
                    const dy = r - player.y;
                    if (Math.abs(dx) + Math.abs(dy) === 1) movePlayer(dx, dy);
                  }}
                  className={`relative flex items-center justify-center rounded text-xs transition-all duration-100 ${
                    isPlayer
                      ? 'bg-cyan-500/20 border border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.6)] z-20 scale-110'
                      : milestone
                      ? isDiscovered
                        ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 cursor-pointer hover:scale-105'
                        : 'bg-indigo-950/50 border border-indigo-500/40 text-indigo-300 animate-pulse cursor-pointer hover:scale-105'
                      : shard
                      ? 'bg-amber-950/20 text-amber-400'
                      : 'hover:bg-white/[0.03] text-zinc-800'
                  }`}
                >
                  {isPlayer ? (
                    <span className="font-bold text-cyan-300 text-sm animate-bounce">
                      ⚡
                    </span>
                  ) : milestone ? (
                    <span className="text-xs" title={`${milestone.code} - ${milestone.name}`}>
                      {milestone.symbol}
                    </span>
                  ) : shard ? (
                    <span className="text-[11px] animate-pulse">✦</span>
                  ) : (
                    <span className="text-[9px] opacity-40">·</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic Status / Ticker */}
        <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-cyan-300 truncate mr-2 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">&gt;&gt;</span> {hudMessage}
          </span>
          <span className="text-gray-500 text-[10px] whitespace-nowrap hidden sm:inline">
            Use WASD / Arrows
          </span>
        </div>

        {/* Mobile / Clickable D-PAD Controls */}
        <div className="flex sm:hidden items-center justify-between mt-3 pt-2 border-t border-white/10">
          <span className="text-[10px] text-gray-500 font-mono">D-PAD:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => movePlayer(-1, 0)}
              className="p-2 rounded bg-white/10 active:bg-cyan-500/30 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => movePlayer(0, -1)}
                className="p-2 rounded bg-white/10 active:bg-cyan-500/30 text-white"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => movePlayer(0, 1)}
                className="p-2 rounded bg-white/10 active:bg-cyan-500/30 text-white"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => movePlayer(1, 0)}
              className="p-2 rounded bg-white/10 active:bg-cyan-500/30 text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Milestone Intel Card Overlay */}
        {activeIntel && (
          <div className="absolute inset-x-2 bottom-2 top-2 z-30 bg-black/95 backdrop-blur-md border border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between shadow-2xl animate-fade-in-up">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeIntel.symbol}</span>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
                      {activeIntel.category}
                    </span>
                    <h3 className="text-sm font-bold text-white font-syne leading-tight">
                      {activeIntel.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveIntel(null)}
                  className="px-2 py-0.5 rounded text-[11px] bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white"
                >
                  ESC ✕
                </button>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pt-1">
                {activeIntel.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{activeIntel.stats}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeIntel.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-gray-300 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              {activeIntel.projectData && onSelectProject && (
                <button
                  onClick={() => {
                    onSelectProject(activeIntel.projectData);
                    setActiveIntel(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold transition-all"
                >
                  <Cpu className="w-3.5 h-3.5" /> View Project Modal
                </button>
              )}
              <a
                href={activeIntel.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-all"
              >
                <FolderGit2 className="w-3.5 h-3.5" /> GitHub
              </a>
              <button
                onClick={() => setActiveIntel(null)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs transition-all"
              >
                Continue Mission
              </button>
            </div>
          </div>
        )}

        {/* Victory Screen Overlay */}
        {isVictory && (
          <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-syne">
                SYSTEM UNLOCKED: 100% DISCOVERY!
              </h2>
              <p className="text-xs text-emerald-400 font-mono">
                You've successfully explored all AI systems, research credentials &amp; repos of Arpit!
              </p>
            </div>

            <div className="text-xs text-gray-400 max-w-sm font-mono bg-zinc-900/90 border border-white/10 rounded-xl p-3 space-y-1">
              <div className="flex justify-between">
                <span>Final Score:</span>
                <strong className="text-white">{score} PTS</strong>
              </div>
              <div className="flex justify-between">
                <span>Credentials Verified:</span>
                <strong className="text-emerald-400">IIT Roorkee M.Tech</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-cyan-400">Ready for High-Impact AI Roles</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <a
                href={`mailto:${PROFILE.socials.email}?subject=Great%20Portfolio%20Game!%20Let's%20Connect`}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold font-mono hover:bg-gray-200 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Contact Arpit
              </a>
              <button
                onClick={resetGame}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all"
              >
                Play Again
              </button>
              {onExitToCli && (
                <button
                  onClick={onExitToCli}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-mono transition-all"
                >
                  Back to Terminal
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Instructions / Switcher */}
      <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
        <span className="flex items-center gap-1">
          <Terminal className="w-3 h-3 text-cyan-400" />
          Tip: Move onto nodes to inspect credentials &amp; repos.
        </span>
        {onExitToCli && (
          <button
            onClick={onExitToCli}
            className="hover:text-cyan-300 text-gray-400 underline decoration-dotted transition-colors"
          >
            Switch to Command Line →
          </button>
        )}
      </div>
    </div>
  );
}
