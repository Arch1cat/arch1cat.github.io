import React, { useState } from 'react';
import { Flame, Cpu, ArrowUpRight, Menu, X, ArrowLeft } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 backdrop-blur-md bg-dark-950/95 border-b border-white/[0.08] box-border transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-1.5 sm:gap-2 text-white font-mono font-bold tracking-wider text-sm sm:text-lg hover:text-hot-orange transition-colors shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-dark-850 border border-white/15 flex items-center justify-center text-hot-orange shadow-glow-hot">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-hot-orange" />
          </div>
          <span>VULCAN<span className="text-hot-orange">.3D</span></span>
        </a>

        {/* Live Extruder Status Telemetry */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-full bg-dark-850/80 border border-white/5 text-[11px] font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-hot-orange animate-ping" />
          <span className="text-white/80">HOTEND: <strong className="text-hot-glow">250°C</strong></span>
          <span className="text-neutral-600">|</span>
          <span>BED: <strong className="text-neutral-300">85°C</strong></span>
          <span className="text-neutral-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Cpu className="w-3 h-3" /> ONLINE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <a href="#cad" className="hover:text-white transition-colors">01. Моделирование</a>
          <a href="#layers" className="hover:text-white transition-colors">02. Слои & Печать</a>
          <a href="#finished" className="hover:text-white transition-colors">03. Материалы</a>
          <a href="#calculator" className="hover:text-white transition-colors">04. Расчёт</a>
          <a href="#contacts" className="hover:text-white transition-colors">05. Контакты</a>
        </nav>

        {/* Desktop Action Buttons: Return to site & Telegram CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="../"
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            title="Вернуться на главный сайт arch1cat"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>arch1cat.site</span>
          </a>

          <a
            href="https://t.me/arch1cat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-hot-orange to-hot-amber text-white font-mono text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-glow-hot hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Заказать печать</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Action & Hamburger Button */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a
            href="https://t.me/arch1cat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-hot-orange text-white font-mono text-[11px] font-semibold flex items-center gap-1 shadow-glow-hot shrink-0"
          >
            <span>Заказ</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-dark-850 border border-white/20 text-neutral-200 hover:text-white shrink-0 active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-hot-orange" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col gap-3 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hot-orange animate-pulse" />
              <span>EXTRUDER: <span className="text-hot-glow font-bold">250°C</span></span>
            </span>
            <span className="text-emerald-400 text-[10px]">ONLINE</span>
          </div>

          <a
            href="#cad"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-neutral-300 hover:text-hot-orange transition-colors"
          >
            01. Моделирование и CAD
          </a>
          <a
            href="#layers"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-neutral-300 hover:text-hot-orange transition-colors"
          >
            02. Печать слой за слоем
          </a>
          <a
            href="#finished"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-neutral-300 hover:text-hot-orange transition-colors"
          >
            03. Готовый объект и материалы
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-neutral-300 hover:text-hot-orange transition-colors"
          >
            04. Экспресс-калькулятор
          </a>
          <a
            href="#contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-neutral-300 hover:text-hot-orange transition-colors"
          >
            05. Контакты
          </a>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://t.me/arch1cat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-hot-orange text-white text-center font-medium shadow-glow-hot flex items-center justify-center gap-1.5"
            >
              <span>Заказать через Telegram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="../"
              className="w-full py-2 rounded-lg border border-white/10 text-neutral-400 text-center flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Вернуться на arch1cat.site</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
