import React from 'react';
import { Flame, ArrowUp, ArrowLeft } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-dark-950 pt-10 pb-16 sm:pb-12 px-4 sm:px-6 md:px-12 z-20 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Concept */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-dark-850 border border-white/10 flex items-center justify-center text-hot-orange">
            <Flame className="w-4 h-4 text-hot-orange" />
          </div>
          <div>
            <div className="font-mono font-bold text-sm text-white">
              VULCAN<span className="text-hot-orange">.3D</span> STUDIO
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Высокоточная аддитивная лаборатория
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">Vite</span>
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">React Three Fiber</span>
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">Three.js</span>
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">GSAP</span>
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">Lenis</span>
          <span className="px-2 py-0.5 rounded bg-dark-850 border border-white/5">Tailwind CSS</span>
        </div>

        {/* Back to arch1cat site & Scroll to Top */}
        <div className="flex items-center gap-3">
          <a
            href="../"
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-hot-orange/40 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-hot-orange" />
            <span>arch1cat.site</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-dark-850 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
            title="Наверх"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] text-center text-xs font-mono text-neutral-600 break-words px-2">
        © {new Date().getFullYear()} VULCAN 3D Studio & arch1cat. Все права защищены.
      </div>
    </footer>
  );
};
