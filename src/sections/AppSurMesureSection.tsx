import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const sectorData: Record<string, { title: string; blocks: { title: string; desc: string; volt?: boolean }[] }> = {
  wholesale: {
    title: 'SYSTEM ARCHITECTURE // WHOLESALE \u0026 DISTRIB',
    blocks: [
      { title: "Moteur d'Interconnexion Grossiste :", desc: "Connexion directe avec les bases de données SQL d'El Eulma. Synchronisation des stocks et gestion automatique des remises quantitatives.", volt: true },
      { title: 'Passerelle de Facturation Locale :', desc: "Génération instantanée de bons de commande, gestion des règlements en espèces (Cash on Delivery) et calcul automatique du reliquat." },
      { title: 'Synchronisation Inbound / Outbound Darija :', desc: "Les agents SAYAH 1.0 appellent les clients pour confirmer les expéditions de palettes et mettre à jour le statut dans l'ERP." },
    ],
  },
  retail: {
    title: 'SYSTEM ARCHITECTURE // RETAIL \u0026 LOCAL E-COMMERCE',
    blocks: [
      { title: "Passerelle d'Appels pour Confirmation :", desc: "Avant d'expédier, SAYAH 1.0 appelle l'acheteur en Darija, valide son adresse, son numéro de wilaya et réduit votre taux de retour de colis (Return to Origin) de 75%.", volt: true },
      { title: 'Intégration Shopify / WooCommerce / Custom API :', desc: "Chaque nouvelle commande déclenche un script de qualification immédiat via appel téléphonique automatisé et SMS de suivi." },
      { title: "Portail de Service Après-Vente :", desc: "Gestion des réclamations clients, retours de colis, et réexpédition automatisée via le système de distribution." },
    ],
  },
  medical: {
    title: 'SYSTEM ARCHITECTURE // CLINICS \u0026 HEALTHCARE',
    blocks: [
      { title: 'Secrétariat Téléphonique Médical 24/7 :', desc: "SAYAH 1.0 décroche et gère les appels en Darija pour prendre des rendez-vous, expliquer les disponibilités des médecins et qualifier le niveau d'urgence médicale.", volt: true },
      { title: "Synchronisation d'Agenda Multi-Praticiens :", desc: "Base de données en temps réel connectée aux agendas individuels des médecins. Envoi automatique de rappels de consultation par WhatsApp pour éviter les absences." },
      { title: 'Dossier Médical Sécurisé \u0026 RGPD Local :', desc: "Hébergement conforme aux normes locales de santé. Cryptage des fiches patients et synchronisation en réseau interne de la clinique." },
    ],
  },
  logistics: {
    title: 'SYSTEM ARCHITECTURE // LOGISTICS \u0026 SHIPPERS',
    blocks: [
      { title: 'Calculateur de Routes \u0026 Tarifs Wilayas :', desc: "Calcul en temps réel des tarifs d'expédition selon le poids, la wilaya de destination et le transporteur local (Yalidine, Zr, etc.).", volt: true },
      { title: 'Suivi de Colis \u0026 Relance Inbound :', desc: "Notifications vocales automatisées. SAYAH 1.0 appelle le client pour coordonner le point de rendez-vous de livraison avec le coursier." },
      { title: 'Panneau Administrateur de Dispatching :', desc: "Interface de gestion des livreurs, calcul des commissions, et génération automatique de feuilles de route quotidiennes." },
    ],
  },
};

const sectors = [
  { id: 'wholesale', label: 'Grossistes \u0026 Importations (El Eulma)' },
  { id: 'retail', label: 'E-Commerce \u0026 Retail Local' },
  { id: 'medical', label: 'Cliniques \u0026 Établissements Médicaux' },
  { id: 'logistics', label: 'Logistique \u0026 Transport de Colis' },
];

