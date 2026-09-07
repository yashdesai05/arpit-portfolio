import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, CONTRIBUTION_SPARKLINE } from '../data/githubData';

// Animated counter hook
function useCountUp(target, duration = 1200, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function ContributionStats() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [statsRef, statsInView] = useInView(0.3);

  const total   = Number(PROFILE.stats.contributionsLastYear) || 751;
  const active  = Number(PROFILE.stats.activeDays)            || 93;
  const best    = Number(PROFILE.stats.bestWeek)              || 125;

  const countTotal  = useCountUp(total,  1400, statsInView);
  const countActive = useCountUp(active, 1200, statsInView);
  const countBest   = useCountUp(best,   1000, statsInView);

  // SVG sparkline
  const maxVal = Math.max(...CONTRIBUTION_SPARKLINE.map(d => d.count));
  const svgW = 500, svgH = 60;
  const pts = CONTRIBUTION_SPARKLINE.map((d, i) => ({
    x: (i / (CONTRIBUTION_SPARKLINE.length - 1)) * svgW,
    y: svgH - (d.count / maxVal) * (svgH - 10),
    d,
  }));
  const line = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, '');
  const area = `${line} L ${svgW},${svgH} L 0,${svgH} Z`;

  return (
    <div ref={statsRef} className="w-full max-w-xl mx-auto px-6 space-y-5 py-4">

      {/* Count-up numbers */}
      <div className="flex items-end justify-between">
        <div>
          <span
            className="font-syne text-6xl md:text-7xl font-bold text-white"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
          >
            {statsInView ? countTotal : 0}
          </span>
          <p className="text-xs font-mono text-gray-500 mt-1 tracking-wider">contributions in the last year</p>
        </div>
        <div className="text-right font-mono text-xs space-y-1">
          <div className="text-gray-400">
            <span className="text-white font-bold text-sm mr-1">{statsInView ? countActive : 0}</span>active days
          </div>
          <div className="text-gray-400">
            <span className="text-white font-bold text-sm mr-1">{statsInView ? countBest : 0}</span>best week
          </div>
        </div>
      </div>

      {/* Animated sparkline */}
      <div className="relative w-full">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full overflow-visible">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            {/* Animated line draw */}
            <style>{`
              @keyframes drawLine {
                from { stroke-dashoffset: 1000; }
                to   { stroke-dashoffset: 0; }
              }
              .spark-line {
                stroke-dasharray: 1000;
                stroke-dashoffset: ${statsInView ? 0 : 1000};
                animation: ${statsInView ? 'drawLine 1.5s ease forwards' : 'none'};
              }
            `}</style>
          </defs>
          <path d={area} fill="url(#sparkGrad)" />
          <path d={line} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" className="spark-line" />
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y}
              r={hoveredPoint === i ? 5 : 2.5}
              fill="#fff" stroke="#000" strokeWidth="1.5"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>
        {hoveredPoint !== null && (
          <div
            className="absolute -top-7 bg-white text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg pointer-events-none animate-fade-in"
            style={{ left: `${(pts[hoveredPoint].x / svgW) * 100}%`, transform: 'translateX(-50%)' }}
          >
            {pts[hoveredPoint].d.week}: {pts[hoveredPoint].d.count}
          </div>
        )}
      </div>

      {/* Social links */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-mono border-b border-white/10 pb-5">
        {[
          { label: PROFILE.socials.website, href: `https://${PROFILE.socials.website}` },
          { label: 'instagram',             href: PROFILE.socials.instagram },
          { label: 'linkedin',              href: PROFILE.socials.linkedin },
          { label: 'email',                 href: `mailto:${PROFILE.socials.email}` },
        ].map((link, i) => (
          <React.Fragment key={link.label}>
            {i > 0 && <span className="text-gray-700">•</span>}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline underline-offset-4 decoration-gray-700 hover:decoration-white transition-all duration-200"
            >
              {link.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
