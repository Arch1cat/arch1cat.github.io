import React from 'react';
import { Cpu, CheckCircle2, FileCode, Layers, Scan, Sparkles } from 'lucide-react';

export const CadSection: React.FC = () => {
  return (
    <section
      id="cad"
      className="relative min-h-screen flex flex-col justify-center py-20 sm:py-28 px-3.5 sm:px-6 md:px-12 w-full max-w-full mx-auto z-20 pointer-events-auto overflow-hidden box-border"
    >
      <div className="w-full max-w-full md:max-w-xl lg:max-w-2xl">
        
        {/* Section Index Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850/90 border border-hot-orange/20 text-xs font-mono text-hot-orange mb-4 sm:mb-6">
          <Cpu className="w-3.5 h-3.5" />
          <span>01 / ЦИФРОВОЙ ИНЖИНИРИНГ</span>
        </div>

        {/* Section Headline Block with Frosted Glass Scrim */}
        <div className="backdrop-blur-md md:backdrop-blur-none bg-dark-950/80 md:bg-transparent p-4 sm:p-6 md:p-0 rounded-2xl border border-white/10 md:border-0 shadow-2xl md:shadow-none mb-6 box-border">
          <h2 className="text-2xl sm:text-5xl font-bold font-sans text-white tracking-tight leading-tight mb-3">
            От идеи — <br />
            <span className="text-hot-glow font-mono">к цифровой модели</span>
          </h2>

          <p className="text-neutral-300 md:text-neutral-400 text-xs sm:text-base leading-relaxed font-sans">
            Любое физическое изделие начинается с точной параметрической геометрии. Мы проектируем
            детали «с нуля» по эскизам, ТЗ или физическим образцам, оптимизируя топологию
            для максимальной жесткости и минимальной массы.
          </p>
        </div>

        {/* Engineering Capabilities Grid */}
        <div className="space-y-3 sm:space-y-4 mb-8">
          
          <div className="p-3.5 sm:p-4 rounded-xl bg-dark-900/90 border border-white/[0.08] hover:border-hot-orange/30 transition-all group backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-dark-800 text-hot-orange group-hover:scale-105 transition-transform shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-white font-mono">
                    Промышленный CAD & Параметрика
                  </h3>
                  <span className="text-[10px] text-hot-orange font-normal px-2 py-0.5 rounded bg-hot-orange/10 shrink-0">
                    STEP / STL / 3MF
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Построение твердотельных моделей в SolidWorks, Fusion 360 и Rhino с соблюдением
                  инженерных допусков под посадку подшипников, резьб и сопрягаемых узлов.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-dark-900/90 border border-white/[0.08] hover:border-hot-orange/30 transition-all group backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-dark-800 text-hot-orange group-hover:scale-105 transition-transform shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-white font-mono">
                    Топологическая оптимизация (FEA)
                  </h3>
                  <span className="text-[10px] text-neutral-400 px-2 py-0.5 rounded bg-white/5 shrink-0">
                    -45% массы
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Расчёт силовых векторов и удаление ненагруженного материала. Бионические структуры
                  и гироидные ячейки заполнения для экстремальной стойкости к кручению.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-dark-900/90 border border-white/[0.08] hover:border-hot-orange/30 transition-all group backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-dark-800 text-hot-orange group-hover:scale-105 transition-transform shrink-0">
                <Scan className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-white font-mono">
                    Реверс-инжиниринг и оцифровка
                  </h3>
                  <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 shrink-0">
                    ±0.03 мм
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Лазерное 3D-сканирование изношенных деталей с последующей реконструкцией
                  идеальной CAD-модели и подготовкой к печати.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Accepted Formats Footer Tag */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-neutral-400">
          <span className="text-neutral-500 text-[11px]">Форматы:</span>
          {['.STEP', '.STL', '.OBJ', '.3MF', '.IGES'].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded bg-dark-850 border border-white/5 text-[10px] sm:text-[11px] text-neutral-300"
            >
              {fmt}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
