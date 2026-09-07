import React, { useState, useEffect } from 'react';
import { Terminal, Github, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/githubData';

const NAV_ITEMS = [
  { id: 'hero', label: 'Overview' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stats', label: 'Contributions' }
];

export default function Navbar({ onOpenTerminal, scrollToSection }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (scrollToSection) {
      scrollToSection(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090b]/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40'
          : 'bg-[#08090b]/70 backdrop-blur-md border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center group-hover:border-white/40 transition-all">
            <span className="font-syne font-bold text-white text-xs tracking-wider">
              AA
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white font-syne group-hover:text-gray-200 transition-colors">
                {PROFILE.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Open to Roles</span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 hidden md:block">
              M.Tech AI Scholar · IIT Roorkee
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-150 relative py-1 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Terminal / CLI Palette Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-xs font-mono text-gray-300 hover:text-white transition-all shadow-sm group"
            title="Open CLI Terminal & Arcade (Cmd+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] bg-white/10 rounded text-gray-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Profile */}
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 md:hidden transition-colors"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08090b]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-3 font-mono text-xs animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white/10 text-white font-medium border border-white/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-400' : 'bg-white/20'
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs w-full justify-center transition-all"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Open CLI Terminal &amp; Arcade (⌘K)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
