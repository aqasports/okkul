import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

interface SectionHeaderProps {
  label: string;
  title: string;
  infoBox?: string;
  infoBoxVariant?: 'default' | 'volt';
}

export function SectionHeader({ label, title, infoBox, infoBoxVariant = 'default' }: SectionHeaderProps) {
  const ref = useIntersectionReveal();

  return (
    <div
      ref={ref}
      className="border-b border-iron-border px-8 py-12 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8 bg-gradient-to-b from-[#151514] to-[#111110]"
    >
      <div>
        <span className="font-mono text-xs text-cyber-volt tracking-widest uppercase block mb-3 reveal">
          {label}
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-normal uppercase leading-none reveal d1">
          {title}
        </h2>
      </div>
      {infoBox && (
        <div
          className={`font-mono text-xs border px-4 py-3.5 max-w-sm rounded backdrop-blur reveal d2 ${
            infoBoxVariant === 'volt'
              ? 'text-cyber-volt border-cyber-volt/20 bg-cyber-volt/5'
              : 'text-muted-silver border-iron-border bg-canvas-jet/80'
          }`}
        >
          {infoBox}
        </div>
      )}
    </div>
  );
}