export function AppSurMesureSection() {
  const [activeSector, setActiveSector] = useState('wholesale');
  const ref = useIntersectionReveal();
  const data = sectorData[activeSector];

  return (
    <section id="app-sur-mesure" className="border-b border-iron-border radial-glow-section">
      <SectionHeader
        label="[ PRODUIT DEEP-DIVE 01 // APP SUR MESURE ]"
        title="VOTRE INFRASTRUCTURE LOGICIELLE PRIVÉE"
        infoBox="Hébergé en Algérie, sans frais de licence mensuels. Vous possédez 100% du code source. Modifiez-le quand vous le souhaitez."
        infoBoxVariant="volt"
      />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {/* Left Column */}
        <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-[#0e0e0e]/20 gap-8">
          <div>
            <h3 className="font-mono text-xs text-cyber-volt tracking-widest uppercase mb-4">[ APPS SANS COMPROMIS ]</h3>
            <p className="text-xs text-muted-silver leading-relaxed font-light mb-6">
              Les logiciels SaaS standards limitent vos processus. Okkul crée des architectures sur-mesure, optimisées
              pour la rapidité et adaptées à l'écosystème commercial algérien
              (gestion de caisse en dinars, stocks physiques, agents de Wilayas).
            </p>

            <div className="space-y-3">
              {sectors.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSector(s.id)}
                  className={`w-full text-left p-4 border rounded transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeSector === s.id
                      ? 'border-cyber-volt bg-cyber-volt/5'
                      : 'border-iron-border bg-canvas-jet/40'
                  }`}
                >
                  <span className={`font-bold text-xs uppercase tracking-wider ${activeSector === s.id ? 'text-white' : 'text-muted-silver'}`}>
                    {s.label}
                  </span>
                  <span className={`font-mono text-[9px] ${activeSector === s.id ? 'text-cyber-volt' : 'text-muted-silver/30'}`}>
                    {activeSector === s.id ? '>_ ACTIVE' : '>_ LOAD'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="border border-iron-border bg-canvas-jet p-4 rounded font-mono text-[9px] text-muted-silver/60">
            <span className="text-cyber-volt font-bold uppercase block mb-1">AUDIT ET PROPRIÉTÉ COMPLÈTE :</span>
            Contrairement aux agences traditionnelles, nous mettons en place un code modulaire avec une documentation
            claire. Vous pouvez reprendre, étendre ou héberger le code en toute autonomie.
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 p-8 md:p-10 bg-deep-black flex flex-col justify-between min-h-[500px]">
          <div className="border border-iron-border rounded-lg bg-canvas-jet/80 p-6 backdrop-blur-xl flex-1 flex flex-col justify-between shadow-xl scanline">
            <div className="flex items-center justify-between border-b border-iron-border/60 pb-4 mb-6">
              <span className="font-mono text-[10px] text-cyber-volt tracking-widest uppercase flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-cyber-volt animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
                {data.title}
              </span>
              <span className="font-mono text-[8px] text-muted-silver/50 bg-[#161615] px-2 py-0.5 border border-iron-border rounded">
                COMPILÉ ET PRÊT
              </span>
            </div>

            <div className="space-y-6 flex-1">
              {data.blocks.map((block, i) => (
                <div
                  key={`${activeSector}-${i}`}
                  className={`border p-4 rounded font-mono text-xs transition-opacity duration-300 ${
                    block.volt ? 'border-cyber-volt/20 bg-cyber-volt/5' : 'border-iron-border'
                  }`}
                >
                  <span className={`font-bold uppercase block mb-1 ${block.volt ? 'text-cyber-volt' : 'text-white'}`}>
                    {block.title}
                  </span>
                  <p className="text-[10px] text-muted-silver leading-relaxed font-light">
                    {block.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-iron-border/60 pt-6 mt-6 flex justify-between items-center font-mono text-[9px] text-muted-silver/40">
              <span>HÉBERGEMENT SOUVERAIN EN ALGÉRIE</span>
              <span>RÉDUIT LES TEMPS LATENCE &lt; 50ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
