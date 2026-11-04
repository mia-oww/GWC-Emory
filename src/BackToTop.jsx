import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Floating button that appears once the visitor has scrolled down, and scrolls back to the top
export default function BackToTop({ showAfter = 600 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const scrollUp = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    // the wrapper handles showing/hiding so it doesn't fight the button's own shine styles
    <div
      className={`fixed bottom-6 right-6 z-30 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollUp}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        className="gwc-shine-btn w-12 h-12 rounded-full shadow-md flex items-center justify-center cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
