import { useEffect, useRef } from 'react';

export function useIntersectionReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold }
    );

    const revealEls = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealEls.forEach((child) => observer.observe(child));
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
