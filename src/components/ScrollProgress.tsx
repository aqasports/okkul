import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const { progress } = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 h-[2px] bg-cyber-volt z-[45] transition-[width] duration-100" style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(200,255,0,0.6)' }} />
  );
}
