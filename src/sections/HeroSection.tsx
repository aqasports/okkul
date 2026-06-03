import { useEffect, useRef, useState } from 'react';
import { OkkulWordmark } from '@/components/3d/OkkulWordmark';

const logsData = [
  { timestamp: '14:02:11', type: 'info', text: 'CONNEXION ESTABLIE // ALGIERS PORT TRUNK // VOIP INGRESS' },
  { timestamp: '14:02:11', type: 'transcript', text: "TRANSCRIPT CLIENT: \"Salam, khoya. Habit n-demandi l'prix ta3 la commande de gros.\"" },
  { timestamp: '14:02:12', type: 'process', text: "MOTEUR DE DIALECTE: Analyse sémantique -> REQUÊTE_PRIX_GROS [Hub El Eulma]" },
  { timestamp: '14:02:12', type: 'latency', text: 'VITESSE DE RÉPONSE: 240ms // RAG Local interrogé (0.00$ API Coût)' },
  { timestamp: '14:02:12', type: 'output', text: "RÉPONSE CLONÉE: \"Sahha khoya! Pour plus de 50 unités, la livraison est gratuite. Ne-calculilek el prix exact?\"" },
  { timestamp: '14:02:15', type: 'info', text: 'COMPILATION DES LOGS: Transaction logistique stockée en cache local' },
];

