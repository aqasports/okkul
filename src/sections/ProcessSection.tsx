import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const phases = [
  {
    num: '01',
    label: 'PHASE 01',
    title: 'Audit \u0026 Cadrage',
    desc: "Analyse approfondie de vos flux opérationnels, blocages actuels et objectifs métier. On cartographie votre architecture existante avant d'écrire la première ligne de code.",
    special: false,
  },
  {
    num: '02',
    label: 'PHASE 02',
    title: 'Architecture',
    desc: 'Conception du système sur-mesure : stack technique, modélisation BDD, plan\'intégration des agents IA et validation client avant démarrage.',
    special: false,
  },
  {
    num: '03',
    label: 'PHASE 03',
    title: 'Déploiement',
    desc: "Installation sur vos serveurs locaux, formation de vos équipes, tests de charge, calibration de SAYAH 1.0 sur votre dialecte et mise en production supervisée.",
    special: false,
  },
  {
    num: '04',
    label: 'PHASE 04',
    title: 'Autonomie Totale',
    desc: "Le code source vous est livré avec documentation complète. Vous évoluez librement, à votre rythme, avec ou sans nous. Aucun frais de maintenance forcée.",
    special: true,
  },
];

export function ProcessSection() {
  const ref = useIntersectionReveal();

  return (
    <section id="process" className="border-b border-iron-border radial-glow-section">
      <SectionHeader
        label="[ PROTOCOLE D'ENGAGEMENT // DE L'AUDIT AU DÉPLOIEMENT ]"
        title="NOTRE PROCESSUS EN 4 PHASES"
        infoBox="De la découverte à la livraison du code source. Un protocole d'ingénierie rigoureux, sans surprise."
      />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {phases.map((phase, i) => (
          <div key={i} className={`p-8 md:p-10 flex flex-col gap-5 reveal d${i + 1} ${phase.special ? 'bg-cyber-volt/[0.02]' : ''}`}>
            <span className="font-mono text-6xl font-black text-cyber-volt/15 leading-none select-none">{phase.num}</span>
            <div className="w-10 h-px bg-cyber-volt/40" />
            <div>
              <span className="font-mono text-[9px] text-cyber-volt uppercase tracking-widest block mb-2">{phase.label}</span>
              <h3 className="text-base font-black text-white uppercase mb-3">{phase.title}</h3>
              <p className="text-xs text-muted-silver leading-relaxed font-light">{phase.desc}</p>
            </div>
            {phase.special && (
              <div className="mt-auto border border-cyber-volt/20 bg-cyber-volt/5 p-3 rounded font-mono text-[9px] text-cyber-volt/70">
                ✓ Code modifiable à l'infini — Propriété absolue
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
