import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Terminal,
  Play,
  Pause,
  Flame
} from 'lucide-react';

// Web Audio API Retro Arcade Synthesizer
class PacmanAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.lastWakaTime = 0;
    this.wakaState = false;
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
    } catch {}
  }
  waka() {
    const now = Date.now();
    if (now - this.lastWakaTime < 130) return;
    this.lastWakaTime = now;
    this.wakaState = !this.wakaState;
    this.playTone(this.wakaState ? 440 : 330, 'triangle', 0.07, 0.03);
  }
  powerPellet() {
    [350, 440, 587, 700, 880].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'square', 0.1, 0.045), i * 50);
    });
  }
  eatGhost() {
    [600, 800, 1100].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.1, 0.06), i * 60);
    });
  }
  eatFruit() {
    [523, 659, 784, 1046].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.1, 0.05), i * 50);
    });
  }
  die() {
    [500, 420, 360, 300, 240, 180].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sawtooth', 0.08, 0.04), i * 70);
    });
  }
  win() {
    [523, 659, 784, 1046, 1318].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.16, 0.06), i * 110);
    });
  }
}

const audio = new PacmanAudio();

// 19 cols x 15 rows classic symmetrical maze
// 1 = Wall, 0 = Dot, 2 = Power Pellet, 3 = Empty / Ghost Spawn
const MAZE_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 3, 3, 3, 3, 3, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const COLS = 19;
const ROWS = 15;

const GHOST_CONFIG = [
  { id: 'blinky', name: 'Blinky', color: '#ef4444', homeX: 9, homeY: 7, releaseDelay: 600 },
  { id: 'pinky', name: 'Pinky', color: '#ec4899', homeX: 8, homeY: 7, releaseDelay: 3000 },
  { id: 'inky', name: 'Inky', color: '#06b6d4', homeX: 10, homeY: 7, releaseDelay: 5500 },
  { id: 'clyde', name: 'Clyde', color: '#f97316', homeX: 9, homeY: 6, releaseDelay: 8000 }
];

const FRUITS = [
  { icon: '🍒', name: 'Cherry', pts: 100 },
  { icon: '🍓', name: 'Strawberry', pts: 300 },
  { icon: '🍊', name: 'Orange', pts: 500 },
  { icon: '🍎', name: 'Apple', pts: 700 },
  { icon: '🍈', name: 'Melon', pts: 1000 }
];

