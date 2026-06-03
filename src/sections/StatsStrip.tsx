import { useEffect, useRef, useState } from 'react';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const stats = [
  { value: '< 300', suffix: 'ms', label: 'Latence SAYAH 1.0', color: 'text-cyber-volt', prefix: '< ' },
  { value: '4', suffix: '', label: 'Secteurs Algériens Couverts', color: 'text-white', prefix: '' },
  { value: '100%', suffix: '', label: 'Code Propriétaire Livré', color: 'text-white', prefix: '' },
  { value: '0 DA', suffix: '', label: 'Frais API Mensuels', color: 'text-cyber-volt', prefix: '' },
];

function AnimatedStat({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [display, setDisplay] = useState(index === 0 ? '< 0' : '0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = index === 0 ? 300 : parseInt(stat.value.replace(/\D/g, '')) || 0;
          if (target === 0) {
            setDisplay(stat.value);
            return;
          }
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (index === 0) setDisplay(`< ${current}`);
            else if (stat.value.includes('%')) setDisplay(`${current}%`);
            else if (stat.value.includes('DA')) setDisplay(`${current} DA`);
            else setDisplay(`${current}`);

            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(stat.value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, stat]);

  return (
    <div ref={ref} className="p-8 md:p-10 text-center flex flex-col items-center gap-2">
      <span className={`font-mono font-black text-3xl md:text-4xl ${stat.color}`}>
        {display}{stat.suffix}
      </span>
      <span className="font-mono text-[9px] text-muted-silver/50 uppercase tracking-widest">{stat.label}</span>
    </div>
  );
}

export function StatsStrip() {
  const ref = useIntersectionReveal();

  return (
    <section ref={ref} className="border-b border-iron-border bg-[#0d0d0c]">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-iron-border">
        {stats.map((stat, i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <AnimatedStat stat={stat} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
