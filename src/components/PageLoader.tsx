import { useState, useEffect } from 'react';

const loaderMsgs = [
  '>_ INITIALISATION DU MOTEUR...',
  '>_ CHARGEMENT DES MODULES IA...',
  '>_ CONNEXION AU CORPUS DARIJA...',
  '>_ OKKUL // عقول — PRÊT.',
];

export function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev < loaderMsgs.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 520);

    const timer = setTimeout(() => setHidden(true), 2300);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-canvas-jet z-[9999] flex items-center justify-center flex-col transition-opacity duration-600 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="font-mono font-black text-white tracking-widest" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
          OKKUL
        </div>
        <div className="font-mono text-cyber-volt ar tracking-widest mt-1.5" style={{ fontSize: 'clamp(18px, 3vw, 32px)', opacity: 0.8 }}>
          عقول
        </div>
        <div className="w-[240px] h-[2px] bg-iron-border mx-auto mt-8 rounded-sm overflow-hidden">
          <div
            className="h-full bg-cyber-volt"
            style={{
              animation: 'loaderFill 2.1s ease-in-out forwards',
              boxShadow: '0 0 8px rgba(200,255,0,0.6)',
            }}
          />
        </div>
        <div className="font-mono text-[10px] text-muted-silver tracking-[0.2em] uppercase mt-3.5">
          {loaderMsgs[msgIndex]}
        </div>
      </div>
    </div>
  );
}
