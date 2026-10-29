import React from 'react';
import { ArrowUpRight, CheckCircle, Sparkles, Shield, Wrench } from 'lucide-react';

interface ServiceItem {
  number: string;
  category: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  commonFaults: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: '01 \\ 06',
    category: 'ПРАЛЬНІ МАШИНИ',
    title: 'Ремонт пральних та сушильних машин',
    desc: 'Заміна підшипників барабана, зливних помп, нагрівальних ТЕНів, відновлення силових модулів інвертора.',
    price: 'від 350 ₴',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Гримить при віджимі', 'Не зливає воду', 'Не гріє воду', 'Помилка плати'],
  },
  {
    number: '02 \\ 06',
    category: 'ХОЛОДИЛЬНИКИ',
    title: 'Ремонт холодильників та морозильників',
    desc: 'Усунення витоків у запіненій частині, заправка фреоном R600a, заміна інверторних компресорів, ремонт датчиків No Frost.',
    price: 'від 450 ₴',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Не морозить камера', 'Намерзає лід', 'Пищить дисплей', 'Працює без зупинки'],
  },
  {
    number: '03 \\ 06',
    category: 'ПОСУДОМИЙКИ',
    title: 'Ремонт посудомийних машин',
    desc: 'Ліквідація протікань системи Aquastop (E15), чистка імпелерів, заміна циркуляційного насоса та теплового блоку.',
    price: 'від 400 ₴',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Вода в піддоні', 'Не сушить посуд', 'Не розчиняє таблетку', 'Помилка зливу'],
  },
  {
    number: '04 \\ 06',
    category: 'ВАРИЛЬНІ ПАНЕЛІ',
    title: 'Ремонт духових шаф та варильних поверхонь',
    desc: 'Відновлення сенсорних панелей керування, заміна індукційних конфорок, термостатів, петель та термостійкого скла.',
    price: 'від 380 ₴',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Не гріє конфорка', 'Вибиває автомат', 'Блимає помилка', 'Не працює сенсор'],
  },
  {
    number: '05 \\ 06',
    category: 'ВОДОНАГРІВАЧІ',
    title: 'Чистка та ремонт бойлерів',
    desc: 'Промивання бака від накипу, заміна магнієвого анода, «сухих» та «мокрих» ТЕНів, запобіжних клапанів тиску.',
    price: 'від 300 ₴',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Капає з-під кришки', 'Б’є струмом', 'Повільно гріє', 'Запах тухлої води'],
  },
  {
    number: '06 \\ 06',
    category: 'КАВОМАШИНИ',
    title: 'Сервісне обслуговування кавомашин',
    desc: 'Глибока декальцинація, заміна ущільнювачів, перебирання заварювального вузла, налаштування помолу (DeLonghi, Jura, Saeco).',
    price: 'від 350 ₴',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop',
    commonFaults: ['Не меле зерна', 'Не тече кава', 'Вода в піддоні', 'Помилка заварника'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="feexaro-badge feexaro-badge-blue mb-4">
            <span>НАШІ ПОСЛУГИ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
            Ремонтуємо будь-яку побутову техніку <br />
            <span className="text-feexaro-blue">швидко, надійно та з гарантією</span>
          </h2>
        </div>
        <p className="text-sm text-feexaro-gray max-w-md font-body">
          Виїжджаємо додому з усім необхідним обладнанням. Використовуємо лише оригінальні модулі виробника.
        </p>
      </div>

      {/* Services Grid (Feexaro Card Style: rounded-card with soft background and image hover) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((srv, idx) => (
          <div
            key={idx}
            className="group rounded-card bg-[#edf2f6] border border-feexaro-border/60 hover:border-feexaro-blue/50 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-feexaro relative overflow-hidden"
          >
            {/* Top Indicator & Category Badge */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-feexaro-border/50 mb-5">
                <span className="font-heading font-extrabold text-xs text-feexaro-blue tracking-widest">
                  {srv.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[10px] font-heading font-bold text-feexaro-navy uppercase tracking-wider shadow-sm">
                  {srv.category}
                </span>
              </div>

              {/* Service Card Image Preview */}
              <div className="h-44 rounded-2xl overflow-hidden mb-5 relative">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-feexaro-navy text-white px-3 py-1 rounded-full text-xs font-heading font-bold shadow-md">
                  {srv.price}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-feexaro-navy mb-2.5 group-hover:text-feexaro-blue transition-colors">
                {srv.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-feexaro-gray leading-relaxed mb-4 font-body">
                {srv.desc}
              </p>

              {/* Common Faults Pills */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[11px] font-heading font-bold uppercase text-feexaro-navy block">
                  Типові несправності:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {srv.commonFaults.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/80 text-[11px] font-body text-feexaro-gray border border-feexaro-border/40"
                    >
                      • {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="pt-4 border-t border-feexaro-border/50 flex items-center justify-between">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy group-hover:text-feexaro-blue transition-colors"
              >
                <span>Викликати майстра</span>
                <div className="w-7 h-7 rounded-full bg-feexaro-navy text-white flex items-center justify-center group-hover:bg-feexaro-blue group-hover:rotate-45 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              <span className="text-[11px] font-heading font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> В наявності
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
