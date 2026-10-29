import React from 'react';
import { ArrowDown, Sparkles, Box, ShieldCheck, Zap, Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-20 sm:pt-32 pb-12 sm:pb-16 px-3.5 sm:px-6 md:px-12 w-full max-w-full mx-auto z-20 pointer-events-auto overflow-hidden box-border"
    >
      {/* Background radial glow safely bounded */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-hot-500/10 blur-[70px] sm:blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Eyebrow Tag */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-dark-850/90 border border-white/10 text-[10px] sm:text-xs font-mono text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-hot-orange animate-ping" />
          <span className="tracking-wider uppercase text-hot-orange font-semibold">VULCAN STUDIO</span>
          <span className="text-neutral-500">•</span>
          <span>ADDITIVE LAB</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-850/60 border border-white/5 text-xs font-mono text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Собственный парк промышленных принтеров</span>
        </div>
      </div>

      {/* Center Main Headline with Frosted Scrim */}
      <div className="my-auto py-4 sm:py-10 w-full max-w-full md:max-w-2xl lg:max-w-3xl backdrop-blur-md md:backdrop-blur-none bg-dark-950/75 md:bg-transparent p-3.5 sm:p-6 md:p-0 rounded-2xl border border-white/10 md:border-0 shadow-2xl md:shadow-none box-border">
        <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold font-sans tracking-tight text-white leading-[1.12] mb-3 sm:mb-6">
          VULCAN — <br />
          <span className="text-white">
            3D-печать под заказ
          </span>
        </h1>

        <p className="text-base sm:text-2xl font-light text-hot-glow font-mono tracking-tight mb-3 sm:mb-6 thermal-glow-text">
          Идеи становятся объектами.
        </p>

        <p className="text-neutral-300 md:text-neutral-400 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 font-sans">
          Превращаем цифровые CAD-модели и чертежи в готовые детали. Инженерные композиты с углеволокном, фотополимеры и сверхточная печать до 20 микрон.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
          <a
            href="https://t.me/arch1cat"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-hot-orange to-hot-amber text-white font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-glow-hot hover:brightness-110 active:scale-95 transition-all text-center shrink-0"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Рассчитать стоимость по 3D-модели</span>
          </a>

          <a
            href="#cad"
            className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-dark-850/80 hover:bg-dark-800 text-neutral-300 hover:text-white border border-white/15 font-mono text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <span>Этапы производства</span>
            <ArrowDown className="w-4 h-4 text-hot-orange" />
          </a>
        </div>
      </div>

      {/* Bottom Telemetry Ticker Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-8 border-t border-white/[0.08] w-full box-border">
        <div className="p-2 sm:p-3.5 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-neutral-500 mb-0.5 flex items-center gap-1 sm:gap-1.5">
            <Zap className="w-3 h-3 text-hot-orange shrink-0" /> Точность слоя
          </div>
          <div className="text-sm sm:text-lg font-mono font-bold text-white">0.05 мм</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-400">Микронная точность</div>
        </div>

        <div className="p-2 sm:p-3.5 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-neutral-500 mb-0.5 flex items-center gap-1 sm:gap-1.5">
            <Box className="w-3 h-3 text-hot-orange shrink-0" /> Рабочее поле
          </div>
          <div className="text-sm sm:text-lg font-mono font-bold text-white">400×400×500</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-400">Крупный формат</div>
        </div>

        <div className="p-2 sm:p-3.5 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-neutral-500 mb-0.5 flex items-center gap-1 sm:gap-1.5">
            <Flame className="w-3 h-3 text-hot-orange shrink-0" /> Материалы
          </div>
          <div className="text-sm sm:text-lg font-mono font-bold text-white">15+ полимеров</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-400">PA-CF, PEEK, TPU</div>
        </div>

        <div className="p-2 sm:p-3.5 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-neutral-500 mb-0.5 flex items-center gap-1 sm:gap-1.5">
            <Sparkles className="w-3 h-3 text-hot-orange shrink-0" /> Сроки
          </div>
          <div className="text-sm sm:text-lg font-mono font-bold text-white">от 24 часов</div>
          <div className="text-[10px] sm:text-[11px] text-neutral-400">Быстрый прототип</div>
        </div>
      </div>
    </section>
  );
};
