import React, { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const tabs = ['intelligence', 'employees', 'market', 'proposals'] as const;

const tabContent: Record<typeof tabs[number], { title: string; content: React.ReactNode }> = {
  intelligence: {
    title: '// FLUX D\'INTELLIGENCE \u0026 ANALYSE COMPAGNIE',
    content: (
      <div className="space-y-4">
        <div className="border border-iron-border bg-canvas-jet/80 p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-cyan-data font-bold block mb-1">[SOCIAL INSTAGRAM / TÉLÉPHONIE] (24h) :</span>
          "24 appels reçus de l'Ouest (Oran/Tlemcen) signalant des retards de livraison du prestataire actuel.
          8 commentaires sous la publication du produit X indiquent une volonté d'achat mais une friction sur
          les tarifs d'expédition."
        </div>
        <div className="border border-cyber-volt/20 bg-cyber-volt/5 p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-cyber-volt font-bold block mb-1">[DIRECTIVE RAYAS RECOMMENDÉE] :</span>
          "Transitionner le flux de transport de l'Ouest vers Yalidine (latence réduite de 48h). Mettre à jour
          le script de SAYAH 1.0 pour proposer une livraison offerte à partir de 3 articles commandés dans ces
          Wilayas."
        </div>
        <div className="border-t border-iron-border/40 pt-3 text-[8px] text-muted-silver/40 font-mono flex justify-between">
          <span>FLUX AUDIO INTERCEPTÉ : 412 min</span>
          <span>RÉTROACTION : ACTIVE</span>
        </div>
      </div>
    ),
  },
  employees: {
    title: '// AUDIT COMPÉTENCES \u0026 CAPACITÉS OPÉRATIONNELLES',
    content: (
      <div className="space-y-4">
        <div className="border border-iron-border bg-canvas-jet p-3 rounded flex items-center justify-between font-mono text-[9px]">
          <div>
            <span className="text-white font-bold">Salim (Commercial Eulma)</span>
            <div className="text-[8px] text-muted-silver/50 mt-0.5">Forces: Vente de gros volume, Négociation directe</div>
            <div className="text-[8px] text-red-500/70">Faiblesses: Saisie de données administrative CRM, temps d'écran</div>
          </div>
          <span className="text-cyber-volt border border-cyber-volt/20 bg-cyber-volt/5 px-2 py-1 rounded text-[8px]">RÉALLOUER 75% DU TEMPS</span>
        </div>
        <div className="border border-iron-border bg-canvas-jet p-3 rounded flex items-center justify-between font-mono text-[9px]">
          <div>
            <span className="text-white font-bold">Amine (Support Dispatch)</span>
            <div className="text-[8px] text-muted-silver/50 mt-0.5">Forces: Résolution de litiges logistiques</div>
            <div className="text-[8px] text-red-500/70">Faiblesses: Surcharge d'appels clients de nuit (saturation cognitive)</div>
          </div>
          <span className="text-cyber-volt border border-cyber-volt/20 bg-cyber-volt/5 px-2 py-1 rounded text-[8px]">DÉLÉGUER À SAYAH</span>
        </div>
        <div className="border border-yellow-500/20 bg-yellow-500/5 p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-yellow-500 font-bold block mb-1">[GUIDANCE DÉCISIONNELLE] :</span>
          "Déployer le WhatsApp Order Extractor pour Salim afin de générer ses fiches automatiquement. Connecter
          SAYAH 1.0 de 18:00 à 08:00 pour décharger Amine de 100% des appels hors-horaires."
        </div>
        <div className="border-t border-iron-border/40 pt-3 text-[8px] text-muted-silver/40 font-mono flex justify-between">
          <span>MEMBRES ÉVALUÉS : 12 ETP</span>
          <span>OPTIMISATION : +34% PRODUCTIVITÉ</span>
        </div>
      </div>
    ),
  },
  market: {
    title: '// VEILLE LÉGALE \u0026 ANALYSE CONCURRENTIELLE',
    content: (
      <div className="space-y-4">
        <div className="border border-iron-border bg-canvas-jet p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-amber-alert font-bold block mb-1">[JOURNAL OFFICIEL / DÉCRET DOUANES] (Détection automatique) :</span>
          "Ajustement des taxes douanières sur les intrants polymères importés de 15%. Coût théorique estimé
          sur votre ligne de production : +11.2% à partir du prochain trimestre."
        </div>
        <div className="border border-iron-border bg-canvas-jet p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-white font-bold block mb-1">[COMPÉTITEURS / BENCHMARK TARIFS] :</span>
          "Le distributeur direct concurrent X a augmenté ses grilles de prix de gros de 7.5% ce matin sur le
          catalogue de Sétif."
        </div>
        <div className="border border-cyber-volt/20 bg-cyber-volt/5 p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-cyber-volt font-bold block mb-1">[DIRECTIVE STRATÉGIQUE CONSEILLÉE] :</span>
          "Augmenter vos tarifs de 6% pour compenser le décret et absorber la hausse douanière tout en
          maintenant un avantage tarifaire de 1.5% face au concurrent X."
        </div>
        <div className="border-t border-iron-border/40 pt-3 text-[8px] text-muted-silver/40 font-mono flex justify-between">
          <span>ALERTES LÉGALES : 1 NOUVELLE</span>
          <span>CONCURRENTS MONITORÉS : 3</span>
        </div>
      </div>
    ),
  },
  proposals: {
    title: "// OPPORTUNITÉS DE PRODUITS \u0026 DÉVELOPPEMENT",
    content: (
      <div className="space-y-4">
        <div className="border border-cyber-volt/20 bg-cyber-volt/5 p-3.5 rounded font-mono text-[9px] leading-relaxed glow-volt">
          <span className="text-cyber-volt font-bold block mb-1.5">[OPPORTUNITÉ #01: KIT B2B COMPLET] :</span>
          <span className="text-white font-semibold">Proposer un conditionnement "Pack Grossiste Wilayas" de 100 unités avec livraison incluse.</span>
          <p className="text-[8px] text-muted-silver/60 mt-1">Argumentaire : 43 clients de gros ont demandé une réduction sur le fret ces derniers 30 jours lors de leurs appels au service client Darija.</p>
        </div>
        <div className="border border-iron-border bg-canvas-jet p-3 rounded font-mono text-[9px] leading-relaxed">
          <span className="text-white font-bold block mb-1">[OPPORTUNITÉ #02: OFFRE COMPLÉMENTAIRE] :</span>
          <span className="text-white font-semibold">Lancer un service de garantie logistique locale "Cassé ou Remplacé" à 150 DA.</span>
          <p className="text-[8px] text-muted-silver/60 mt-1">Argumentaire : Taux d'incidents du transporteur actuel à 1.2%. Le coût de remplacement est marginal face aux gains de conversion générés par l'assurance de sérénité.</p>
        </div>
        <div className="border-t border-iron-border/40 pt-3 text-[8px] text-muted-silver/40 font-mono flex justify-between">
          <span>CONVERSIONS POTENTIELLES : +18% CA</span>
          <span>FIABILITÉ ANALYSE : 92%</span>
        </div>
      </div>
    ),
  },
};

export function RayasSection() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('intelligence');
  const ref = useIntersectionReveal();
  const current = tabContent[activeTab];

  return (
    <section id="rayas-engine" className="border-b border-iron-border radial-glow-section">
      <SectionHeader
        label="[ PRODUIT DEEP-DIVE 03 // AGENT RAYAS 1.0 ]"
        title="RAYAS 1.0 — LE BRAS DROIT STRATÉGIQUE DU CEO"
        infoBox="Un agent décisionnel connecté à chaque ramification de votre entreprise pour guider les comportements et les produits."
      />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {/* Left Column */}
        <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-canvas-jet">
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[10px] text-cyber-volt uppercase block mb-2">// VISION COGNITIVE PANOPTIQUE</span>
              <h3 className="text-2xl font-black text-white tracking-normal uppercase mb-4">Le Cerveau de l'Entreprise</h3>
              <p className="text-xs md:text-sm text-muted-silver tracking-wide leading-relaxed font-light">
                RAYAS 1.0 n'est pas un simple outil d'analyse passif. C'est un Consultant IA souverain qui a une vue
                d'ensemble sur tout ce qui se passe dans votre entreprise : enregistrements d'appels, interactions sur
                les réseaux sociaux, compétences de vos employés, conformité légale en Algérie et tendances du marché
                local. Il synthétise ces données en continu pour conseiller le CEO et les directeurs de département.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {[
                { title: 'Intelligence Globale \u0026 Social Media', desc: "Surveille en continu l'image de marque et les retours clients réels (appels d'assistance, commentaires Facebook/Instagram)." },
                { title: 'Analyse des Forces/Faiblesses Employés', desc: "Identifie les points de friction dans l'exécution de vos équipes pour suggérer des optimisations de rôle ou des outils adaptés." },
                { title: 'Veille Légale \u0026 Études de Marché', desc: "Scanne les nouveaux textes de lois algériens et analyse les variations tarifaires de vos concurrents directs." },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-cyber-volt mt-0.5">•</span>
                  <div>
                    <span className="text-white font-bold block uppercase text-[11px]">{f.title}</span>
                    <p className="text-[10px] text-muted-silver/60 font-light mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-iron-border/60">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 font-mono text-[10px] text-cyber-volt hover:underline tracking-widest uppercase bg-transparent border-none cursor-pointer"
            >
              DEMANDER UN PROTOTYPE RAYAS 1.0 &gt;
            </button>
          </div>
        </div>

        {/* Right Column - Dashboard */}
        <div className="lg:col-span-7 p-6 md:p-10 bg-deep-black flex flex-col justify-center">
          <div className="border border-iron-border rounded-lg bg-[#111110]/95 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#181817] border-b border-iron-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-silver">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                <span className="ml-2 uppercase text-[8px] tracking-widest">RAYAS_DECISION_DASHBOARD //</span>
              </div>
              <div className="flex gap-1.5 font-mono text-[9px] py-1 flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1.5 border rounded transition-all duration-300 uppercase cursor-pointer ${
                      activeTab === tab
                        ? 'border-cyber-volt text-cyber-volt bg-cyber-volt/10 font-bold'
                        : 'border-iron-border text-muted-silver'
                    }`}
                  >
                    [ {tab === 'intelligence' ? '1. INTELLIGENCE' : tab === 'employees' ? '2. EMPLOYÉS' : tab === 'market' ? '3. MARCHÉ' : '4. PROPOSITIONS'} ]
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 min-h-[350px] flex flex-col justify-between bg-[#0a0a09]">
              <div className="space-y-4">
                <div className="font-mono text-[10px] text-cyber-volt">{current.title}</div>
                {current.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