export default function PacmanPortfolioGame({ onExitToCli }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('pacman_high_score') || '1200', 10);
    } catch {
      return 1200;
    }
  });
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [frightenedTime, setFrightenedTime] = useState(0);
  const [collectedFruits, setCollectedFruits] = useState([]);
  const [fruitItem, setFruitItem] = useState(null); // { x: 9, y: 8, icon, pts }
  const [ghostMultiplier, setGhostMultiplier] = useState(200);
  const [hudNotice, setHudNotice] = useState('Use Arrow Keys or WASD to eat dots & avoid ghosts!');

  const canvasRef = useRef(null);
  const pacmanRef = useRef({
    x: 9,
    y: 10,
    dirX: -1,
    dirY: 0,
    nextDirX: -1,
    nextDirY: 0,
    mouthAngle: 0.25,
    mouthDir: 1
  });

  const ghostsRef = useRef(
    GHOST_CONFIG.map((g) => ({
      ...g,
      x: g.homeX,
      y: g.homeY,
      dirX: 0,
      dirY: -1,
      isEaten: false,
      spawnTime: Date.now()
    }))
  );

  const dotsRef = useRef([]);

  // Initialize maze dots
  const initGame = useCallback((nextLevel = 1) => {
    const initialDots = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (MAZE_MAP[r][c] === 0 || MAZE_MAP[r][c] === 2) {
          initialDots.push({ x: c, y: r, isPower: MAZE_MAP[r][c] === 2, eaten: false });
        }
      }
    }
    dotsRef.current = initialDots;

    pacmanRef.current = {
      x: 9,
      y: 10,
      dirX: -1,
      dirY: 0,
      nextDirX: -1,
      nextDirY: 0,
      mouthAngle: 0.25,
      mouthDir: 1
    };

    const now = Date.now();
    ghostsRef.current = GHOST_CONFIG.map((g) => ({
      ...g,
      x: g.homeX,
      y: g.homeY,
      dirX: 0,
      dirY: -1,
      isEaten: false,
      spawnTime: now
    }));

    if (nextLevel === 1) {
      setScore(0);
      setLives(3);
      setCollectedFruits([]);
    }

    setLevel(nextLevel);
    setIsGameOver(false);
    setIsVictory(false);
    setFrightenedTime(0);
    setFruitItem(null);

    // Spawn random fruit in middle of board
    const fruit = FRUITS[Math.min(nextLevel - 1, FRUITS.length - 1)];
    setTimeout(() => {
      setFruitItem({ x: 9, y: 8, ...fruit });
    }, 4000);

    setHudNotice(`ROUND ${nextLevel} START! Eat all dots & Power Pellets!`);
  }, []);

  useEffect(() => {
    initGame(1);
  }, [initGame]);

  const toggleMute = () => {
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const setDirection = useCallback((dx, dy) => {
    pacmanRef.current.nextDirX = dx;
    pacmanRef.current.nextDirY = dy;
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (['ArrowUp', 'KeyW', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        setDirection(0, -1);
      } else if (['ArrowDown', 'KeyS', 's', 'S'].includes(e.key)) {
        e.preventDefault();
        setDirection(0, 1);
      } else if (['ArrowLeft', 'KeyA', 'a', 'A'].includes(e.key)) {
        e.preventDefault();
        setDirection(-1, 0);
      } else if (['ArrowRight', 'KeyD', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        setDirection(1, 0);
      } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setDirection]);

  // Main 60FPS Game Loop
  useEffect(() => {
    let animationFrameId;
    let lastTick = performance.now();
    let tickAccumulator = 0;
    // Faster speed on higher levels
    const TICK_INTERVAL = Math.max(120, 160 - (level - 1) * 10);

    const canMoveTo = (x, y) => {
      if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
      return MAZE_MAP[y][x] !== 1;
    };

    const loop = (currentTime) => {
      animationFrameId = requestAnimationFrame(loop);
      if (isPaused || isGameOver || isVictory) {
        draw();
        return;
      }

      const delta = currentTime - lastTick;
      lastTick = currentTime;
      tickAccumulator += delta;

      if (frightenedTime > 0) {
        setFrightenedTime((prev) => Math.max(0, prev - delta / 1000));
      }

      if (tickAccumulator >= TICK_INTERVAL) {
        tickAccumulator = 0;
        updatePhysics();
      }

      draw();
    };

    const updatePhysics = () => {
      const pac = pacmanRef.current;
      const gameNow = Date.now();

      // Check next desired direction
      if (pac.nextDirX !== 0 || pac.nextDirY !== 0) {
        const testX = pac.x + pac.nextDirX;
        const testY = pac.y + pac.nextDirY;
        if (canMoveTo(testX, testY)) {
          pac.dirX = pac.nextDirX;
          pac.dirY = pac.nextDirY;
          pac.nextDirX = 0;
          pac.nextDirY = 0;
        }
      }

      // Move Pacman
      const nextX = pac.x + pac.dirX;
      const nextY = pac.y + pac.dirY;

      if (canMoveTo(nextX, nextY)) {
        pac.x = nextX;
        pac.y = nextY;

        pac.mouthAngle += 0.15 * pac.mouthDir;
        if (pac.mouthAngle > 0.45 || pac.mouthAngle < 0.05) {
          pac.mouthDir *= -1;
        }
      }

      // Check Fruit Eating
      if (fruitItem && pac.x === fruitItem.x && pac.y === fruitItem.y) {
        audio.eatFruit();
        setScore((s) => {
          const newScore = s + fruitItem.pts;
          if (newScore > highScore) {
            setHighScore(newScore);
            try { localStorage.setItem('pacman_high_score', newScore.toString()); } catch {}
          }
          return newScore;
        });
        setCollectedFruits((prev) => [...prev, fruitItem.icon]);
        setHudNotice(`Delicious! Ate ${fruitItem.name} for +${fruitItem.pts} pts!`);
        setFruitItem(null);
      }

      // Check Dot / Power Pellet Eating
      const dot = dotsRef.current.find((d) => !d.eaten && d.x === pac.x && d.y === pac.y);
      if (dot) {
        dot.eaten = true;
        if (dot.isPower) {
          audio.powerPellet();
          setFrightenedTime(8);
          setGhostMultiplier(200);
          setScore((s) => {
            const newScore = s + 50;
            if (newScore > highScore) {
              setHighScore(newScore);
              try { localStorage.setItem('pacman_high_score', newScore.toString()); } catch {}
            }
            return newScore;
          });
          setHudNotice('POWER PELLET! Ghosts are scared — go eat them!');
        } else {
          audio.waka();
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              try { localStorage.setItem('pacman_high_score', newScore.toString()); } catch {}
            }
            return newScore;
          });
        }

        // Check if level cleared
        const remaining = dotsRef.current.filter((d) => !d.eaten).length;
        if (remaining === 0) {
          setIsVictory(true);
          audio.win();
          setHudNotice(`LEVEL ${level} COMPLETE! Fantastic!`);
        }
      }

      // Move Ghosts
      ghostsRef.current.forEach((ghost) => {
        if (gameNow - ghost.spawnTime < ghost.releaseDelay) return;

        if (ghost.isEaten) {
          if (ghost.x === ghost.homeX && ghost.y === ghost.homeY) {
            ghost.isEaten = false;
          } else {
            ghost.x += Math.sign(ghost.homeX - ghost.x);
            ghost.y += Math.sign(ghost.homeY - ghost.y);
          }
          return;
        }

        const possibleDirs = [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 }
        ].filter((d) => {
          if (d.x === -ghost.dirX && d.y === -ghost.dirY) return false;
          return canMoveTo(ghost.x + d.x, ghost.y + d.y);
        });

        if (possibleDirs.length > 0) {
          let chosenDir;
          if (frightenedTime > 0) {
            possibleDirs.sort((a, b) => {
              const distA = Math.hypot(ghost.x + a.x - pac.x, ghost.y + a.y - pac.y);
              const distB = Math.hypot(ghost.x + b.x - pac.x, ghost.y + b.y - pac.y);
              return distB - distA;
            });
            chosenDir = possibleDirs[0];
          } else {
            possibleDirs.sort((a, b) => {
              const distA = Math.hypot(ghost.x + a.x - pac.x, ghost.y + a.y - pac.y);
              const distB = Math.hypot(ghost.x + b.x - pac.x, ghost.y + b.y - pac.y);
              return distA - distB;
            });
            chosenDir = Math.random() < 0.72 ? possibleDirs[0] : possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
          }

          ghost.dirX = chosenDir.x;
          ghost.dirY = chosenDir.y;
          ghost.x += chosenDir.x;
          ghost.y += chosenDir.y;
        }
      });

      // Collision Detection: Pacman vs Ghosts
      ghostsRef.current.forEach((ghost) => {
        if (ghost.x === pac.x && ghost.y === pac.y) {
          if (frightenedTime > 0 && !ghost.isEaten) {
            audio.eatGhost();
            ghost.isEaten = true;
            const pts = ghostMultiplier;
            setGhostMultiplier((m) => m * 2);
            setScore((s) => {
              const newScore = s + pts;
              if (newScore > highScore) {
                setHighScore(newScore);
                try { localStorage.setItem('pacman_high_score', newScore.toString()); } catch {}
              }
              return newScore;
            });
            setHudNotice(`CHOMP! Ate ${ghost.name} for +${pts} pts!`);
          } else if (!ghost.isEaten) {
            audio.die();
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setIsGameOver(true);
                setHudNotice('GAME OVER! Better luck next time!');
              } else {
                pac.x = 9;
                pac.y = 10;
                pac.dirX = -1;
                pac.dirY = 0;
                ghostsRef.current.forEach((g) => {
                  g.x = g.homeX;
                  g.y = g.homeY;
                  g.spawnTime = Date.now();
                });
                setHudNotice(`Ouch! Caught by ${ghost.name}! Lives left: ${newLives}`);
              }
              return newLives;
            });
          }
        }
      });
    };

    // Canvas Renderer
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const TILE = canvas.width / COLS;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Maze Walls with Neon Arcade Stroke
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (MAZE_MAP[r][c] === 1) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(c * TILE + 1, r * TILE + 1, TILE - 2, TILE - 2);
          }
        }
      }

      // Draw Dots and Power Pellets
      const now = performance.now();
      dotsRef.current.forEach((dot) => {
        if (dot.eaten) return;
        const cx = dot.x * TILE + TILE / 2;
        const cy = dot.y * TILE + TILE / 2;

        if (dot.isPower) {
          const pulse = (Math.sin(now / 140) + 1) / 2;
          const radius = TILE * 0.35 + pulse * 2.5;

          ctx.save();
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(cx, cy, TILE * 0.12, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Fruit if available
      if (fruitItem) {
        const fx = fruitItem.x * TILE + TILE / 2;
        const fy = fruitItem.y * TILE + TILE / 2;
        ctx.font = `${Math.floor(TILE * 0.9)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fruitItem.icon, fx, fy);
      }

      // Draw Pacman
      const pac = pacmanRef.current;
      const px = pac.x * TILE + TILE / 2;
      const py = pac.y * TILE + TILE / 2;
      const pRadius = TILE * 0.44;

      let baseAngle = 0;
      if (pac.dirX === 1) baseAngle = 0;
      else if (pac.dirX === -1) baseAngle = Math.PI;
      else if (pac.dirY === 1) baseAngle = Math.PI / 2;
      else if (pac.dirY === -1) baseAngle = (Math.PI * 3) / 2;

      ctx.save();
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(
        px,
        py,
        pRadius,
        baseAngle + pac.mouthAngle * Math.PI,
        baseAngle + (2 - pac.mouthAngle) * Math.PI
      );
      ctx.lineTo(px, py);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Ghosts
      ghostsRef.current.forEach((ghost) => {
        const gx = ghost.x * TILE + TILE / 2;
        const gy = ghost.y * TILE + TILE / 2;
        const gRadius = TILE * 0.42;

        ctx.save();
        if (ghost.isEaten) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(gx - 4, gy - 2, 3, 0, Math.PI * 2);
          ctx.arc(gx + 4, gy - 2, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e3a8a';
          ctx.beginPath();
          ctx.arc(gx - 4, gy - 2, 1.5, 0, Math.PI * 2);
          ctx.arc(gx + 4, gy - 2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          let ghostColor = ghost.color;
          if (frightenedTime > 0) {
            ghostColor = frightenedTime < 2.5 && Math.floor(now / 150) % 2 === 0 ? '#ffffff' : '#3b82f6';
          }

          ctx.shadowColor = ghostColor;
          ctx.shadowBlur = 8;
          ctx.fillStyle = ghostColor;
          ctx.beginPath();
          ctx.arc(gx, gy - 2, gRadius, Math.PI, 0, false);
          ctx.lineTo(gx + gRadius, gy + gRadius * 0.85);
          ctx.lineTo(gx + gRadius * 0.5, gy + gRadius * 0.55);
          ctx.lineTo(gx, gy + gRadius * 0.85);
          ctx.lineTo(gx - gRadius * 0.5, gy + gRadius * 0.55);
          ctx.lineTo(gx - gRadius, gy + gRadius * 0.85);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(gx - 3.5, gy - 3, 2.5, 0, Math.PI * 2);
          ctx.arc(gx + 3.5, gy - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = frightenedTime > 0 ? '#ef4444' : '#0f172a';
          ctx.beginPath();
          ctx.arc(gx - 3.5 + ghost.dirX * 1.2, gy - 3 + ghost.dirY * 1.2, 1.2, 0, Math.PI * 2);
          ctx.arc(gx + 3.5 + ghost.dirX * 1.2, gy - 3 + ghost.dirY * 1.2, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isGameOver, isVictory, frightenedTime, level, fruitItem, ghostMultiplier, highScore]);

  return (
    <div className="flex flex-col items-center space-y-3 font-mono select-none w-full max-w-xl mx-auto">
      {/* Retro Arcade Marquee Header */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-zinc-900/90 border border-white/10 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 animate-pulse flex items-center justify-center font-bold text-[9px] text-black">
            C
          </span>
          <span className="font-bold text-white tracking-widest text-xs">
            PAC-MAN <span className="text-yellow-400">ARCADE</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold">
            LVL {level}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-yellow-400 font-bold">
            <span className="text-gray-400">1UP:</span>
            <span>{score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-amber-300 font-bold">
            <span className="text-gray-500">HIGH:</span>
            <span>{highScore}</span>
          </div>

          <div className="flex items-center gap-1 text-yellow-400" title="Lives">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < lives ? 'text-yellow-400' : 'text-zinc-700 opacity-40'}`}
              >
                ●
              </span>
            ))}
          </div>

          <button
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={() => initGame(1)}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Restart Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Arcade Screen Frame */}
      <div className="relative bg-black border-2 border-blue-600/40 rounded-2xl p-2.5 shadow-2xl flex flex-col items-center justify-center w-full">
        <canvas
          ref={canvasRef}
          width={456}
          height={360}
          className="w-full aspect-[19/15] rounded-lg border border-blue-900/30 shadow-inner"
        />

        {/* Live HUD Notice */}
        <div className="w-full mt-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-yellow-300 truncate mr-2 flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">&gt;&gt;</span> {hudNotice}
          </span>
          {frightenedTime > 0 && (
            <span className="text-blue-400 animate-pulse text-[10px] whitespace-nowrap font-bold">
              ⚡ GHOSTS BLUE: {Math.ceil(frightenedTime)}s
            </span>
          )}
        </div>

        {/* Touch D-PAD for Mobile / Trackpad */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-3 w-full border-t border-white/10 pt-2">
          <span className="text-[10px] text-gray-500">D-PAD:</span>
          <button onClick={() => setDirection(-1, 0)} className="p-2.5 bg-white/10 rounded-lg active:bg-yellow-400/30">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex flex-col gap-1">
            <button onClick={() => setDirection(0, -1)} className="p-2.5 bg-white/10 rounded-lg active:bg-yellow-400/30">
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
            <button onClick={() => setDirection(0, 1)} className="p-2.5 bg-white/10 rounded-lg active:bg-yellow-400/30">
              <ArrowDown className="w-4 h-4 text-white" />
            </button>
          </div>
          <button onClick={() => setDirection(1, 0)} className="p-2.5 bg-white/10 rounded-lg active:bg-yellow-400/30">
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Fruit Basket Footer */}
        <div className="w-full flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-xs px-2">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
            <span>Fruits:</span>
            {collectedFruits.length > 0 ? (
              collectedFruits.map((f, idx) => (
                <span key={idx} className="text-sm">{f}</span>
              ))
            ) : (
              <span className="text-gray-600 text-[10px]">Collect 🍒 to boost score!</span>
            )}
          </div>
          <span className="text-gray-500 text-[10px] hidden sm:inline">
            WASD / Arrow Keys to Move
          </span>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-2 z-20">
            <span className="text-yellow-400 font-bold text-xl font-syne">PAUSED</span>
            <p className="text-xs text-gray-400">Press Space or P to resume</p>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center space-y-3 z-30 p-4 text-center animate-fade-in">
            <span className="text-red-500 font-bold text-2xl font-syne">GAME OVER</span>
            <div className="text-xs text-gray-300 space-y-1">
              <p>Your Final Score: <strong className="text-yellow-400 text-sm">{score}</strong></p>
              {score >= highScore && score > 0 && (
                <p className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> NEW HIGH SCORE!
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => initGame(1)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Play Again
              </button>
              {onExitToCli && (
                <button
                  onClick={onExitToCli}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-xl transition-all"
                >
                  CLI Terminal
                </button>
              )}
            </div>
          </div>
        )}

        {/* Victory Level Clear Overlay */}
        {isVictory && (
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center space-y-3 z-30 p-4 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-white font-syne">
              ROUND {level} CLEARED!
            </h2>
            <p className="text-xs text-emerald-400">
              You cleared all dots! Current Score: <strong className="text-yellow-400">{score}</strong>
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => initGame(level + 1)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Start Round {level + 1} →
              </button>
              <button
                onClick={() => initGame(1)}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-xl transition-all"
              >
                Reset Level 1
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Switcher */}
      <div className="w-full flex items-center justify-between text-[11px] text-gray-400 px-1 pt-0.5">
        <span className="flex items-center gap-1 text-gray-500">
          <Terminal className="w-3 h-3 text-yellow-400" />
          Tip: Power pellets turn ghosts blue so Pac-Man can eat them!
        </span>
        {onExitToCli && (
          <button
            onClick={onExitToCli}
            className="hover:text-yellow-300 text-gray-400 underline decoration-dotted transition-colors"
          >
            Switch to Command Line →
          </button>
        )}
      </div>
    </div>
  );
}
