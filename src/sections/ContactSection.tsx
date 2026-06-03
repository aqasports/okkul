import { useState } from 'react';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useIntersectionReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 6000);
  };

  return (
    <section
      id="contact"
      className="border-b border-iron-border bg-[#0e0e0e]/40 py-20 md:py-28 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden bg-blueprint"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-volt/5 blur-3xl rounded-full pointer-events-none" />

      <div ref={ref} className="max-w-3xl mx-auto relative z-10">
        <span className="font-mono text-xs text-cyber-volt tracking-widest uppercase block mb-5 reveal">
          [ PROCUREMENT // DEPLOYMENT INTERFACE ]
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-normal uppercase mb-6 leading-[0.95] reveal d1">
          L'OBSTACLE DE LA MAIN-D'ŒUVRE HUMAINE S'ARRÊTE ICI. REPRENEZ LE CONTRÔLE OPÉRATIONNEL.
        </h2>
        <p className="text-xs md:text-sm text-muted-silver tracking-wide leading-relaxed font-light mb-12 max-w-2xl mx-auto reveal d2">
          Compilez vos flux opérationnels et intégrez-les directement dans vos lignes téléphoniques et plateformes de
          messagerie. Remplissez la fiche d'évaluation pour réserver votre créneau de configuration avec notre équipe.
        </p>

        <div id="form-container" className="border border-iron-border bg-canvas-jet/90 backdrop-blur-xl p-6 md:p-12 rounded-lg text-left shadow-2xl relative max-w-2xl mx-auto reveal d3">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted-silver tracking-widest uppercase">01 // Nom complet du responsable</label>
                <input type="text" required placeholder="ex. Salim Khelil" className="w-full bg-[#141413] border border-iron-border rounded px-4 py-3.5 text-xs text-white placeholder:text-muted-silver/30 focus:outline-none focus:border-cyber-volt transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted-silver tracking-widest uppercase">02 // Domaine d'activité / Site web</label>
                <input type="text" required placeholder="ex. votreentreprise.dz" className="w-full bg-[#141413] border border-iron-border rounded px-4 py-3.5 text-xs text-white placeholder:text-muted-silver/30 focus:outline-none focus:border-cyber-volt transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted-silver tracking-widest uppercase">03 // Numéro de téléphone de contact</label>
                <input type="tel" required placeholder="ex. +213 (0) 555 12 34 56" className="w-full bg-[#141413] border border-iron-border rounded px-4 py-3.5 text-xs text-white placeholder:text-muted-silver/30 focus:outline-none focus:border-cyber-volt transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted-silver tracking-widest uppercase">04 // Échelle Opérationnelle Estimée</label>
                <select className="w-full bg-[#141413] border border-iron-border rounded px-4 py-3.5 text-xs text-white focus:outline-none focus:border-cyber-volt transition-colors font-mono cursor-pointer">
                  <option>Infrastructure Logicielle (App sur Mesure)</option>
                  <option>Automatisation des Processus (Automate your Job)</option>
                  <option>IA Decisionnelle & Conseil (RAYAS 1.0)</option>
                  <option>Support Vocal Darija Autonome (SAYAH 1.0)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full btn-volt glow-volt py-4 px-6 border border-cyber-volt transition-all duration-300 flex items-center justify-center gap-2 rounded-sm mt-6 text-xs text-canvas-jet bg-cyber-volt font-bold tracking-widest uppercase hover:bg-transparent hover:text-cyber-volt cursor-pointer"
              >
                DÉPLOYER LA SOLUTION OKKUL
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 font-mono text-center">
              <div className="w-16 h-16 rounded-full border border-cyber-volt flex items-center justify-center mb-6 glow-volt bg-cyber-volt/5">
                <svg className="w-8 h-8 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white uppercase mb-2">FICHE COMPILÉE ET ENREGISTRÉE</h3>
              <p className="text-xs text-cyber-volt tracking-widest uppercase mb-4">STATUS DE CONFIGURATION : EN FILE D'ATTENTE</p>
              <p className="text-xs text-muted-silver max-w-md leading-relaxed">
                Les serveurs OKKUL analysent les structures de votre domaine. Un ingénieur système prendra contact avec
                vous sur le numéro enregistré sous 60 minutes.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
