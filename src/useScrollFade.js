import { useLayoutEffect } from 'react';

// Remembers which elements have already faded in, so they don't animate again
// when the visitor comes back to a tab (resets on page reload).
const seen = new Set();

// Fades in any element with a data-fade attribute ("up", "left", "right" or "zoom")
// the first time it scrolls into view. Optional data-fade-delay is in milliseconds.
// Re-runs whenever `key` changes (e.g. switching tabs) so new elements get picked up.
export default function useScrollFade(key) {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-fade]'));
    const idFor = (el) => `${key}:${elements.indexOf(el)}`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.transitionDelay = `${el.dataset.fadeDelay || 0}ms`;
          el.classList.add('is-visible');
          seen.add(idFor(el));
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => {
      if (seen.has(idFor(el))) {
        // already shown once: display it right away with no animation
        el.style.transition = 'none';
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [key]);
}
