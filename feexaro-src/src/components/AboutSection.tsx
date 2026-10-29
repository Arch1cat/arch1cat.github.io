import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Wrench, Sparkles, Building2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Image with 15+ Years Floating Badge */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-card overflow-hidden border border-feexaro-border shadow-feexaro max-w-md mx-auto lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop"
              alt="Сервісний інженер Feexaro за роботою"
              className="w-full h-[420px] sm:h-[480px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-feexaro-navy/60 via-transparent to-transparent" />
          </div>

          {/* Feexaro Signature Floating Counter Badge (25+ / 15+ years) */}
          <div className="absolute -bottom-6 -left-2 sm:bottom-6 sm:-left-6 bg-feexaro-navy text-white p-6 sm:p-7 rounded-card shadow-2xl border border-white/10 max-w-[240px]">
            <div className="text-4xl sm:text-5xl font-heading font-black text-feexaro-blue leading-none mb-1">
              15+
            </div>
            <div className="text-sm font-heading font-bold text-white leading-tight">
              Років надійного сервісу в Харкові
            </div>
            <div className="text-[11px] text-slate-300 mt-2 font-body">
              Понад 32 000 відремонтованих приладів
            </div>
          </div>
        </div>

        {/* Right Column: Experience & Details */}
        <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
          
          <div className="feexaro-badge feexaro-badge-blue">
            <span>НАШ ДОСВІД ТА СТАНДАРТИ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
            Дбаємо про вашу техніку, <br />
            <span className="text-feexaro-blue">повертаючи затишок у харківський дім</span>
          </h2>

          <p className="text-sm sm:text-base text-feexaro-gray leading-relaxed font-body">
            З 2009 року сервісний центр <strong>Feexaro Харків</strong> спеціалізується на відновленні пральних машин,
            холодильників, бойлерів, посудомийок та кухонних приладів будь-якої складності. Чергові інженери у кожному районі
            Харкова приїжджають із повним набором запчастин та професійного діагностичного обладнання.
          </p>

          {/* Checklist of 4 advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-feexaro-surface/50 border border-feexaro-border/40">
              <CheckCircle2 className="w-5 h-5 text-feexaro-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-feexaro-navy">Власний склад деталей</h4>
                <p className="text-[11px] text-feexaro-gray mt-0.5">Постійно в наявності понад 8 000 запчастин заводів Bosch, Samsung, LG.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-feexaro-surface/50 border border-feexaro-border/40">
              <CheckCircle2 className="w-5 h-5 text-feexaro-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-feexaro-navy">Письмова гарантія</h4>
                <p className="text-[11px] text-feexaro-gray mt-0.5">Видаємо акт виконаних робіт із печаткою та гарантією до 1 року.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-feexaro-surface/50 border border-feexaro-border/40">
              <CheckCircle2 className="w-5 h-5 text-feexaro-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-feexaro-navy">Точна діагностика</h4>
                <p className="text-[11px] text-feexaro-gray mt-0.5">Використовуємо цифрові тестери та фірмові сервісні сканери помилок.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-feexaro-surface/50 border border-feexaro-border/40">
              <CheckCircle2 className="w-5 h-5 text-feexaro-blue shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-feexaro-navy">Охайність та культура</h4>
                <p className="text-[11px] text-feexaro-gray mt-0.5">Майстри працюють у фірмовій формі, бахілах і залишають чистоту.</p>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a href="#services" className="feexaro-btn feexaro-btn-primary">
              <span>ПЕРЕГЛЯНУТИ ПОСЛУГИ</span>
              <span className="feexaro-btn-icon-circle">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <div className="flex items-center gap-3 text-xs font-heading font-bold text-feexaro-navy px-4 py-2 border-l-2 border-feexaro-blue">
              <span>92% ремонтів завершуємо в день звернення без повторних візитів</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