export function HeroSection() {
  const waveRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("EN ATTENTE D'UN SIGNAL INBOUND...");
  const logIndexRef = useRef(0);

  // Waveform animation
  useEffect(() => {
    const container = waveRef.current;
    if (!container) return;

    // Create bars
    container.innerHTML = '';
    for (let i = 0; i < 28; i++) {
      const bar = document.createElement('div');
      bar.className = 'w-[5px] rounded-full transition-all duration-75';
      bar.style.minHeight = '5px';
      bar.style.height = '8px';
      bar.style.backgroundColor = 'rgba(200, 255, 0, 0.3)';
      container.appendChild(bar);
    }

    const interval = setInterval(() => {
      const bars = container.querySelectorAll('div');
      bars.forEach((bar) => {
        const base = isVoiceActive ? 25 : 4;
        const variance = isVoiceActive ? 45 : 10;
        const h = Math.floor(Math.random() * variance) + base;
        (bar as HTMLElement).style.height = `${h}px`;
        if (isVoiceActive) {
          (bar as HTMLElement).style.backgroundColor = '#C8FF00';
          (bar as HTMLElement).style.boxShadow = '0 0 12px rgba(200,255,0,0.75)';
        } else {
          (bar as HTMLElement).style.backgroundColor = 'rgba(200,255,0,0.3)';
          (bar as HTMLElement).style.boxShadow = 'none';
        }
      });
    }, 90);

    return () => clearInterval(interval);
  }, [isVoiceActive]);

  // Console logs animation
  useEffect(() => {
    const consoleEl = consoleRef.current;
    if (!consoleEl) return;

    const interval = setInterval(() => {
      const log = logsData[logIndexRef.current];
      const isTranscript = log.type === 'transcript' || log.type === 'output';

      if (isTranscript) {
        setIsVoiceActive(true);
        setVoiceStatus("TRANSCRIPTION DE L'IA EN DIRECT...");
        setTimeout(() => {
          setIsVoiceActive(false);
          setVoiceStatus("EN ATTENTE D'UN SIGNAL INBOUND...");
        }, 2000);
      }

      const logEl = document.createElement('div');
      let colorClass = 'text-white/80';
      if (log.type === 'transcript') colorClass = 'text-cyan-400 font-bold';
      if (log.type === 'process') colorClass = 'text-yellow-500';
      if (log.type === 'latency') colorClass = 'text-cyber-volt font-black';
      if (log.type === 'output') colorClass = 'text-emerald-400';

      const borderColor = log.type === 'latency' ? 'border-cyber-volt' : 'border-iron-border';
      logEl.className = `border-l-2 ${borderColor} pl-3 py-0.5 transition-all duration-300 opacity-0 transform -translate-x-2.5`;
      logEl.innerHTML = `<span class="text-muted-silver/40 mr-1.5 font-light">[${log.timestamp}]</span><span class="${colorClass}">${log.text}</span>`;

      const cursorLine = consoleEl.querySelector('.cursor-line');
      if (cursorLine) {
        consoleEl.insertBefore(logEl, cursorLine);
      }

      requestAnimationFrame(() => {
        logEl.classList.remove('opacity-0', '-translate-x-2.5');
      });

      const allLogs = consoleEl.querySelectorAll('.border-l-2');
      if (allLogs.length > 5) allLogs[0].remove();

      logIndexRef.current = (logIndexRef.current + 1) % logsData.length;
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 border-b border-iron-border overflow-hidden select-none bg-canvas-jet bg-blueprint">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-iron-border relative z-10 min-h-[60vh] lg:min-h-[100dvh]">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="font-mono text-xs text-cyber-volt tracking-widest uppercase bg-cyber-volt/10 border border-cyber-volt/20 px-3 py-1 rounded">
            [ OKKUL LOGIC ENGINE // SYSTEM v3.0 ]
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-volt opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-volt" />
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-normal uppercase leading-[0.92] mb-8">
          REMPLACEZ LES{' '}
          <span className="text-canvas-jet bg-cyber-volt px-2 py-0.5 inline-block my-1 font-black transform -rotate-1">
            LIMITES
          </span>{' '}
          DE VOTRE ENTREPRISE.
        </h1>

        <p className="text-sm md:text-base text-muted-silver tracking-wide leading-relaxed font-light mb-12 max-w-xl">
          Okkul conçoit vos applications professionnelles sur-mesure (modifiables à l'infini) et y intègre des agents
          d'intelligence artificielle autonomes. Du bras droit cognitif du CEO au LLM vocal Darija sub-300ms, nous
          éliminons vos blocages opérationnels avec des systèmes souverains hébergés localement.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => scrollTo('products')}
            className="btn-volt glow-volt py-4 px-8 text-center border border-cyber-volt text-xs flex items-center justify-center gap-2.5 font-bold tracking-widest uppercase text-canvas-jet bg-cyber-volt transition-all duration-300 hover:bg-transparent hover:text-cyber-volt hover:scale-[1.02]"
          >
            DÉCOUVRIR NOS PRODUITS
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="py-4 px-8 text-center text-xs flex items-center justify-center gap-2.5 border border-iron-border text-white hover:border-cyber-volt/40 hover:bg-cyber-volt/5 font-bold tracking-widest uppercase transition-all duration-300 bg-transparent cursor-pointer"
          >
            PARLER À UN CONSTRUCTEUR
            <svg className="w-4 h-4 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-iron-border/60 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] text-muted-silver/50">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-volt" />
            <span>HÉBERGEMENT SOUVERAIN (ALGER / SÉTIF)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-volt" />
            <span>CODE PROPRIÉTAIRE LIVRÉ À 100%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-volt" />
            <span>ZÉRO COÛT D'API TIERS</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-5 p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-deep-black relative z-10">
        {/* 3D Wordmark */}
        <div className="mb-6">
          <OkkulWordmark />
        </div>

        {/* Terminal Panel */}
        <div className="border border-iron-border rounded-lg bg-[#111110]/80 backdrop-blur-xl overflow-hidden shadow-2xl scanline">
          {/* Window Bar */}
          <div className="bg-[#181817] border-b border-iron-border px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
            </div>
            <div className="font-mono text-[10px] text-muted-silver flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span className="tracking-wider text-[9px]">SAYAH_AUDIO_INTERCEPT // ACTIVE</span>
            </div>
            <div className="w-6" />
          </div>

          {/* Waveform */}
          <div className="p-6 border-b border-iron-border bg-gradient-to-b from-[#111110] to-[#0d0d0c] flex flex-col items-center justify-center h-48 relative">
            <div className="absolute top-3 left-4 font-mono text-[9px] text-cyber-volt/40 tracking-widest uppercase">
              ANALYSES ET APPELS VOCAUX DARIJA
            </div>
            <div ref={waveRef} className="flex items-end justify-center gap-[4px] w-full max-w-[280px] h-24" />
            <div className="font-mono text-[9px] text-muted-silver mt-4 flex items-center gap-2 bg-[#141413] border border-iron-border px-3 py-1.5 rounded-sm">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${isVoiceActive ? 'bg-red-500 animate-pulse' : 'bg-cyber-volt/30'}`} />
              <span className="tracking-wide">{voiceStatus}</span>
            </div>
          </div>

          {/* Console Logs */}
          <div ref={consoleRef} className="p-5 font-mono text-[10px] leading-relaxed bg-[#090908] min-h-[220px] flex flex-col justify-end gap-2.5 overflow-hidden">
            <div className="cursor-line flex items-center gap-1.5 mt-2 pt-2 border-t border-iron-border/60">
              <span className="text-cyber-volt font-bold">&gt;_ OKKUL_CORE_ESTABLISHED //</span>
              <span className="w-2 h-3 bg-cyber-volt animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-3 font-mono text-[9px] text-muted-silver/40 flex justify-between items-center px-1">
          <span>NOYAU COGNITIF OKKUL</span>
          <span>SYSTÈMES : DARIJA + AGENTS</span>
        </div>
      </div>
    </section>
  );
}
