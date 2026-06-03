import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'products', label: '01 // NOS PRODUITS' },
  { id: 'app-sur-mesure', label: '02 // APP SUR MESURE' },
  { id: 'automate', label: '03 // AUTOMATISATION' },
  { id: 'rayas-engine', label: '04 // RAYAS 1.0' },
  { id: 'sayah-engine', label: '05 // SAYAH 1.0' },
  { id: 'roi-calculator', label: '06 // CALCULATEUR' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-iron-border ${
          scrolled ? 'bg-[#111110]/95' : 'bg-[#111110]/85'
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-7 h-7 border border-cyber-volt flex items-center justify-center rotate-45 bg-cyber-volt/5">
                <svg className="w-4 h-4 text-cyber-volt -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                </svg>
              </div>
              <div className="absolute inset-0 border border-cyber-volt/20 animate-ping pointer-events-none rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-black tracking-widest text-white leading-none">OKKUL</span>
                <span className="font-mono text-cyber-volt/80 ar text-sm leading-none">عقول</span>
              </div>
              <span className="font-mono text-[8px] text-cyber-volt/70 tracking-widest uppercase mt-0.5">AGENCY // SYSTEM</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-[10px] text-muted-silver">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-cyber-volt transition-colors uppercase tracking-widest bg-transparent border-none cursor-pointer"
              >
                [ {link.label} ]
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden lg:block font-mono text-[10px] font-bold text-canvas-jet bg-cyber-volt border border-cyber-volt px-4 py-2.5 hover:bg-transparent hover:text-cyber-volt transition-all duration-300 tracking-wider uppercase"
            >
              [ CONTACTER UN INGÉNIEUR ]
            </button>
            <button
              className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-1"
              onClick={() => {
                setMobileOpen(true);
                document.body.style.overflow = 'hidden';
              }}
            >
              <span className="block w-[22px] h-[1.5px] bg-muted-silver" />
              <span className="block w-[22px] h-[1.5px] bg-muted-silver" />
              <span className="block w-[22px] h-[1.5px] bg-muted-silver" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#111110]/98 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-7 transition-transform duration-350 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
      >
        <button
          className="absolute top-5 right-6 flex flex-col gap-[5px] cursor-pointer p-1"
          onClick={() => {
            setMobileOpen(false);
            document.body.style.overflow = '';
          }}
        >
          <span className="block w-[22px] h-[1.5px] bg-cyber-volt translate-y-[6.5px] rotate-45" />
          <span className="block w-[22px] h-[1.5px] bg-cyber-volt opacity-0" />
          <span className="block w-[22px] h-[1.5px] bg-cyber-volt -translate-y-[6.5px] -rotate-45" />
        </button>
        <div className="font-mono text-[9px] text-cyber-volt/50 tracking-widest uppercase mb-2">// NAVIGATION</div>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="mob-link font-mono text-xs text-muted-silver uppercase tracking-widest bg-transparent border-none cursor-pointer hover:text-cyber-volt transition-colors"
          >
            [ {link.label} ]
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="mt-4 font-mono text-[10px] font-bold text-canvas-jet bg-cyber-volt px-8 py-3 tracking-widest uppercase border-none cursor-pointer"
        >
          [ CONTACTER UN INGÉNIEUR ]
        </button>
        <div className="mt-6 font-mono text-[9px] text-muted-silver/30 tracking-widest ar">OKKUL // عقول — الجزائر</div>
      </div>
    </>
  );
}
