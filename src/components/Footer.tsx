export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="max-w-7xl mx-auto border-x border-b border-iron-border bg-canvas-jet">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-iron-border border-b border-iron-border">
        {/* Brand */}
        <div className="p-10 flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 border border-cyber-volt flex items-center justify-center rotate-45 bg-cyber-volt/5">
                <svg className="w-4 h-4 text-cyber-volt -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black tracking-widest text-white text-lg">OKKUL</span>
                  <span className="text-cyber-volt/80 ar text-[15px]">عقول</span>
                </div>
                <span className="font-mono text-[8px] text-cyber-volt/50 tracking-widest">AGENCY // SYSTEM</span>
              </div>
            </div>
            <p className="text-xs text-muted-silver/60 leading-relaxed font-light max-w-xs">
              Architectes des systèmes intelligents pour l'entreprise algérienne. Applications souveraines. Agents IA autonomes. Zéro dépendance externe.
            </p>
            <p className="mt-3 font-mono text-xs text-cyber-volt/50 ar text-right">نبني العقول الرقمية للجزائر</p>
          </div>
        </div>

        {/* Products */}
        <div className="p-10">
          <span className="font-mono text-[9px] text-cyber-volt uppercase tracking-widest block mb-6">// PRODUITS</span>
          <div className="space-y-5">
            {[
              { id: 'app-sur-mesure', title: 'App sur Mesure', sub: 'Infrastructure Logicielle Privée' },
              { id: 'automate', title: 'Automate your Job', sub: 'Automatisation Totale B2B' },
              { id: 'rayas-engine', title: 'Agent RAYAS 1.0', sub: 'IA Décisionnelle CEO' },
              { id: 'sayah-engine', title: 'SAYAH 1.0 (السايح)', sub: 'Moteur Vocal Darija' },
              { id: 'process', title: 'Notre Processus', sub: 'Audit → Architecture → Déploiement' },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block group text-left bg-transparent border-none cursor-pointer w-full">
                <span className="font-mono text-xs text-white group-hover:text-cyber-volt transition-colors block">{item.title}</span>
                <span className="font-mono text-[9px] text-muted-silver/40 block">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="p-10 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] text-cyber-volt uppercase tracking-widest block mb-6">// DÉPLOIEMENT</span>
            <div className="space-y-5 font-mono text-xs">
              <div>
                <span className="text-muted-silver/30 text-[9px] block mb-1">LOCALISATION</span>
                <span className="text-white">Alger, Algérie</span>
              </div>
              <div>
                <span className="text-muted-silver/30 text-[9px] block mb-1">HÉBERGEMENT</span>
                <span className="text-white">Alger / Sétif (Souverain)</span>
              </div>
              <div>
                <span className="text-muted-silver/30 text-[9px] block mb-1">ENGAGEMENT</span>
                <span className="text-white">Sur rendez-vous ingénieur</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-8 inline-block font-mono text-[10px] font-bold text-canvas-jet bg-cyber-volt px-5 py-2.5 hover:bg-transparent hover:text-cyber-volt border border-cyber-volt transition-all duration-300 tracking-widest uppercase cursor-pointer"
          >
            Réserver un Audit →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[9px] text-muted-silver/40">
        <div className="flex items-center gap-2">
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </div>
          <span>SYSTÈMES OKKUL OPÉRATIONNELS</span>
        </div>
        <span>© 2026 OKKUL (عقول) — TOUS DROITS RÉSERVÉS</span>
        <div className="flex gap-5">
          <span className="hover:text-cyber-volt transition-colors cursor-pointer">Conditions</span>
          <span className="hover:text-cyber-volt transition-colors cursor-pointer">Architecture</span>
          <span className="hover:text-cyber-volt transition-colors cursor-pointer">Confidentialité</span>
        </div>
      </div>
    </footer>
  );
}
