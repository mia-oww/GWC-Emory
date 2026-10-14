import React, { useMemo } from 'react';

// Soft pastel palette: teal, light blue, light pink, light purple
const COLORS = ['#5eead4', '#99f6e4', '#7dd3fc', '#bae6fd', '#f9a8d4', '#fbcfe8', '#c4b5fd', '#ddd6fe'];

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

function buildParticles(count) {
  const rand = mulberry32(2026);
  return Array.from({ length: count }, (_, i) => {
    const isStar = rand() < 0.3; // ~30% are 4-point sparkles, the rest are little balls
    return {
      id: i,
      isStar,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      left: rand() * 100,
      top: rand() * 100,
      size: isStar ? 8 + rand() * 10 : 4 + rand() * 9,
      opacity: 0.45 + rand() * 0.45,
      duration: 4 + rand() * 6,
      delay: -rand() * 10,
      driftX: (rand() - 0.5) * 24,
      driftY: (rand() - 0.5) * 30,
    };
  });
}

export default function SparkleBackground({
  count = 70,
  backgroundColor = '#faf8f5',
}) {
  const particles = useMemo(() => buildParticles(count), [count]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ backgroundColor }}
    >
      <style>{`
        @keyframes sparkle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--o); }
          50% { transform: translate(var(--dx), var(--dy)) scale(1.25); opacity: calc(var(--o) * 0.45); }
        }
        @keyframes sparkle-twinkle {
          0%, 100% { transform: scale(0.6) rotate(0deg); opacity: calc(var(--o) * 0.35); }
          50% { transform: scale(1.15) rotate(20deg); opacity: var(--o); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sparkle-particle { animation: none !important; }
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle-particle absolute block"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.isStar ? 0 : '9999px',
            // 4-point star shape for sparkles
            clipPath: p.isStar
              ? 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)'
              : undefined,
            boxShadow: p.isStar ? undefined : `0 0 ${p.size * 1.5}px ${p.color}`,
            '--o': p.opacity,
            '--dx': `${p.driftX}px`,
            '--dy': `${p.driftY}px`,
            opacity: p.opacity,
            animation: `${p.isStar ? 'sparkle-twinkle' : 'sparkle-float'} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}