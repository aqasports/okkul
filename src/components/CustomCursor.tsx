import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    };

    const onEnter = () => ring.classList.add('hovering');
    const onLeave = () => ring.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, input, select, textarea, [onclick]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-[6px] h-[6px] bg-cyber-volt rounded-full pointer-events-none z-[8999] -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: '0 0 8px rgba(200,255,0,0.8)' }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        className="fixed w-[28px] h-[28px] border border-cyber-volt/45 rounded-full pointer-events-none z-[8998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-200"
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  );
}
