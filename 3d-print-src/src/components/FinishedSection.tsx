import React from 'react';
import { CheckCircle2, ShieldAlert, Award, Wrench, Sparkles, Box, ArrowRight } from 'lucide-react';

export const FinishedSection: React.FC = () => {
  const materials = [
    {
      name: 'PA-CF (Нейлон + Углеволокно)',
      temp: 'до 180°C',
      feature: 'Прочность выше алюминия 6061 при весе в 2.5 раза меньше',
      badge: 'Аэрокосмос & Автоспорт',
    },
    {
      name: 'Tough Resin (Фотополимер)',
      temp: 'до 90°C',
      feature: 'Идеально гладкая поверхность без видимых слоев, точность 20 мкм',
      badge: 'Корпуса & Электроника',
    },
    {
      name: 'TPU 95A / 85A (Эластомер)',
      temp: 'до 100°C',
      feature: 'Гибкие демпферы, сальники, манжеты и ударопрочные втулки',
      badge: 'Виброизоляция',
    },
    {
      name: 'PEEK / PEKK (Суперпластик)',
      temp: 'до 260°C',
      feature: 'Экстремальная химстойкость к кислотам, маслам и пару под давлением',
      badge: 'Медицина & Нефтегаз',
    },
  ];

  return (
    <section
      id="finished"
      className="relative min-h-screen flex flex-col justify-center py-28 px-6 md:px-12 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      <div className="text-center md:max-w-3xl mx-auto mb-16">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850/80 border border-hot-orange/20 text-xs font-mono text-hot-orange mb-6">
          <Award className="w-3.5 h-3.5" />
          <span>03 / БЕСКОМПРОМИССНЫЙ РЕЗУЛЬТАТ</span>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight leading-tight mb-6">
          Готовый объект: <br />
          <span className="text-hot-glow font-mono">надежность и эталонная точность</span>
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
          Каждое изделие проходит пост-контроль геометрии электронным микрометром и термообработку 
          для снятия внутренних напряжений. Никаких компромиссов: деталь готова к реальной эксплуатации сразу после распаковки.
        </p>
      </div>

      {/* 3 Key Advantages Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] hover:border-hot-orange/40 transition-all backdrop-blur-md relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-dark-850 border border-white/10 flex items-center justify-center text-hot-orange mb-5 group-hover:scale-110 transition-transform shadow-glow-hot">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2">Микронная точность</h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            Повторяемость позиционирования до ±0.02 мм. Идеальное сопряжение резьбовых соединений, посадка подшипников скольжения и качения.
          </p>
          <div className="text-[11px] font-mono text-hot-orange flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Контроль допусков ISO
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] hover:border-hot-orange/40 transition-all backdrop-blur-md relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-dark-850 border border-white/10 flex items-center justify-center text-hot-orange mb-5 group-hover:scale-110 transition-transform shadow-glow-hot">
            <Box className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2">Инженерные материалы</h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            Более 15 сертифицированных промышленных филаментов и смол. Карбоновые композиты, огнестойкие полимеры V-0 и термостойкий PEEK.
          </p>
          <div className="text-[11px] font-mono text-hot-orange flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Паспорта качества партий
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] hover:border-hot-orange/40 transition-all backdrop-blur-md relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-dark-850 border border-white/10 flex items-center justify-center text-hot-orange mb-5 group-hover:scale-110 transition-transform shadow-glow-hot">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2">Штучные и серийные заказы</h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            Печатаем от 1 штучного прототипа до серийных партий в 2 000+ единиц. Вплавление латунных втулок, пескоструйная сатинация и покраска.
          </p>
          <div className="text-[11px] font-mono text-hot-orange flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Полный цикл пост-обработки
          </div>
        </div>

      </div>

      {/* Materials Matrix */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-900/60 border border-white/[0.08] backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold font-mono text-white">Каталог базовых инженерных материалов</h3>
            <p className="text-xs text-neutral-400">Подбираем оптимальный полимер под силовые, температурные и химические требования</p>
          </div>
          <span className="text-xs font-mono text-hot-orange px-3 py-1 rounded bg-hot-orange/10 border border-hot-orange/20 self-start sm:self-auto">
            100% ОРИГИНАЛЬНОЕ СЫРЬЕ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-dark-850/80 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-semibold text-white">{m.name}</h4>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                    {m.temp}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-3">{m.feature}</p>
              </div>
              <div className="text-[10px] font-mono text-hot-glow font-medium">
                Область: {m.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
