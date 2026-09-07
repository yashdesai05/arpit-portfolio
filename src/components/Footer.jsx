import React from 'react';
import { PROFILE } from '../data/githubData';
import { Github, Heart, Terminal } from 'lucide-react';

export default function Footer({ onOpenTerminal }) {
  return (
    <footer className="w-full border-t border-white/10 py-10 mt-16 font-mono text-xs text-gray-500 bg-[#050608]">
      <div className="max-w-xl mx-auto px-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-4 text-gray-400">
          <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            github.com/{PROFILE.username}
          </a>
          <span>•</span>
          <button onClick={onOpenTerminal} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" /> cli mode
          </button>
        </div>

        <p className="text-[11px] text-gray-500 font-sans">
          Designed for <strong className="text-gray-300 font-mono">{PROFILE.name}</strong> • IIT Roorkee Scholar
        </p>

        <p className="text-[10px] text-gray-600">
          © {new Date().getFullYear()} Arpit Avasarmol. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
