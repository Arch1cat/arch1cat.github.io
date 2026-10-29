import React from 'react';
import { PhoneCall, Search, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: PhoneCall,
      title: 'Оформлення заявки',
      desc: 'Залиште заявку онлайн або зателефонуйте. Менеджер уточнить симптоми несправності, бренд техніки та направить найближчого майстра.',
    },
    {
      num: '02',
      icon: Search,
      title: 'Діагностика на місці',
      desc: 'Майстер приїжджає за 45 хвилин із діагностичним обладнанням, виявляє причину та озвучує точну фіксовану вартість до початку ремонту.',
    },
    {
      num: '03',
      icon: Wrench,
      title: 'Професійний ремонт',
      desc: '92% поломок усуваємо за 1–2 години прямо у вас вдома. Встановлюємо нові заводські вузли без вивезення техніки в майстерню.',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'Тестування та гарантія',
      desc: 'Запускаємо тестовий цикл, перевіряємо працездатність, прибираємо робочу зону та виписуємо офіційний гарантійний талон до 1 року.',
    },
  ];

  return (
    <section id="process" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="feexaro-badge feexaro-badge-blue mb-4">
          <span>ЯК МИ ПРАЦЮЄМО</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
          Простий та прозорий <br />
          <span className="text-feexaro-blue">4-кроковий процес ремонту</span>
        </h2>
        <p className="text-sm text-feexaro-gray mt-4 font-body">
          Жодних складнощів: швидкий виклик, зрозуміла вартість та надійний результат без стресу.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-card bg-[#edf2f6] border border-feexaro-border/60 hover:border-feexaro-blue/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Step number watermark */}
              <div className="text-5xl font-heading font-black text-feexaro-navy/10 absolute top-4 right-5 select-none group-hover:text-feexaro-blue/15 transition-colors">
                {st.num}
              </div>

              <div>
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-feexaro-border/70 flex items-center justify-center text-feexaro-navy group-hover:bg-feexaro-navy group-hover:text-white transition-all shadow-sm mb-6">
                  <Icon className="w-6 h-6 text-feexaro-blue group-hover:text-white transition-colors" />
                </div>

                <div className="text-xs font-heading font-extrabold text-feexaro-blue uppercase tracking-widest mb-1.5">
                  КРОК {st.num}
                </div>

                <h3 className="text-lg font-heading font-bold text-feexaro-navy mb-3 group-hover:text-feexaro-blue transition-colors">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-feexaro-gray leading-relaxed font-body">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-feexaro-border/40 flex items-center gap-1.5 text-[11px] font-heading font-bold text-emerald-600">
                <span>0 ₴ виїзд при ремонті</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
