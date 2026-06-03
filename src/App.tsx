import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PageLoader } from '@/components/PageLoader';
import { ScrollProgress } from '@/components/ScrollProgress';
import { CustomCursor } from '@/components/CustomCursor';
import { StructuralFrame } from '@/components/StructuralFrame';
import { NeuralConstellation } from '@/components/3d/NeuralConstellation';
import { HeroSection } from '@/sections/HeroSection';
import { StatsStrip } from '@/sections/StatsStrip';
import { ProductsSection } from '@/sections/ProductsSection';
import { AppSurMesureSection } from '@/sections/AppSurMesureSection';
import { AutomateSection } from '@/sections/AutomateSection';
import { RayasSection } from '@/sections/RayasSection';
import { SayahSection } from '@/sections/SayahSection';
import { RoiCalculatorSection } from '@/sections/RoiCalculatorSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ContactSection } from '@/sections/ContactSection';

export default function App() {
  // Track mouse for radial glow sections
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sections = document.querySelectorAll('.radial-glow-section, #contact');
      sections.forEach((sec) => {
        const rect = (sec as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (sec as HTMLElement).style.setProperty('--x', `${x}px`);
        (sec as HTMLElement).style.setProperty('--y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas-jet text-white overflow-x-hidden">
      {/* 3D Background */}
      <NeuralConstellation />

      {/* Global UI */}
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <StructuralFrame />
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto border-x border-iron-border bg-canvas-jet/80">
        <HeroSection />
        <StatsStrip />
        <ProductsSection />
        <AppSurMesureSection />
        <AutomateSection />
        <RayasSection />
        <SayahSection />
        <RoiCalculatorSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
