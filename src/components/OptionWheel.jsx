import React, { useEffect, useRef, useState } from 'react';
import './OptionWheel.css';

const DEFAULT_ITEMS = [
  'Python',
  'PyTorch',
  'LangGraph',
  'LangChain',
  'vLLM',
  'FastAPI',
  'Diffusion Models',
  'Vector DBs',
  'OpenCV',
  'Docker'
];

export default function OptionWheel({
  items = DEFAULT_ITEMS,
  defaultSelected = 0,
  onChange,
  textColor = '#71717a',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 2.2,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  smoothing = 200,
  inset = 30,
  loop = true,
  draggable = true,
  soundUrl,
  soundVolume = 0.5
}) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const audioRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(Math.max(0, defaultSelected), items.length - 1)
  );
  const [isDragging, setIsDragging] = useState(false);

  const stateRef = useRef({
    currentY: defaultSelected,
    targetY: defaultSelected,
    isDragging: false,
    startY: 0,
    startScrollY: 0,
    velocity: 0,
    lastY: 0,
    lastTime: 0,
    isAnimating: false,
    lastSoundIndex: defaultSelected
  });

  useEffect(() => {
    if (soundUrl) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.volume = soundVolume;
    }
  }, [soundUrl, soundVolume]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    // itemHeight calculated from fontSize (rem -> px) * spacing
    const itemHeight = fontSize * 16 * spacing;

    const renderPositions = () => {
      const state = stateRef.current;

      if (!state.isDragging) {
        const diff = state.targetY - state.currentY;
        state.currentY += diff * (1 / (smoothing / 16));

        if (Math.abs(diff) < 0.001) {
          state.currentY = state.targetY;
        }
      }

      const totalItems = items.length;
      const roundedIndex = Math.round(state.currentY);
      let clampedIndex = roundedIndex;

      if (loop) {
        clampedIndex = ((roundedIndex % totalItems) + totalItems) % totalItems;
      } else {
        clampedIndex = Math.max(0, Math.min(totalItems - 1, roundedIndex));
      }

      if (clampedIndex !== state.lastSoundIndex) {
        playSound();
        state.lastSoundIndex = clampedIndex;
        setSelectedIndex(clampedIndex);
        if (onChange) {
          onChange(clampedIndex, items[clampedIndex]);
        }
      }

      itemsRef.current.forEach((itemEl, i) => {
        if (!itemEl) return;

        let offset = i - state.currentY;

        if (loop) {
          const half = totalItems / 2;
          while (offset > half) offset -= totalItems;
          while (offset < -half) offset += totalItems;
        }

        const absOffset = Math.abs(offset);

        const rotateX = -offset * tilt * curve;
        const translateY = offset * itemHeight;
        const translateZ = -Math.pow(absOffset, 1.8) * curve * 20;

        const itemBlur = absOffset < 0.15 ? 0 : Math.min((absOffset - 0.1) * blur * 1.5, 4);
        const opacity = Math.max(0.1, 1 - absOffset * fade);
        const activeProximity = Math.max(0, 1 - absOffset * 0.85);

        itemEl.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg)`;
        itemEl.style.opacity = opacity;
        itemEl.style.filter = itemBlur > 0.1 ? `blur(${itemBlur}px)` : 'none';
        itemEl.style.setProperty('--ow-p', activeProximity.toFixed(3));
      });

      animationFrameId = requestAnimationFrame(renderPositions);
    };

    renderPositions();

    const handleWheel = (e) => {
      e.preventDefault();
      const state = stateRef.current;
      const delta = e.deltaY * 0.0025;

      let newTarget = state.targetY + delta;
      if (!loop) {
        newTarget = Math.max(0, Math.min(items.length - 1, newTarget));
      }

      state.targetY = newTarget;
    };

    const handlePointerDown = (e) => {
      if (!draggable) return;
      const state = stateRef.current;
      state.isDragging = true;
      state.startY = e.clientY;
      state.startScrollY = state.currentY;
      state.lastY = e.clientY;
      state.lastTime = performance.now();
      state.velocity = 0;

      setIsDragging(true);
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
      const state = stateRef.current;
      if (!state.isDragging) return;

      const now = performance.now();
      const dt = now - state.lastTime;
      const dy = e.clientY - state.lastY;

      if (dt > 0) {
        state.velocity = dy / dt;
      }

      state.lastY = e.clientY;
      state.lastTime = now;

      const totalDeltaY = (state.startY - e.clientY) / itemHeight;
      let newY = state.startScrollY + totalDeltaY;

      if (!loop) {
        newY = Math.max(-0.5, Math.min(items.length - 0.5, newY));
      }

      state.currentY = newY;
      state.targetY = newY;
    };

    const handlePointerUp = (e) => {
      const state = stateRef.current;
      if (!state.isDragging) return;

      state.isDragging = false;
      setIsDragging(false);

      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }

      const inertia = -state.velocity * 12;
      let finalTarget = Math.round(state.currentY + inertia);

      if (!loop) {
        finalTarget = Math.max(0, Math.min(items.length - 1, finalTarget));
      }

      state.targetY = finalTarget;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [items, spacing, tilt, fontSize, curve, blur, fade, smoothing, loop, draggable, onChange]);

  const handleItemClick = (index) => {
    stateRef.current.targetY = index;
  };

  const isRight = side === 'right';

  return (
    <div
      ref={containerRef}
      className={`option-wheel ${isRight ? 'option-wheel--right' : ''} ${
        isDragging ? 'option-wheel--dragging' : ''
      }`}
      style={{
        '--ow-text-color': textColor,
        '--ow-active-color': activeColor,
        '--ow-font-size': `${fontSize}rem`,
        '--ow-inset': `${inset}px`
      }}
      role="listbox"
      aria-label="Option wheel"
    >
      {items.map((item, index) => {
        const isSelected = index === selectedIndex;
        return (
          <div
            key={item}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`option-wheel__item ${
              isSelected ? 'option-wheel__item--selected' : ''
            }`}
            role="option"
            aria-selected={isSelected}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
