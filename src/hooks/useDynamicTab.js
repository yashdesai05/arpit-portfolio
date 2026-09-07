import { useEffect } from 'react';

// Frame 1: Terminal cursor active, green AI dot
const FAVICON_FRAME_1 = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#08090b" />
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="url(#g1)" stroke-width="2.5" opacity="0.9" />
  <path d="M18 20 L32 32 L18 44" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <line x1="36" y1="44" x2="48" y2="44" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
  <circle cx="48" cy="16" r="4" fill="#10b981" />
</svg>
`)}`;

// Frame 2: Terminal cursor dimmed (blinking), cyan AI dot
const FAVICON_FRAME_2 = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#08090b" />
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="url(#g2)" stroke-width="2.5" opacity="0.9" />
  <path d="M18 20 L32 32 L18 44" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <line x1="36" y1="44" x2="48" y2="44" stroke="#10b981" stroke-width="5" stroke-linecap="round" opacity="0.15" />
  <circle cx="48" cy="16" r="4" fill="#38bdf8" />
</svg>
`)}`;

export function useDynamicTab() {
  useEffect(() => {
    // 1. Marquee Scrolling Title
    const baseText = "⚡ Arpit Avasarmol ✦ AI Systems Engineer ✦ IIT Roorkee ✦ Autonomous Systems & Diffusion ✦ ";
    const awayText = "👋 Hey! Waiting for you... · Arpit Avasarmol ✦ ";
    
    let offset = 0;
    let awayOffset = 0;

    const titleInterval = setInterval(() => {
      if (document.hidden) {
        awayOffset = (awayOffset + 1) % awayText.length;
        document.title = awayText.slice(awayOffset) + awayText.slice(0, awayOffset);
      } else {
        offset = (offset + 1) % baseText.length;
        document.title = baseText.slice(offset) + baseText.slice(0, offset);
      }
    }, 200);

    // 2. Animated Favicon (Blinking Cursor + Glowing AI status)
    let faviconLink = document.getElementById('dynamic-favicon');
    if (!faviconLink) {
      faviconLink = document.querySelector("link[rel~='icon']");
    }

    let isFrameOne = true;
    const faviconInterval = setInterval(() => {
      if (faviconLink) {
        faviconLink.href = isFrameOne ? FAVICON_FRAME_1 : FAVICON_FRAME_2;
        isFrameOne = !isFrameOne;
      }
    }, 850);

    return () => {
      clearInterval(titleInterval);
      clearInterval(faviconInterval);
      document.title = "Arpit Avasarmol — Portfolio & AI Systems Engineer";
      if (faviconLink) {
        faviconLink.href = '/favicon.svg';
      }
    };
  }, []);
}
