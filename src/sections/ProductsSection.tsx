import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { SectionHeader } from '@/components/SectionHeader';

const products = [
  {
    num: '01',
    label: 'INFRASTRUCTURE LOGICIELLE',
    title: 'App sur Mesure',
    desc: 'Votre logiciel, vos règles. Nous concevons et développons vos progiciels de gestion (ERP, CRM, extranets) sur-mesure. Le code source vous appartient à 100% et reste modifiable à tout moment selon l\'évolution de vos besoins.',
    cta: 'DÉCOUVRIR LA SOLUTION',
    href: 'app-sur-mesure',
    icon: (
      <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'SYSTÈME D\'AUTOMATISATION',
    title: 'Automate your Job',
    desc: 'Libérez votre équipe des tâches administratives répétitives. Automatisation complète de vos canaux de discussion (Viber, WhatsApp), traitement intelligent de documents (bons de commande, factures) et pipelines logistiques.',
    cta: 'DÉCOUVRIR LE MOTEUR',
    href: 'automate',
    icon: (
      <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'IA DÉCISIONNELLE CEO',
    title: 'Agent RAYAS 1.0',
    desc: 'L\'intelligence qui dirige avec vous. Un conseiller virtuel panoptique qui scrute votre entreprise en continu : appels, réseaux sociaux, forces/faiblesses des employés, lois locales et marché. Le bras armé indispensable du CEO.',
    cta: 'AUDITER LA CONSOLE',
    href: 'rayas-engine',
    icon: (
      <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M21 12H3M12 3v18" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'MOTEUR VOCAL DARIJA',
    title: 'SAYAH 1.0 (السايح)',
    desc: 'Premier modèle vocal IA entraîné sur le dialecte Darija avec une latence de réponse inférieure à 300 ms. Conçu pour le service après-vente, le support commercial, la gestion de clients irrités et le blocage de fraudes.',
    cta: 'LANCER UN SCÉNARIO',
    href: 'sayah-engine',
    icon: (
      <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
];

export function ProductsSection() {
  const ref = useIntersectionReveal();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="products" className="border-b border-iron-border">
      <SectionHeader
        label="[ CATALOGUE DES SOLUTIONS // MATRICE OKKUL ]"
        title="PRODUITS TECHNOLOGIQUES OKKUL"
        infoBox="Une suite modulaire de logiciels haut de gamme et d'intelligences artificielles autonomes conçue pour transformer le B2B algérien."
      />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 divide-y divide-x-0 md:divide-x md:divide-y divide-iron-border">
        {products.map((p, i) => (
          <div
            key={i}
            className={`p-8 md:p-12 flex flex-col justify-between h-[440px] bg-canvas-jet hover:bg-[#131312] transition-all duration-300 group relative overflow-hidden reveal d${i + 1}`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-volt/5 blur-3xl rounded-full translate-x-12 -translate-y-12 pointer-events-none group-hover:bg-cyber-volt/10 transition-all" />
            <div>
              <div className="w-12 h-12 rounded border border-iron-border flex items-center justify-center mb-6 group-hover:border-cyber-volt/40 transition-colors">
                {p.icon}
              </div>
              <span className="font-mono text-[10px] text-muted-silver block mb-2 uppercase tracking-wider">// PRODUIT {p.num} — {p.label}</span>
              <h3 className="text-2xl font-black text-white tracking-normal uppercase mb-4">{p.title}</h3>
              <p className="text-xs md:text-sm text-muted-silver tracking-wide leading-relaxed font-light mb-8 max-w-md">
                {p.desc}
              </p>
            </div>
            <button
              onClick={() => scrollTo(p.href)}
              className="inline-flex items-center gap-2 font-mono text-xs text-cyber-volt tracking-widest uppercase font-bold group-hover:translate-x-1.5 transition-transform duration-300 bg-transparent border-none cursor-pointer text-left"
            >
              {p.cta} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
