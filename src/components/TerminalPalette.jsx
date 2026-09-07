import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, FEATURED_PROJECTS } from '../data/githubData';
import PacmanPortfolioGame from './PacmanPortfolioGame';
import { Terminal, X, Command, CornerDownLeft, Sparkles, Gamepad2, Play } from 'lucide-react';

export default function TerminalPalette({ isOpen, onClose, onSelectProject, setAsciiMode }) {
  const [activeTab, setActiveTab] = useState('cli'); // 'cli' | 'game'
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Arpit Avasarmol CLI Terminal & Neural Core v2.0.0' },
    { type: 'system', text: 'Type "help" for commands, or type "game" to launch Cyber Pac-Man!' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && activeTab === 'cli') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    if (cmd === 'game' || cmd === 'play' || cmd === 'pacman' || cmd === 'start') {
      setActiveTab('game');
      newHistory.push({
        type: 'response',
        text: '🟡 Launching PAC-MAN Retro Arcade...'
      });
    } else if (cmd === 'help') {
      newHistory.push({
        type: 'response',
        text: `Available Commands:
  game / pacman - 🕹️ Play classic Pac-Man arcade mini-game!
  help          - Show this help message
  about         - Display bio & IIT Roorkee scholar info
  projects    - List featured repositories
  stats       - Show GitHub contribution metrics
  ascii       - Switch to ASCII Text Mode
  halftone    - Switch to Halftone Dot Mode
  matrix      - Switch to Cyber Matrix Rain Mode
  contact     - Display email & social profiles
  clear       - Clear terminal screen`
      });
    } else if (cmd === 'about') {
      newHistory.push({
        type: 'response',
        text: `${PROFILE.name} | ${PROFILE.education}
Bio: ${PROFILE.bio}
Philosophy: "${PROFILE.philosophy}"`
      });
    } else if (cmd === 'projects') {
      const projList = FEATURED_PROJECTS.map(p => `• ${p.name} - ${p.description.slice(0, 60)}...`).join('\n');
      newHistory.push({
        type: 'response',
        text: `Featured Repositories:\n${projList}`
      });
    } else if (cmd === 'stats') {
      newHistory.push({
        type: 'response',
        text: `GitHub Activity:
  - Contributions last year: ${PROFILE.stats.contributionsLastYear}
  - Active Days: ${PROFILE.stats.activeDays}
  - Best Week: ${PROFILE.stats.bestWeek}
  - Public Repos: ${PROFILE.stats.publicRepos}`
      });
    } else if (cmd === 'ascii' || cmd === 'halftone' || cmd === 'matrix') {
      if (setAsciiMode) setAsciiMode(cmd);
      newHistory.push({
        type: 'response',
        text: `[OK] Switched render effect mode to "${cmd}".`
      });
    } else if (cmd === 'contact') {
      newHistory.push({
        type: 'response',
        text: `Contact Info:
  - Email: ${PROFILE.socials.email}
  - LinkedIn: ${PROFILE.socials.linkedin}
  - GitHub: ${PROFILE.socials.github}`
      });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else {
      newHistory.push({
        type: 'response',
        text: `Command not recognized: "${cmd}". Type "help" or "game" to explore.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-mono animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#08090b] border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Terminal Header & Mode Tabs */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
          {/* Mac-style traffic dots + status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-bold text-gray-300 ml-1 hidden sm:inline">
              arpit@terminal:~
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('cli')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cli'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLI Terminal</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'game'
                  ? 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border border-yellow-400/40 text-yellow-300 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-yellow-400" />
              <span>Cyber Pac-Man</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-yellow-400/20 text-yellow-300 font-mono animate-pulse">
                PLAY
              </span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Content: CLI vs Game */}
        {activeTab === 'game' ? (
          <div className="py-1">
            <PacmanPortfolioGame
              onSelectProject={(proj) => {
                if (onSelectProject) onSelectProject(proj);
              }}
              onExitToCli={() => setActiveTab('cli')}
            />
          </div>
        ) : (
          <>
            {/* Terminal Output */}
            <div className="h-72 overflow-y-auto space-y-2 pr-2 text-xs leading-relaxed custom-scrollbar">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    item.type === 'user'
                      ? 'text-emerald-400 font-bold'
                      : item.type === 'system'
                      ? 'text-gray-400 italic'
                      : 'text-gray-200'
                  }`}
                >
                  {item.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-gray-400">
              <span className="text-gray-500">Quick:</span>
              {['game', 'help', 'projects', 'about', 'stats', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInput(cmd);
                  }}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 hover:border-white/30 transition-colors"
                >
                  ${cmd}
                </button>
              ))}
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-emerald-400 text-xs font-bold">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'game' to play mini-game, or 'help'..."
                className="flex-1 bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/15 transition-all"
              >
                <CornerDownLeft className="w-3 h-3" /> Run
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
