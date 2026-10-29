import React from 'react';
import { Flame, Thermometer, Gauge, Activity, Crosshair } from 'lucide-react';

interface LayersSectionProps {
  sectionProgress: number; // 0 to 1
}

export const LayersSection: React.FC<LayersSectionProps> = ({ sectionProgress }) => {
  // Slicing height calculation
  const totalLayers = 1420;
  const currentLayer = Math.min(
    totalLayers,
    Math.max(1, Math.round(sectionProgress * totalLayers))
  );
  const currentHeightMm = (currentLayer * 0.05).toFixed(2);

  return (
    <section
      id="layers"
      className="relative min-h-screen flex flex-col justify-center py-20 sm:py-28 px-3.5 sm:px-6 md:px-12 w-full max-w-full mx-auto z-20 pointer-events-auto overflow-hidden box-border"
    >
      <div className="md:ml-auto w-full max-w-full md:max-w-xl lg:max-w-2xl">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850/90 border border-hot-orange/20 text-xs font-mono text-hot-orange mb-4 sm:mb-6">
          <Flame className="w-3.5 h-3.5 animate-pulse text-hot-orange" />
          <span>02 / АДДИТИВНЫЙ СИНТЕЗ</span>
        </div>

        {/* Headline Block with Frosted Glass Scrim for Maximum Contrast */}
        <div className="backdrop-blur-md md:backdrop-blur-none bg-dark-950/85 md:bg-transparent p-4 sm:p-6 md:p-0 rounded-2xl border border-white/10 md:border-0 shadow-2xl md:shadow-none mb-6 box-border">
          <h2 className="text-2xl sm:text-5xl font-bold font-sans text-white tracking-tight leading-tight mb-3">
            Печать <br />
            <span className="text-hot-glow font-mono">слой за слоем</span>
          </h2>

          <p className="text-neutral-300 md:text-neutral-400 text-xs sm:text-base leading-relaxed font-sans">
            Материал осаждается микроскопическими слоями толщиной от 50 микрон.
            Прецизионные шаговые сервоприводы с оптическими энкодерами и замкнутая термокамера
            гарантируют монолитное сцепление слоев без расслоения и термической усадки.
          </p>
        </div>

        {/* Live Extruder Telemetry HUD Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/95 border border-hot-orange/40 shadow-glow-hot backdrop-blur-xl mb-6 box-border">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4 gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <Crosshair className="w-4 h-4 text-hot-orange animate-spin shrink-0" />
              <span className="truncate">ТЕЛЕМЕТРИЯ СОПЛА</span>
            </div>
            <div className="text-[11px] font-mono text-hot-orange bg-hot-orange/10 px-2 py-0.5 rounded border border-hot-orange/30 shrink-0">
              LAYER {currentLayer} / {totalLayers}
            </div>
          </div>

          {/* Layer Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-mono mb-1.5 text-neutral-400">
              <span>Прогресс печати</span>
              <span className="text-white font-bold">{Math.round(sectionProgress * 100)}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-dark-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-hot-orange via-hot-amber to-yellow-400 transition-all duration-150"
                style={{ width: `${Math.max(4, Math.round(sectionProgress * 100))}%` }}
              />
            </div>
          </div>

          {/* Sensor Matrix */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            <div className="p-2 rounded-lg bg-dark-850 border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 mb-0.5">
                <Thermometer className="w-3 h-3 text-hot-orange shrink-0" /> СОПЛО
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">255°C</div>
            </div>

            <div className="p-2 rounded-lg bg-dark-850 border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 mb-0.5">
                <Gauge className="w-3 h-3 text-hot-amber shrink-0" /> СТОЛ
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">90°C</div>
            </div>

            <div className="p-2 rounded-lg bg-dark-850 border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 mb-0.5">
                <Activity className="w-3 h-3 text-emerald-400 shrink-0" /> ВЫСОТА Z
              </div>
              <div className="text-xs sm:text-sm font-bold text-hot-glow">{currentHeightMm} мм</div>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md">
            <div className="font-mono font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-hot-orange shrink-0" />
              Микропослойное слияние
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Нагрев экструдера до 450°C для работы с тугоплавкими полимерами PEEK, PEKK и карбоновым нейлоном.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md">
            <div className="font-mono font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-hot-orange shrink-0" />
              Активная термокамера
            </div>
            <p className="text-neutral-400 leading-relaxed text-[11px]">
              Стабильные 70-90°C внутри рабочей зоны предотвращают деформацию и кристаллизацию при остывании.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
