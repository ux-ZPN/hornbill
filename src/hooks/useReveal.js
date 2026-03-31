import { useEffect } from 'react';

/**
 * Adds .visible to every .reveal element as it enters the viewport.
 * Import and call once at the top of each page component.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
