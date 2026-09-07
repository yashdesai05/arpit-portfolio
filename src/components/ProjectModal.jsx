import React, { useState } from 'react';
import { X, Github, ExternalLink, Star, GitFork, Copy, Check, Terminal, BookOpen, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const cloneCommand = `git clone ${project.githubUrl}.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0d0f14] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-5 text-gray-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{project.name}</h2>
              {project.highlight && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs font-sans text-gray-400 mt-1">{project.title}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="space-y-2 text-xs font-sans text-gray-300 leading-relaxed">
          <p className="font-semibold text-white">Repository Overview:</p>
          <p>{project.description}</p>

          {project.readmeSnippet && (
            <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-400 border-b border-white/10 pb-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-gray-300">README Highlight</span>
              </div>
              <p className="text-gray-300 pt-1 leading-relaxed">{project.readmeSnippet}</p>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="space-y-1.5">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Technologies:</span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Git Clone box */}
        <div className="space-y-1">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-emerald-400" /> Clone Repository
          </span>
          <div className="flex items-center justify-between bg-black/80 border border-white/10 rounded-lg p-2 text-xs font-mono">
            <span className="text-gray-300 truncate select-all">{cloneCommand}</span>
            <button
              onClick={handleCopyClone}
              className="ml-2 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1 shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>{project.stars} Stars</span>
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              <span>{project.forks} Forks</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold flex items-center gap-1 hover:bg-emerald-400 transition-colors text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white font-bold flex items-center gap-1 hover:bg-white/20 transition-colors border border-white/20 text-xs"
            >
              <Github className="w-3.5 h-3.5" /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
