import React from 'react';
import { Star } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'РЕМОНТ ПРАЛЬНИХ МАШИН',
    'ОБСЛУГОВУВАННЯ ХОЛОДИЛЬНИКІВ',
    'РЕМОНТ ПОСУДОМИЙОК',
    'ВАРИЛЬНІ ПОВЕРХНІ ТА ДУХОВКИ',
    'ЧИСТКА ТА РЕМОНТ БОЙЛЕРІВ',
    'СЕРВІС КАВОМАШИН',
    'ЗАПРАВКА ФРЕОНОМ R600A',
    'ПРОШИВКА ЕЛЕКТРОННИХ ПЛАТ',
    'ЗАМІНА ПІДШИПНИКІВ ТА ПОМП',
  ];

  return (
    <div className="py-6 bg-feexaro-navy overflow-hidden whitespace-nowrap border-y border-white/10 select-none my-8">
      <div className="inline-flex items-center gap-8 animate-marquee">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-8 text-white font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase">
            <span>{item}</span>
            <Star className="w-4 h-4 fill-feexaro-blue text-feexaro-blue shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
