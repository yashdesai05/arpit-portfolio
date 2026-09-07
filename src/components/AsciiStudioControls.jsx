import React, { useState } from 'react';
import { Sliders, Eye, RefreshCw, Image as ImageIcon, Sparkles, Type } from 'lucide-react';

export default function AsciiStudioControls({
  mode,
  setMode,
  density,
  setDensity,
  contrast,
  setContrast,
  colorTint,
  setColorTint,
  imageSource,
  setImageSource,
  headlineText,
  setHeadlineText
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-2 font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono tracking-wider text-gray-300 transition-all duration-200 hover:border-white/30 shadow-lg"
      >
        <Sliders className="w-3.5 h-3.5 text-blue-400" />
        <span>{isOpen ? 'Close Studio Controls' : 'Customize ASCII & Portfolio Settings'}</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </button>

      {isOpen && (
        <div className="mt-3 p-5 rounded-2xl bg-[#0d0f14]/95 backdrop-blur-md border border-white/15 shadow-2xl transition-all duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>ASCII Text Shader Studio</span>
            </h3>
            <button
              onClick={() => {
                setMode('ascii');
                setDensity(85);
                setContrast(1.8);
                setColorTint('monochrome');
                setImageSource('/avatar_face.jpg');
                setHeadlineText('ARPIT AVASARMOL');
              }}
              className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          {/* Headline Text Input */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-emerald-400" /> Portfolio Headline Title
            </label>
            <input
              type="text"
              value={headlineText}
              onChange={(e) => setHeadlineText(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs font-serif-title text-white focus:outline-none focus:border-white/40 uppercase"
              placeholder="e.g. ARPIT AVASARMOL"
            />
          </div>

          {/* Image Source / Framing Selector */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Face Portrait Framing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '/avatar_face.jpg', label: 'Full Face (Clear)' },
                { id: '/avatar_cropped.jpg', label: 'Half-Body Crop' },
                { id: '/avatar.jpg', label: 'Full Photo' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setImageSource(item.id)}
                  className={`py-2 px-2 text-[11px] rounded-lg border transition-all ${
                    imageSource === item.id
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Selector */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" /> ASCII Character Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ascii', label: 'ASCII Text Grid' },
                { id: 'halftone', label: 'Halftone Dot Grid' },
                { id: 'matrix', label: 'Matrix Code Rain' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className={`py-2 px-2 text-[11px] rounded-lg border transition-all ${
                    mode === item.id
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>ASCII Grid Resolution:</span>
                <span className="text-white font-bold">{density} cols</span>
              </div>
              <input
                type="range"
                min="50"
                max="130"
                step="5"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-white bg-white/10 rounded cursor-pointer h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Facial Feature Contrast:</span>
                <span className="text-white font-bold">{contrast.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-white bg-white/10 rounded cursor-pointer h-1.5"
              />
            </div>
          </div>

          {/* Color Tint */}
          <div className="space-y-1 pt-1">
            <label className="text-xs text-gray-400">ASCII Character Tint:</label>
            <div className="flex gap-2">
              {[
                { id: 'monochrome', label: 'Silver Monochrome', class: 'bg-zinc-200 text-black' },
                { id: 'green', label: 'Matrix Green', class: 'bg-emerald-400 text-black' },
                { id: 'cyan', label: 'Cyber Cyan', class: 'bg-cyan-400 text-black' },
                { id: 'amber', label: 'Terminal Amber', class: 'bg-amber-400 text-black' }
              ].map((tint) => (
                <button
                  key={tint.id}
                  onClick={() => setColorTint(tint.id)}
                  className={`px-2.5 py-1 text-[11px] rounded border transition-all ${
                    colorTint === tint.id
                      ? `${tint.class} border-white font-bold`
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {tint.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
