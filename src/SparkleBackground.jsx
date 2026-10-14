import React, { useEffect, useMemo, useState } from 'react';

// Girls Who Code-inspired gradient pairs: teal, aqua, purple, pink and blue
const GRADIENTS = [
  ['#00b5ad', '#6ee7e0'], // teal -> aqua
  ['#7c4dff', '#ff5fa2'], // purple -> pink
  ['#2f7cf6', '#9b6bff'], // blue -> purple
  ['#ff7ac0', '#c39bff'], // pink -> lavender
  ['#00b5ad', '#2f7cf6'], // teal -> blue
  ['#9b6bff', '#6ee7e0'], // purple -> aqua
];

// Small seeded random so the layout is the same on every render
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Extra space between circles so they stay apart while drifting (up to ~85px closer) and scaling (6% bigger)
const DRIFT_BUFFER = 90;
const SCALE_BUFFER = 1.06;
// Each circle may touch at most this many others, so no spot is ever covered by more than 3 circles
const MAX_NEIGHBORS = 2;

function buildCircles(count, width, height) {
  const rand = mulberry32(2026);
  const placed = [];

  for (let attempt = 0; attempt < count * 60 && placed.length < count; attempt++) {
    const size = 80 + rand() * 260;
    const r = size / 2;
    // allow circles to hang off the edges of the screen
    const cx = -0.1 * width + rand() * width * 1.2;
    const cy = -0.1 * height + rand() * height * 1.2;

    const neighbors = placed.filter(
      (c) => Math.hypot(c.cx - cx, c.cy - cy) < (c.r + r) * SCALE_BUFFER + DRIFT_BUFFER
    );
    if (neighbors.length > MAX_NEIGHBORS) continue;
    if (neighbors.some((c) => c.neighbors >= MAX_NEIGHBORS)) continue;
    neighbors.forEach((c) => c.neighbors++);

    placed.push({
      id: placed.length,
      cx,
      cy,
      r,
      neighbors: neighbors.length,
      size,
      gradient: GRADIENTS[Math.floor(rand() * GRADIENTS.length)],
      angle: Math.floor(rand() * 360),
      opacity: 0.18 + rand() * 0.17,
      duration: 18 + rand() * 16,
      delay: -rand() * 30,
      driftX: (rand() - 0.5) * 60,
      driftY: (rand() - 0.5) * 60,
    });
  }
  return placed;
}

function useViewportSize() {
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  useEffect(() => {
    // only re-layout when the width changes, so mobile address bars showing/hiding don't reshuffle circles
    const onResize = () =>
      setSize((prev) =>
        prev.width === window.innerWidth ? prev : { width: window.innerWidth, height: window.innerHeight }
      );
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

export default function SparkleBackground({
  count = 14,
  backgroundColor = '#faf8f5',
}) {
  const { width, height } = useViewportSize();
  const circles = useMemo(() => buildCircles(count, width, height), [count, width, height]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ backgroundColor }}
    >
      <style>{`
        @keyframes circle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--o); }
          50% { transform: translate(var(--dx), var(--dy)) scale(1.06); opacity: calc(var(--o) * 0.55); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-circle { animation: none !important; }
        }
      `}</style>

      {circles.map((c) => (
          <span
            key={c.id}
            className="bg-circle absolute block rounded-full"
          style={{
            left: c.cx - c.r,
            top: c.cy - c.r,
            width: c.size,
            height: c.size,
            background: `linear-gradient(${c.angle}deg, ${c.gradient[0]}, ${c.gradient[1]})`,
            opacity: c.opacity,
            '--o': c.opacity,
            '--dx': `${c.driftX}px`,
            '--dy': `${c.driftY}px`,
            animation: `circle-float ${c.duration}s ease-in-out ${c.delay}s infinite`,
          }}
        />
    ))}
  </div>
);
}
