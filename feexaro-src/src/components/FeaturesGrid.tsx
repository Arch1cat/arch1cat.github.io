import React from 'react';
import { Award, ThumbsUp, Zap, Clock4, ShieldCheck } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Сертифіковані інженери',
      desc: 'Кожен майстер пройшов офіційну сертифікацію заводів-виробників (Bosch, Samsung, LG, Electrolux) і має практичний досвід від 7 років.',
    },
    {
      icon: ThumbsUp,
      title: 'Бездоганна репутація',
      desc: 'Понад 14 000 успішно відремонтованих приладів по всій Україні та середня оцінка 4.9 у Google Maps на основі реальних відгуків.',
    },
    {
      icon: Zap,
      title: 'Виїзд майстра за 45 хв',
      desc: 'Мобільні сервісні екіпажі чергують у кожному районі вашого міста. Майстер прибуває з повним набором діагностики та запчастин.',
    },
    {
      icon: ShieldCheck,
      title: 'Чесна фіксована ціна',
      desc: 'Озвучуємо точну вартість ремонту після діагностики ДО початку робіт. Жодних непередбачених витрат чи доплат після здачі техніки.',
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-card bg-feexaro-surface-light border border-feexaro-border/50 hover:border-feexaro-blue/40 hover:shadow-feexaro transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-feexaro-border/60 flex items-center justify-center text-feexaro-navy group-hover:bg-feexaro-navy group-hover:text-white transition-colors duration-300 shadow-sm mb-5">
                  <Icon className="w-6 h-6 text-feexaro-blue group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-lg font-heading font-bold text-feexaro-navy mb-2 group-hover:text-feexaro-blue transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-feexaro-gray leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-feexaro-border/30 flex items-center gap-1.5 text-[11px] font-heading font-bold text-feexaro-navy uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Гарантія якості</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
