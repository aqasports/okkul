import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

export function RoiCalculatorSection() {
  const [workers, setWorkers] = useState(3);
  const [salary, setSalary] = useState(45000);
  const ref = useIntersectionReveal();

  const annualHuman = workers * salary * 12;
  const leakageSaved = Math.round(annualHuman * 0.25);

  return (
    <section id="roi-calculator" className="border-b border-iron-border">
      <SectionHeader
        label="[ METRIQUES DE FAISABILITE // ANALYSE FINANCIERE ]"
        title="CALCULATEUR DE ROI // MARCHÉ ALGÉRIEN"
        infoBox="Mesurez la fuite de chiffre d'affaires liée à l'erreur humaine face à l'échelle infinie d'une IA locale."
      />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {/* Left - Inputs */}
        <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-10 bg-blueprint">
          {/* Slider 1 */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-cyber-volt tracking-widest uppercase flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              01 // EFFECTIFS OPÉRATIONNELS HUMAINS
            </h3>
            <div className="border border-iron-border p-6 bg-canvas-jet/80 rounded-lg backdrop-blur">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">Taille de l'équipe support / opérations</span>
                <span className="font-mono text-2xl font-black text-cyber-volt">
                  {workers} <span className="text-xs text-muted-silver font-normal">ETP</span>
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={workers}
                onChange={(e) => setWorkers(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-muted-silver/50 font-mono mt-2.5">
                <span>1 AGENT HUMAIN</span>
                <span>20 AGENTS HUMAINS</span>
              </div>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-cyber-volt tracking-widest uppercase flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
                <line x1="12" y1="6" x2="12" y2="14" />
                <path d="M17 10h-2.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3H12" />
              </svg>
              02 // SALAIRE MENSUEL MOYEN DECLARE
            </h3>
            <div className="border border-iron-border p-6 bg-canvas-jet/80 rounded-lg backdrop-blur">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">Salaire Net Moyen (Charges Comprises)</span>
                <span className="font-mono text-2xl font-black text-cyber-volt">
                  {salary.toLocaleString()} <span className="text-xs text-muted-silver font-normal">DA</span>
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={120000}
                step={5000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-muted-silver/50 font-mono mt-2.5">
                <span>30 000 DA</span>
                <span>120 000 DA</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-iron-border bg-[#141413] rounded font-mono text-[9px] text-muted-silver/60 leading-relaxed">
            Note : Les coûts reflètent les salaires nets en Algérie. Ils n'incluent pas les locaux de travail, la
            logistique matérielle, les abonnements téléphoniques fixes et les coûts de recrutement RH.
          </div>
        </div>

        {/* Right - Outputs */}
        <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-[#0e0e0e]/20">
          <div className="space-y-8">
            <div className="border border-iron-border p-6 bg-[#131312] rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
              <span className="font-mono text-[9px] text-muted-silver/70 tracking-widest uppercase">[ COÛT DU PERSONNEL HUMAIN ANNUEL ]</span>
              <div className="text-xs text-muted-silver font-light">Charges salariales cumulées :</div>
              <div className="text-3xl md:text-5xl font-black text-white tracking-normal">
                {annualHuman.toLocaleString()} <span className="text-base font-mono font-bold text-muted-silver">DA / AN</span>
              </div>
            </div>

            <div className="border border-cyber-volt/20 p-6 bg-cyber-volt/5 rounded-lg flex flex-col gap-1.5 relative overflow-hidden glow-volt">
              <span className="font-mono text-[9px] text-cyber-volt/70 tracking-widest uppercase flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                [ CAPACITÉ OPÉRATIONNELLE DES AGENTS OKKUL ]
              </span>
              <div className="text-xs text-muted-silver font-light">Lignes téléphoniques de front simultanées :</div>
              <div className="text-xl md:text-2xl font-black text-cyber-volt tracking-tight uppercase leading-none py-1.5">
                CONNEXIONS SIMULTANÉES ILLIMITÉES
              </div>
            </div>

            <div className="border border-iron-border p-6 bg-[#131312] rounded-lg flex flex-col gap-1.5 relative overflow-hidden">
              <span className="font-mono text-[9px] text-cyber-volt/70 tracking-widest uppercase flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                [ ESTIMATION DU MANQUE À GAGNER RÉCUPÉRÉ ]
              </span>
              <div className="text-xs text-muted-silver font-light">25% de ventes sauvées (appels manqués / heures de nuit / retards) :</div>
              <div className="text-3xl md:text-5xl font-black text-cyber-volt tracking-normal">
                {leakageSaved.toLocaleString()} <span className="text-base font-mono font-bold text-cyber-volt/80">DA / AN</span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-iron-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span className="font-mono text-[10px] text-white uppercase tracking-wider">OKKUL réduit vos coûts de croissance de 80%</span>
            </div>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-mono font-bold text-cyber-volt hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer"
            >
              Demander un Audit de Faisabilité Personnalisé &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
