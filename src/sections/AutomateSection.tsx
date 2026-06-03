import { useState, useEffect } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const pipelineSteps = [
  { num: '01', event: '// EVENT INBOUND WHATSAPP', text: 'Commande reçue : "30 sachets de café à Oran"', status: 'REÇU' },
  { num: '02', event: '// INVENTAIRE VECTORIEL LOCAL', text: 'Recherche vectorielle \u0026 RAG des stocks : Café en grain dispo', status: 'ATTENTE' },
  { num: '03', event: '// INTEGRATION FACTURATION ERP', text: 'Génération bon de livraison #BL-9922', status: 'ATTENTE' },
  { num: '04', event: '// LOGISTIQUE DE DISPATCH', text: 'Notification de livraison expédiée au transporteur', status: 'ATTENTE' },
];

export function AutomateSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useIntersectionReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getStepClasses = (index: number) => {
    if (index === activeStep) {
      return 'border-cyber-volt bg-cyber-volt/5 scale-[1.02] shadow-[0_0_15px_rgba(200,255,0,0.15)] z-10 relative';
    } else if (index < activeStep) {
      return 'border-iron-border bg-canvas-jet/80 opacity-60';
    }
    return 'border-iron-border bg-canvas-jet/40 opacity-30';
  };

  const getBadge = (index: number) => {
    if (index === activeStep) {
      return (
        <span className="font-mono text-[9px] text-cyber-volt bg-cyber-volt/10 border border-cyber-volt/20 px-2 py-0.5 rounded flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-volt opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyber-volt" />
          </span>
          EXÉCUTION
        </span>
      );
    } else if (index < activeStep) {
      return (
        <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          TERMINÉ
        </span>
      );
    }
    return (
      <span className="font-mono text-[9px] text-muted-silver/40 bg-iron-border px-2 py-0.5 rounded flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-silver/40" />
        EN ATTENTE
      </span>
    );
  };

  return (
    <section id="automate" className="border-b border-iron-border radial-glow-section">
      <SectionHeader
        label="[ PRODUIT DEEP-DIVE 02 // AUTOMATE YOUR JOB ]"
        title="ÉRADICATION DES SURCHARGES DE TRAVAIL MANUEL"
        infoBox="Líez vos CRM, messageries et bases de données. Laissez nos scripts gérer les flux administratifs à votre place."
      />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {/* Left Column */}
        <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-canvas-jet">
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[10px] text-cyber-volt uppercase block mb-2">// FLUX DE TRAVAIL SANS FRICTION</span>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-4">Automatisation Totale</h3>
              <p className="text-xs md:text-sm text-muted-silver tracking-wide leading-relaxed font-light">
                Les erreurs de saisie et les retards de traitement tuent les marges. Notre moteur automatise vos tâches
                de back-office récurrentes : réception des commandes WhatsApp/Viber, vérification instantanée des
                inventaires, mise à jour du CRM, génération de bons logistiques de livraison et alerte par messagerie
                instantanée.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {[
                { icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', title: 'Bots WhatsApp \u0026 Viber Professionnels', desc: 'Capturez les commandes directes de vos clients en messagerie sans aucun traitement manuel.' },
                { icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H9 8', title: 'Parsing de Factures \u0026 Bons OCR', desc: "Extraction automatique des lignes de texte, prix et adresses depuis des photos de documents reçus." },
                { icon: 'M21.5 2v6h-6 M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67', title: 'Synchronisation Multi-Plateformes', desc: 'Liez vos boutiques Shopify, WooCommerce avec vos progiciels de gestion commerciale de bureau locaux.' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-1 border border-cyber-volt/20 text-cyber-volt rounded mt-0.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-white font-bold block uppercase text-[11px]">{f.title}</span>
                    <p className="text-[10px] text-muted-silver/60 font-light mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-iron-border/60">
            <span className="font-mono text-[9px] text-muted-silver/40">AUTOMATISATION INTÉGRALE PAR OKKUL LABS</span>
          </div>
        </div>

        {/* Right Column - Pipeline */}
        <div className="lg:col-span-7 p-6 md:p-10 bg-deep-black flex flex-col justify-center min-h-[480px]">
          <div className="border border-iron-border rounded-lg bg-[#111110]/95 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#181817] border-b border-iron-border px-5 py-3 flex items-center justify-between font-mono text-[9px] text-muted-silver">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-volt animate-ping" />
                <span>PIPELINE_MONITOR // AUTOMATION INGRESS</span>
              </div>
              <span className="text-[8px] bg-cyber-volt/10 border border-cyber-volt/20 text-cyber-volt px-2 py-0.5 rounded">STATUT : RUNNING</span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-6">
              {pipelineSteps.map((step, i) => (
                <div key={i} className={`border rounded p-4 flex items-center justify-between transition-all duration-500 ${getStepClasses(i)}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded border border-iron-border flex items-center justify-center bg-canvas-jet font-mono text-xs text-muted-silver flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-muted-silver/50 block uppercase">{step.event}</span>
                      <span className="font-bold text-xs text-white">{step.text}</span>
                    </div>
                  </div>
                  {getBadge(i)}
                </div>
              ))}
            </div>

            <div className="border-t border-iron-border bg-[#141413] px-5 py-3.5 flex justify-between items-center font-mono text-[9px] text-muted-silver/40">
              <span>VITESSE D'ÉMISSION DU PIPELINE : &lt; 0.8s</span>
              <span>SYSTÈMES INTERCONNECTÉS : 4/4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
