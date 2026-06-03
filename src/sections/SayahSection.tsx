import { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';

const tabs = ['simulator', 'trainer', 'reports'] as const;

const scenarioData: Record<string, { title: string; mood: string; scam: string; logs: { speaker: string; text: string }[] }> = {
  angry: {
    title: "CLIENT EN COLÈRE // RETARD LIVRAISON",
    mood: "Calme / Empathique",
    scam: "4%",
    logs: [
      { speaker: "caller", text: "Salam! Kifach hada?! La commande ta3i 3andha 5 jours me-wesletch! Khelest el a3rboun w rani nestenna, hada machi serieux!" },
      { speaker: "system", text: "SAYAH 1.0: Détection de frustration client [Élevée]. Ajustement du ton vocal (empathique, débit modéré)." },
      { speaker: "sayah", text: "Sahha khoya, a3lik essalam. N-demandi mennek el sma7. Nefhem beli l'retard y-derrek w a3ndek el 7aq. A3tini barek l'code ta3 l'commande w n-regli l'mouchkil d'accord?" },
      { speaker: "caller", text: "Code: 4892. Rabi y3aychek khoya, rani meqlaq bezaf la commande haddi fiha sel3a me7touja 3ajil." },
      { speaker: "system", text: "SAYAH 1.0: Interrogation de la base locale RAG. Commande #4892 en transit à Chlef." },
      { speaker: "sayah", text: "Wakha khoya. La commande raho 3end Yalidine fi Chlef, el youm l'3chiya t-koun fi bureau dialhom. Hani ne-b3atlek sms b-numero de suivi. Sma7na khoya 3la l'retard." },
      { speaker: "caller", text: "Ah sahha khoya! Sahit, hada howa l'mouhim. Ya3tik el saha." },
      { speaker: "system", text: "SAYAH 1.0: Clôture de l'appel. Sentiment final: Apaisé. Rapport de ticket généré." },
    ],
  },
  scam: {
    title: "DÉTECTION DE FRAUDE // SUSPECT COLD-CALL",
    mood: "Professionnel / Alerte",
    scam: "96%",
    logs: [
      { speaker: "caller", text: "Salam. Habit n-commander 150 machines à café. Expédiez-les moi à une adresse à El Eulma, et je paierai cash à la livraison." },
      { speaker: "system", text: "SAYAH 1.0: Volume suspect détecté. Demande d'informations complémentaires." },
      { speaker: "sayah", text: "Sahha khoya. Commande kbira chwya. Teqder t-medli l'nom complet dial la societé dialek w le registre de commerce?" },
      { speaker: "caller", text: "Euh... Ma 3andich le numéro fi rasi. Ab3atli sel3a bark w l'argent ready. Ne-kheles l'livreur ki t-wsal." },
      { speaker: "system", text: "SAYAH 1.0: Refus de fournir l'identité commerciale. Vérification du numéro d'appelant sur liste noire..." },
      { speaker: "system", text: "SAYAH 1.0: Numéro d'appel lié à 3 colis non-récupérés (RTO répétés). Alerte de fraude." },
      { speaker: "sayah", text: "Sma7li khoya. Pour une commande de ce volume, el qanoun dialna y-impose paiement d'acompte de 30% par virement bancaire CCP/Baridimob ou dépôt en agence d'abord." },
      { speaker: "caller", text: "La la, cash à la livraison bark! Si non me-nekheless." },
      { speaker: "system", text: "SAYAH 1.0: Comportement suspect persistant. Commande bloquée automatiquement." },
      { speaker: "sayah", text: "M3lich khoya. Sans acompte, ma neqderch ne-démarro la commande. Yla 7abit ne-b3atlek le RIB par sms w ki t-versez ne-démarro. Merci khoya w rabi y-sahel." },
    ],
  },
  standard: {
    title: "INBOUND STANDARD // REQUÊTE STOCK",
    mood: "Amical / Vente",
    scam: "2%",
    logs: [
      { speaker: "caller", text: "Salam 3alaykoum. 3andkom dispo la cire à bois fi stock? Habit 10 boites." },
      { speaker: "system", text: "SAYAH 1.0: RAG local interroge l'inventaire en direct..." },
      { speaker: "system", text: "SAYAH 1.0: Produit dispo (56 unités en stock). Prix unitaire: 1 200 DA." },
      { speaker: "sayah", text: "Wa3alaykoum essalam khoya. Oui, kayna dispo. El prix dialha 1 200 DA la boite. Yla dit 10 boites ne-diroulek livraison gratuite l'El Eulma." },
      { speaker: "caller", text: "Ah mlih! Dit 10 boites khoya. Kifach n-demander?" },
      { speaker: "sayah", text: "Sahit! A3tini bark l'nom dialek, l'wilaya, w numero de tel. Ne-registri l'commande w ne-b3atlek confirmation direct." },
      { speaker: "caller", text: "Salim Touati, Wilaya de Sétif. Tel diali howa hada." },
      { speaker: "system", text: "SAYAH 1.0: Fiche client et bon de commande compilés dans la base SQL." },
      { speaker: "sayah", text: "C'est bon khoya Salim, la commande rahy validée. Expédition demain sbah nchallah. Ya3tik el saha!" },
    ],
  },
};

const trainingLogs = [
  ">_ Fichier 'call_record_eulma_2026.mp3' chargé avec succès (4.2 MB)",
  ">_ Pipeline ASR : Transcription sémantique & alignement linguistique (Darija algérienne)",
  ">_ Base RAG locale : Indexation de 14 nouveaux termes techniques liés aux pièces auto (actif immédiatement)",
  ">_ File d'attente d'entraînement : Échantillons de correction comportementale stockés pour consolidation",
  ">_ Planificateur : Ré-entraînement par batch périodique programmé à 02:00 (Heures creuses GPU)",
  ">_ CONFIGURATION VALIDÉE : DONNÉES ENREGISTRÉES ET PROGRAMMÉES POUR LE PROCHAIN BATCH NOCTURNE",
];

export function SayahSection() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('simulator');
  const [scenario, setScenario] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ speaker: string; text: string }[]>([]);
  const [timer, setTimer] = useState('00:00');
  const [isRunning, setIsRunning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [trainingOutput, setTrainingOutput] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logIndexRef = useRef(0);
  const secondsRef = useRef(0);
  const ref = useIntersectionReveal();

  const runScenario = (id: string) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const data = scenarioData[id];
    setScenario(id);
    setLogs([]);
    setTimer('00:00');
    setIsRunning(true);
    logIndexRef.current = 0;
    secondsRef.current = 0;

    intervalRef.current = setInterval(() => {
      secondsRef.current += 2;
      const mins = String(Math.floor(secondsRef.current / 60)).padStart(2, '0');
      const secs = String(secondsRef.current % 60).padStart(2, '0');
      setTimer(`${mins}:${secs}`);

      if (logIndexRef.current < data.logs.length) {
        setLogs((prev) => [...prev, data.logs[logIndexRef.current]]);
        logIndexRef.current++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    }, 2000);
  };

  const simulateUpload = () => {
    if (uploading) return;
    setUploading(true);
    setUploadProgress(0);
    setTrainingOutput([]);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            let idx = 0;
            const logInterval = setInterval(() => {
              if (idx < trainingLogs.length) {
                setTrainingOutput((p) => [...p, trainingLogs[idx]]);
                idx++;
              } else {
                clearInterval(logInterval);
                setUploading(false);
              }
            }, 800);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentScenario = scenario ? scenarioData[scenario] : null;

  return (
    <section id="sayah-engine" className="border-b border-iron-border radial-glow-section">
      <SectionHeader
        label="[ MODÈLE DU DIALECTE LOCAL // SAYAH 1.0 ]"
        title="SAYAH 1.0 — LLM VOCAL DARIJA"
        infoBox="Notre LLM propriétaire entraîné spécifiquement sur le dialecte algérien pour gérer les appels comme un humain."
      />
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-iron-border">
        {/* Left Column */}
        <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-canvas-jet">
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[10px] text-cyber-volt uppercase block mb-2">// CAPACITÉS COGNITIVES AVANCÉES</span>
              <h3 className="text-2xl font-black text-white tracking-normal uppercase mb-4">SAYAH 1.0</h3>
              <p className="text-xs md:text-sm text-muted-silver tracking-wide leading-relaxed font-light">
                Le modèle SAYAH 1.0 a été développé pour contourner les blocages des LLM standards. Il traite nativement
                le code-switching Darija/Français et s'ajuste périodiquement via des cycles de ré-entraînement par batch à partir des données accumulées.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {[
                { title: 'Gestion de la Colère \u0026 Tensions', desc: "SAYAH détecte la frustration de l'appelant en moins de 100ms et adopte un ton calme, respectueux et constructif en Darija." },
                { title: 'Détection de Scams \u0026 Faux Clients', desc: "Analyse en temps réel de la cohérence de la commande, de l'adresse et de l'historique pour signaler et refuser les tentatives de fraude." },
                { title: 'Ingestion Continue \u0026 Batching Nocturne', desc: "Le pipeline extrait les transcriptions et enrichit la base RAG locale en continu. Les nouveaux comportements et corrections linguistiques sont accumulés et intégrés de manière globale lors du ré-entraînement par batch nocturne." },
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
              RÉSERVER UNE DEMO SAYAH 1.0 &gt;
            </button>
          </div>
        </div>

        {/* Right Column - Control Center */}
        <div className="lg:col-span-7 p-6 md:p-10 bg-deep-black flex flex-col justify-center">
          <div className="border border-iron-border rounded-lg bg-[#111110]/95 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#181817] border-b border-iron-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-silver">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                <span className="ml-2 uppercase text-[8px] tracking-widest">SAYAH_CONTROL_CENTER //</span>
              </div>
              <div className="flex gap-2 font-mono text-[9px] py-1 flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1.5 border rounded transition-all duration-300 uppercase cursor-pointer ${
                      activeTab === tab ? 'border-cyber-volt text-cyber-volt bg-cyber-volt/10 font-bold' : 'border-iron-border text-muted-silver'
                    }`}
                  >
                    [ {tab === 'simulator' ? '1. SIMULATEUR' : tab === 'trainer' ? '2. ENTRAÎNEUR' : '3. RAPPORTS'} ]
                  </button>
                ))}
              </div>
            </div>

            {/* Simulator Tab */}
            {activeTab === 'simulator' && (
              <div className="p-5 min-h-[380px] flex flex-col justify-between bg-[#0a0a09]">
                <div className="grid grid-cols-3 gap-2 font-mono text-[8px] md:text-[9px] mb-4">
                  {[
                    { id: 'angry', label: '😠 Client en Colère', border: 'hover:border-red-500 hover:bg-red-500/5' },
                    { id: 'scam', label: '🕵️ Détection Scam', border: 'hover:border-amber-500 hover:bg-amber-500/5' },
                    { id: 'standard', label: '📞 Inbound Standard', border: 'hover:border-cyber-volt hover:bg-cyber-volt/5' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => runScenario(s.id)}
                      className={`border border-iron-border text-white p-2 rounded transition-all duration-300 text-center uppercase tracking-wide cursor-pointer ${s.border}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="border border-iron-border bg-[#050505] rounded p-4 font-mono text-[9px] leading-relaxed flex-1 flex flex-col justify-between min-h-[220px]">
                  <div className="flex justify-between items-center pb-2 border-b border-iron-border/40 text-muted-silver/60 text-[8px] mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-red-500 animate-pulse' : 'bg-cyber-volt'}`} />
                      <span>{currentScenario?.title || 'SÉLECTIONNEZ UN SCÉNARIO D\'APPEL'}</span>
                    </div>
                    <div className="flex gap-3">
                      <span>HUMEUR: <span className="text-white font-bold">{currentScenario?.mood || 'N/A'}</span></span>
                      <span>FRAUDE: <span className="text-white font-bold">{currentScenario?.scam || '0%'}</span></span>
                    </div>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto max-h-[160px] flex-1 flex flex-col justify-end">
                    {logs.length === 0 ? (
                      <div className="text-muted-silver/40 italic text-center py-6">
                        Cliquez sur l'un des boutons de scénario ci-dessus pour lancer un flux audio en Darija et observer la réaction en direct de SAYAH 1.0.
                      </div>
                    ) : (
                      logs.map((log, i) => {
                        let color = 'text-white/80';
                        let prefix = '';
                        if (log.speaker === 'caller') { color = 'text-cyan-data font-medium'; prefix = '📞 CLIENT : '; }
                        else if (log.speaker === 'sayah') { color = 'text-cyber-volt font-black'; prefix = '🤖 SAYAH 1.0 : '; }
                        else { color = 'text-yellow-500/70 italic'; prefix = '⚙️ SYSTEM : '; }
                        return (
                          <div key={i} className="border-l border-iron-border pl-2">
                            <span className={color}>{prefix}{log.text}</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="border-t border-iron-border/40 pt-2.5 mt-3 flex items-center justify-between text-[8px] text-muted-silver/40">
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-[2px] h-3 w-20">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="w-[2px] rounded-full bg-cyber-volt/35" style={{ height: isRunning ? `${Math.random() * 10 + 3}px` : '4px' }} />
                        ))}
                      </div>
                      <span>{timer}</span>
                    </div>
                    <span>LATENCE MOYENNE : <span className="text-cyber-volt font-bold">240ms</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Trainer Tab */}
            {activeTab === 'trainer' && (
              <div className="p-5 min-h-[380px] flex flex-col justify-between bg-[#0a0a09]">
                <div className="font-mono text-center flex-1 flex flex-col justify-center items-center py-4 w-full">
                  <div
                    onClick={simulateUpload}
                    className={`w-full max-w-md border border-dashed ${uploading ? 'border-cyber-volt/30' : 'border-iron-border hover:border-cyber-volt/50 hover:bg-cyber-volt/5'} p-8 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3`}
                  >
                    <div className="w-12 h-12 rounded-full border border-iron-border flex items-center justify-center bg-canvas-jet/80">
                      <svg className="w-5 h-5 text-cyber-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider text-center">CHARGER UN ENREGISTREMENT D'APPEL RÉEL</span>
                    <span className="text-[8px] text-muted-silver/60 text-center">Glissez un fichier audio .wav / .mp3 ou cliquez pour parcourir</span>

                    {uploading && (
                      <div className="w-full bg-[#181817] border border-iron-border h-2 rounded overflow-hidden mt-3">
                        <div className="bg-cyber-volt h-full transition-all duration-75" style={{ width: `${uploadProgress}%` }} />
                      </div>
                    )}
                  </div>

                  <div className="w-full max-w-md border border-iron-border bg-canvas-jet rounded p-3 text-left font-mono text-[8px] leading-relaxed mt-4 min-h-[100px] text-muted-silver/50 flex flex-col justify-end gap-1 overflow-hidden">
                    {trainingOutput.length === 0 ? (
                      <span className="italic text-center text-muted-silver/30 py-4">&gt;_ JOURNAL D'ENTRAÎNEMENT CONTINU</span>
                    ) : (
                      trainingOutput.map((log, i) => (
                        <span key={i} className={`block ${log.includes('VALIDÉE') ? 'text-cyber-volt font-bold' : ''}`}>{log}</span>
                      ))
                    )}
                  </div>
                </div>
                <div className="font-mono text-[8px] text-muted-silver/30 border-t border-iron-border/60 pt-3 mt-1 flex justify-between">
                  <span>FORMAT SUPPORTÉ : PCM WAV, MP3, FLAC</span>
                  <span>PIPELINE GPU DE SÉTIF ACTIF</span>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="p-5 min-h-[380px] flex flex-col justify-between bg-[#0a0a09]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono w-full">
                  {[
                    { label: 'Appels traités', value: '4 812', change: '+12% aujourd\'hui', changeColor: 'text-cyber-volt' },
                    { label: 'Scams Détectés', value: '83', change: '4 tentatives bloquées', changeColor: 'text-red-500' },
                    { label: 'Taux CSAT (Darija)', value: '94.8%', change: 'Optimisé par RAG local', changeColor: 'text-muted-silver/40', valueColor: 'text-cyber-volt' },
                    { label: 'Gain Cloud API', value: '1 420 $', change: "Coût d'API économisé", changeColor: 'text-cyber-volt' },
                  ].map((stat, i) => (
                    <div key={i} className="border border-iron-border p-3 rounded bg-canvas-jet/80">
                      <span className="text-[7.5px] text-muted-silver/60 uppercase block">{stat.label}</span>
                      <span className={`text-lg font-black ${stat.valueColor || 'text-white'}`}>{stat.value}</span>
                      <span className={`text-[7px] block mt-1 ${stat.changeColor}`}>{stat.change}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-iron-border bg-canvas-jet rounded p-3 font-mono text-[8.5px] mt-4 flex-1 flex flex-col w-full">
                  <span className="font-bold text-white uppercase text-[9px] mb-2 border-b border-iron-border/60 pb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    JOURNAL DES FRAUDES & TENSIONS (APPELS RÉCENTS)
                  </span>
                  <div className="space-y-1.5 overflow-y-auto max-h-[140px] flex-1">
                    {[
                      { type: 'SCAM BLOQUÉ', color: 'red', phone: '+213 551-92-xx', detail: 'Sétif - Faux grossiste', score: 'Score: 97%', scoreColor: 'text-red-400' },
                      { type: 'TENSION APAPAISÉE', color: 'yellow', phone: '+213 770-14-xx', detail: 'Client en colère - Livraison', score: 'CSAT: 92%', scoreColor: 'text-yellow-400' },
                      { type: 'RAG EXÉCUTÉ', color: 'volt', phone: '+213 661-39-xx', detail: 'Prise de commande El Eulma', score: 'Succès', scoreColor: 'text-cyber-volt' },
                    ].map((entry, i) => (
                      <div key={i} className={`flex justify-between items-center p-1.5 border rounded ${entry.color === 'red' ? 'border-red-500/20 bg-red-500/5' : entry.color === 'yellow' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-iron-border bg-[#141413]'}`}>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${entry.color === 'red' ? 'text-red-500' : entry.color === 'yellow' ? 'text-yellow-500' : 'text-cyber-volt'}`}>[{entry.type}]</span>
                          <span className="text-white">{entry.phone}</span>
                          <span className="text-muted-silver/50">({entry.detail})</span>
                        </div>
                        <span className={`font-bold ${entry.scoreColor}`}>{entry.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
