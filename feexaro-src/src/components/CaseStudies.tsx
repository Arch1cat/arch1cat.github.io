import React from 'react';
import { ArrowUpRight, MapPin, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

interface CaseItem {
  category: string;
  title: string;
  location: string;
  problem: string;
  solution: string;
  time: string;
  price: string;
  image: string;
}

const CASES: CaseItem[] = [
  {
    category: 'ПРАЛЬНІ МАШИНИ',
    title: 'Заміна підшипникового вузла Bosch Serie 6',
    location: 'Харків, Салтівка (вул. Валентинівська)',
    problem: 'Сильний металевий гул та люфт барабана на віджимі 1200 об/хв.',
    solution: 'Встановлено комплект оригінальних підшипників SKF та термостійкий сальник із фірмовим вологовідштовхувальним мастилом.',
    time: '2 години',
    price: '1 850 ₴',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'ХОЛОДИЛЬНИКИ',
    title: 'Усунення витоку та заправка Samsung No Frost',
    location: 'Харків, Олексіївка (пр. Перемоги)',
    problem: 'Холодильна камера не тримає холод (+14°C), безперервна робота компресора.',
    solution: 'Опресовування системи, ліквідація мікровитоку в контурі, вакуумування та точна заправка газом R600a за вагами.',
    time: '1.5 години',
    price: '1 950 ₴',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'ПОСУДОМИЙКИ',
    title: 'Ліквідація помилки Aquastop у посудомийці Siemens',
    location: 'Харків, Центр (вул. Сумська)',
    problem: 'Помилка E15 на дисплеї, постійне гудіння дренажної помпи.',
    solution: 'Усунуто протікання склянки теплообмінника, замінено зношений сальник та відновлено датчик рівня в піддоні.',
    time: '1 година',
    price: '1 350 ₴',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'ВАРИЛЬНІ ПОВЕРХНІ',
    title: 'Відновлення інвертора варильної панелі Electrolux',
    location: 'Харків, Холодна Гора (Полтавський Шлях)',
    problem: 'Дві ліві конфорки перестали вмикатися після стрибка напруги в мережі.',
    solution: 'Компонентний ремонт плати індукції: заміна пари силових IGBT-транзисторів та діодного моста без купівлі дорогої нової плати.',
    time: '1.5 години',
    price: '1 600 ₴',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="feexaro-badge feexaro-badge-blue mb-4">
            <span>РЕАЛЬНІ КЕЙСИ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
            Приклади виконаних ремонтів <br />
            <span className="text-feexaro-blue">із фіксацією результату</span>
          </h2>
        </div>
        <p className="text-sm text-feexaro-gray max-w-md font-body">
          Щодня наші фахівці повертають до ладу понад 40 одиниць побутової техніки в різних куточках України.
        </p>
      </div>

      {/* Grid of 4 Detailed Case Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CASES.map((item, idx) => (
          <div
            key={idx}
            className="rounded-card bg-[#edf2f6] border border-feexaro-border/60 hover:border-feexaro-blue/40 overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-feexaro"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-feexaro-border/50 mb-4">
                <span className="px-3 py-1 rounded-full bg-white text-[10px] font-heading font-extrabold text-feexaro-blue uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>
                <span className="text-xs font-heading font-semibold text-feexaro-gray flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-feexaro-navy" />
                  {item.location}
                </span>
              </div>

              <h3 className="text-xl font-heading font-bold text-feexaro-navy mb-3">
                {item.title}
              </h3>

              <div className="space-y-2 mb-6 text-xs sm:text-sm font-body">
                <p className="text-rose-700 bg-rose-50 border border-rose-200/60 p-2.5 rounded-xl">
                  <strong>Проблема:</strong> {item.problem}
                </p>
                <p className="text-emerald-800 bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-xl">
                  <strong>Рішення:</strong> {item.solution}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-feexaro-border/50 flex flex-wrap items-center justify-between gap-3 text-xs font-heading">
              <div className="flex items-center gap-4 text-feexaro-gray">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-feexaro-blue" /> {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Гарантія 1 рік
                </span>
              </div>

              <div className="text-lg font-heading font-black text-feexaro-navy">
                {item.price}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
