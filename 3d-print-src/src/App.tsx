import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollManager } from './utils/scrollManager';
import { Header } from './components/Header';
import { Canvas3D } from './components/Canvas3D';
import { HeroSection } from './components/HeroSection';
import { CadSection } from './components/CadSection';
import { LayersSection } from './components/LayersSection';
import { FinishedSection } from './components/FinishedSection';
import { Calculator } from './components/Calculator';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [sectionProgress, setSectionProgress] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = initScrollManager();

    // 2. Set up overall page scroll tracking
    const updateOverallScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(window.scrollY / maxScroll);
      }
    };
    window.addEventListener('scroll', updateOverallScroll, { passive: true });

    // 3. Section ScrollTriggers for 3D Model transformation states
    const sectionIds = ['hero', 'cad', 'layers', 'finished', 'contacts'];
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setSectionIndex(index),
        onEnterBack: () => setSectionIndex(index),
        onUpdate: (self) => {
          if (self.isActive) {
            setSectionProgress(self.progress);
          }
        },
      });
      triggers.push(st);
    });

    // 4. GSAP Text & Card Entrance Animations with safe baseline visibility
    const animatedElements = document.querySelectorAll('h1, h2, .stagger-card');
    animatedElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.35, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('scroll', updateOverallScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-dark-950 text-neutral-100 overflow-x-hidden w-full max-w-full">
      
      {/* Background Subtle Coordinate Grid & Ambient Vignette */}
      <div className="fixed inset-0 grid-bg-overlay opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 radial-nozzle-vignette pointer-events-none z-0" />

      {/* Top Navbar */}
      <Header />

      {/* Persistent 3D Interactive Centerpiece Canvas */}
      <Canvas3D
        scrollProgress={scrollProgress}
        sectionIndex={sectionIndex}
        sectionProgress={sectionProgress}
      />

      {/* Content Stream with Glassmorphism Overlays */}
      <main className="relative z-20 w-full max-w-full overflow-x-hidden">
        <HeroSection />
        <CadSection />
        <LayersSection sectionProgress={sectionProgress} />
        <FinishedSection />
        <Calculator />
        <ContactsSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};
