import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AsciiCanvas from './components/AsciiCanvas';
import ContributionStats from './components/ContributionStats';
import AboutStack from './components/AboutStack';
import WorkExperience from './components/WorkExperience';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectModal from './components/ProjectModal';
import TerminalPalette from './components/TerminalPalette';
import SkillWheelShowcase from './components/SkillWheelShowcase';
import Footer from './components/Footer';
import { PROFILE } from './data/githubData';
import { ArrowDown, Github, Mail, ExternalLink } from 'lucide-react';
import { useDynamicTab } from './hooks/useDynamicTab';

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer;
    if (!deleting && charIdx <= word.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx > word.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function App() {
  useDynamicTab();
  const [activeTag, setActiveTag] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const roles = useTypewriter([
    'AI Systems Engineer',
    'M.Tech Researcher',
    'RAG Architecture Builder',
    'Diffusion Model Expert',
    'Full-Stack Developer',
  ], 75, 1800);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e8f0] flex flex-col relative selection:bg-white selection:text-black bg-cyber-grid">

      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} scrollToSection={scrollToSection} />

      <main className="flex-1 w-full">

        {/* HERO SECTION */}
        <section id="hero" className="relative pt-16 md:pt-24 pb-12 overflow-hidden">

          {/* Subtle Dark Cyber Background Ambient Glow Orbs (Soft, Non-blinding) */}
          <div className="absolute -top-32 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/10 orb-pulse pointer-events-none" style={{ filter: 'blur(120px)' }} />
          <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/10 orb-pulse pointer-events-none" style={{ filter: 'blur(140px)', animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-purple-600/10 orb-pulse pointer-events-none" style={{ filter: 'blur(100px)', animationDelay: '1s' }} />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

              {/* Left Text Column */}
              <div className="flex-1 text-center lg:text-left space-y-6 order-2 lg:order-1">

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono ${loaded ? 'animate-fade-in-up delay-0' : 'opacity-0'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to Roles · IIT Roorkee
                </div>

                {/* Name with Blue & Pink Cyber Glitch Effects */}
                <div className={loaded ? 'animate-fade-in-up delay-100' : 'opacity-0'}>
                  <h1 className="group leading-[1.02] cursor-pointer space-y-1 select-none">
                    <span
                      className="glitch-blue block text-5xl sm:text-6xl md:text-7xl font-bold font-syne tracking-tight"
                      data-text="Arpit"
                      title="Arpit"
                    >
                      Arpit
                    </span>
                    <span
                      className="glitch-pink block text-5xl sm:text-6xl md:text-7xl font-bold font-syne tracking-tight"
                      data-text="Avasarmol"
                      title="Avasarmol"
                    >
                      Avasarmol
                    </span>
                  </h1>
                </div>

                {/* Typewriter role */}
                <div className={`flex items-center gap-2 justify-center lg:justify-start ${loaded ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                  <div className="w-6 h-px bg-white/30" />
                  <p className="text-sm font-mono text-gray-300 tracking-wide min-w-[220px]">
                    <span className="cursor-blink">{roles}</span>
                  </p>
                </div>

                {/* Tagline */}
                <p className={`text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 ${loaded ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
                  Researching <span className="text-white font-medium">Generative Diffusion Models</span> &amp;{' '}
                  <span className="text-white font-medium">Multi-Agent RAG Architectures</span> at IIT Roorkee.
                  Building scalable AI inference systems and production-grade vision pipelines.
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-wrap gap-3 justify-center lg:justify-start ${loaded ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold font-mono hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105"
                  >
                    <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    View GitHub
                  </a>
                  <a
                    href={`mailto:${PROFILE.socials.email}`}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-mono hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Contact Me
                  </a>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-mono hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Projects
                  </button>
                </div>

                {/* Quick Stats */}
                <div className={`flex items-center gap-8 justify-center lg:justify-start pt-2 ${loaded ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
                  {[
                    { value: PROFILE.stats.contributionsLastYear, label: 'Contributions' },
                    { value: PROFILE.stats.activeDays, label: 'Active Days' },
                    { value: '10+', label: 'Open Source Repos' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center group cursor-default">
                      <div className="text-2xl font-bold text-white font-syne group-hover:text-blue-300 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right ASCII Portrait (shifted down slightly for perfect vertical balance) */}
              <div className={`flex-shrink-0 w-full max-w-sm lg:max-w-[400px] order-1 lg:order-2 lg:pt-10 mt-4 lg:mt-6 ${loaded ? 'animate-slide-in-right delay-200' : 'opacity-0'}`}>
                <AsciiCanvas />
              </div>
            </div>

            {/* Scroll Hint */}
            <div className={`flex justify-center mt-14 ${loaded ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
              <button
                onClick={() => scrollToSection('stats')}
                className="flex flex-col items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors text-[10px] font-mono animate-float"
              >
                <ArrowDown className="w-4 h-4" />
                scroll
              </button>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="max-w-5xl mx-auto px-4"><div className="border-t border-white/[0.06]" /></div>

        {/* Contribution Stats */}
        <div id="stats" className="py-8 scroll-mt-20">
          <ContributionStats />
        </div>

        {/* About & Philosophy */}
        <AboutStack />

        <div className="max-w-5xl mx-auto px-4"><div className="border-t border-white/[0.06]" /></div>

        {/* Interactive Skill Wheel Showcase */}
        <SkillWheelShowcase onSelectProject={setSelectedProject} />

        <div className="max-w-5xl mx-auto px-4"><div className="border-t border-white/[0.06]" /></div>

        {/* Work Experience Section */}
        <WorkExperience />

        <div className="max-w-5xl mx-auto px-4"><div className="border-t border-white/[0.06]" /></div>

        {/* Projects Grid */}
        <ProjectsGrid activeTag={activeTag} onSelectProject={setSelectedProject} />

      </main>

      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <TerminalPalette
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={setSelectedProject}
      />
    </div>
  );
}
