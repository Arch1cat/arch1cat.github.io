import React from 'react';
import { Send, Instagram, Mail, MessageSquare, ArrowUpRight, Sparkles, MapPin, Clock } from 'lucide-react';

export const ContactsSection: React.FC = () => {
  return (
    <section
      id="contacts"
      className="relative min-h-[90vh] flex flex-col justify-center py-28 px-6 md:px-12 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850/80 border border-hot-orange/20 text-xs font-mono text-hot-orange mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>04 / СВЯЗЬ И ЗАКАЗ</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-white tracking-tight leading-tight mb-6">
          Воплотите ваш проект <br />
          <span className="text-hot-glow font-mono">в физический объект</span>
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
          Отправьте ваш STL, STEP или чертеж в Telegram для моментального слайсинга,
          проверки технологичности и точного коммерческого предложения за 15 минут.
        </p>
      </div>

      {/* Main 3 Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full mb-16">
        
        {/* Telegram Card (Primary Highlight) */}
        <a
          href="https://t.me/arch1cat"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-dark-900 via-dark-900 to-dark-850 border border-hot-orange/40 hover:border-hot-orange shadow-glow-hot transition-all group flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-hot-orange/15 blur-3xl pointer-events-none" />

          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-hot-orange/10 border border-hot-orange/30 flex items-center justify-center text-hot-orange mb-5 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="text-[11px] font-mono text-hot-orange uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-hot-orange animate-ping" /> Самый быстрый ответ (~10 мин)
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-mono text-white mb-2 flex items-center justify-between">
              <span>Telegram</span>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-hot-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Прикрепите 3D-модель (STL, STEP), укажите требования к прочности или температуре — посчитаем сразу.
            </p>
          </div>

          <div className="text-sm font-mono text-hot-glow font-semibold">
            @arch1cat
          </div>
        </a>

        {/* Instagram Card */}
        <a
          href="https://instagram.com/arch1cat.3d"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08] hover:border-white/20 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-center text-neutral-300 mb-5 group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-pink-500" />
            </div>

            <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
              Портфолио & Бекстейдж
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-mono text-white mb-2 flex items-center justify-between">
              <span>Instagram</span>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Реальные тесты на излом, видео таймлапсов печати, макросъемка слоев и отзывы заказчиков.
            </p>
          </div>

          <div className="text-sm font-mono text-white font-semibold">
            @arch1cat.3d
          </div>
        </a>

        {/* Email Card */}
        <a
          href="mailto:3d@arch1cat.dev"
          className="p-5 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08] hover:border-white/20 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-center text-neutral-300 mb-5 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>

            <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
              Для юрлиц и договоров
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-mono text-white mb-2 flex items-center justify-between">
              <span>Email</span>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Работаем с безналичным расчетом, НДС, выставлением счетов и договорами конфиденциальности (NDA).
            </p>
          </div>

          <div className="text-sm font-mono text-white font-semibold">
            3d@arch1cat.dev
          </div>
        </a>

      </div>

      {/* Lab Location & Working Hours Footer Bar */}
      <div className="max-w-5xl mx-auto w-full p-4 rounded-2xl bg-dark-850/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-start sm:items-center gap-2">
          <Clock className="w-4 h-4 text-hot-orange shrink-0 mt-0.5 sm:mt-0" />
          <span className="break-words">Печать 24/7 без выходных • Экспресс-отправка</span>
        </div>
        <div className="flex items-start sm:items-center gap-2">
          <MapPin className="w-4 h-4 text-hot-amber shrink-0 mt-0.5 sm:mt-0" />
          <span className="break-words">Киев / Харьков / Вся Украина & EU доставка</span>
        </div>
      </div>
    </section>
  );
};
