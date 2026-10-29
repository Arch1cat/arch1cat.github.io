import React, { useState } from 'react';
import { Calculator, Check, ArrowUpRight, ShieldCheck, Clock, Tag } from 'lucide-react';

interface ApplianceConfig {
  id: string;
  name: string;
  baseLabor: number;
  faults: { name: string; price: number; time: string }[];
}

const APPLIANCES: ApplianceConfig[] = [
  {
    id: 'washing',
    name: 'Пральна / сушильна машина',
    baseLabor: 350,
    faults: [
      { name: 'Не зливає воду (засмічення / помпа)', price: 450, time: '30-45 хв' },
      { name: 'Не гріє воду (заміна ТЕНу)', price: 550, time: '40 хв' },
      { name: 'Гримить / вібрує (заміна підшипників)', price: 1100, time: '2-3 години' },
      { name: 'Не крутить барабан (ремінь / щітки)', price: 480, time: '45 хв' },
      { name: 'Помилка плати керування (електроніка)', price: 750, time: '1-2 години' },
    ],
  },
  {
    id: 'fridge',
    name: 'Холодильник / морозильник',
    baseLabor: 450,
    faults: [
      { name: 'Не морозить (заправка фреоном R600a)', price: 650, time: '1 година' },
      { name: 'Намерзає шуба / лід (система No Frost)', price: 550, time: '1 година' },
      { name: 'Клацає і вимикається (пускове реле)', price: 400, time: '30 хв' },
      { name: 'Не вмикається компресор (заміна компресора)', price: 1600, time: '2 години' },
      { name: 'Пищить, блимає індикатор температури', price: 450, time: '45 хв' },
    ],
  },
  {
    id: 'dishwasher',
    name: 'Посудомийна машина',
    baseLabor: 400,
    faults: [
      { name: 'Помилка Aquastop / протікання в піддон', price: 450, time: '45 хв' },
      { name: 'Не гріє воду (ТЕН з теплообмінником)', price: 700, time: '1 година' },
      { name: 'Не змиває порошок / брудний посуд', price: 380, time: '30-45 хв' },
      { name: 'Гуде циркуляційний насос', price: 850, time: '1-2 години' },
    ],
  },
  {
    id: 'oven',
    name: 'Варильна поверхня / духова шафа',
    baseLabor: 380,
    faults: [
      { name: 'Не гріє індукційна конфорка', price: 550, time: '1 година' },
      { name: 'Вибиває автомат при включенні духовки', price: 480, time: '45 хв' },
      { name: 'Не працює сенсорна панель керування', price: 650, time: '1-2 години' },
      { name: 'Не тримає температуру (термостат)', price: 420, time: '40 хв' },
    ],
  },
  {
    id: 'boiler',
    name: 'Бойлер / водонагрівач',
    baseLabor: 300,
    faults: [
      { name: 'Чистка від накипу + заміна магнієвого анода', price: 450, time: '1 година' },
      { name: 'Капає вода з-під фланця / бака', price: 400, time: '45 хв' },
      { name: 'Не гріє воду (згорів ТЕН)', price: 500, time: '45 хв' },
      { name: 'Б’є струмом при дотику до води', price: 350, time: '30 хв' },
    ],
  },
];

export const PriceCalculator: React.FC = () => {
  const [selectedAppliance, setSelectedAppliance] = useState<string>('washing');
  const [selectedFaultIdx, setSelectedFaultIdx] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<string>('Bosch');

  const currentApp = APPLIANCES.find((a) => a.id === selectedAppliance) || APPLIANCES[0];
  const currentFault = currentApp.faults[selectedFaultIdx] || currentApp.faults[0];

  const estimatedTotal = currentApp.baseLabor + currentFault.price;

  const brands = ['Bosch', 'Samsung', 'LG', 'Whirlpool', 'Electrolux', 'Indesit', 'Gorenje', 'Beko', 'Miele', 'Ariston'];

  return (
    <section id="calculator" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      <div className="rounded-card bg-[#edf2f6] border border-feexaro-border/60 p-6 sm:p-10 lg:p-14 shadow-feexaro">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-feexaro-border/60">
          <div>
            <div className="feexaro-badge feexaro-badge-blue mb-4">
              <Calculator className="w-3.5 h-3.5" />
              <span>ОНЛАЙН РОЗРАХУНОК</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-feexaro-navy tracking-tight">
              Калькулятор вартості ремонту
            </h2>
            <p className="text-xs sm:text-sm text-feexaro-gray mt-2 font-body">
              Дізнайтеся орієнтовну вартість робіт та запчастин ще до приїзду майстра
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-feexaro-gray block">
              Орієнтовна вартість:
            </span>
            <div className="text-3xl sm:text-4xl font-heading font-black text-feexaro-blue">
              ~{estimatedTotal} <span className="text-xl font-bold text-feexaro-navy">₴</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-heading font-semibold">
              Діагностика: 0 ₴ при ремонті
            </span>
          </div>
        </div>

        {/* 3 Step Interactive Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Step 1: Choose Appliance */}
          <div className="lg:col-span-4 space-y-4">
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy block">
              1. Оберіть вид техніки:
            </label>
            <div className="flex flex-col gap-2">
              {APPLIANCES.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedAppliance(app.id);
                    setSelectedFaultIdx(0);
                  }}
                  className={`p-3.5 rounded-xl border text-left font-heading text-xs font-bold transition-all flex items-center justify-between ${
                    selectedAppliance === app.id
                      ? 'bg-feexaro-navy text-white border-feexaro-navy shadow-md'
                      : 'bg-white text-feexaro-navy border-feexaro-border/70 hover:border-feexaro-blue'
                  }`}
                >
                  <span>{app.name}</span>
                  {selectedAppliance === app.id && <Check className="w-4 h-4 text-feexaro-blue" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Problem */}
          <div className="lg:col-span-5 space-y-4">
            <label className="text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy block">
              2. Характер несправності:
            </label>
            <div className="flex flex-col gap-2">
              {currentApp.faults.map((fault, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFaultIdx(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-body ${
                    selectedFaultIdx === idx
                      ? 'bg-feexaro-blue text-white border-feexaro-blue shadow-md font-semibold'
                      : 'bg-white text-feexaro-navy border-feexaro-border/70 hover:border-feexaro-blue'
                  }`}
                >
                  <span className="pr-2">{fault.name}</span>
                  <span className={`text-[11px] font-heading font-bold shrink-0 ${selectedFaultIdx === idx ? 'text-white' : 'text-feexaro-blue'}`}>
                    +{fault.price} ₴
                  </span>
                </button>
              ))}
            </div>

            {/* Brand Pills */}
            <div className="pt-2">
              <span className="text-[11px] font-heading font-bold text-feexaro-navy uppercase block mb-2">
                Бренд техніки:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-heading font-semibold border transition-all ${
                      selectedBrand === b
                        ? 'bg-feexaro-navy text-white border-feexaro-navy'
                        : 'bg-white text-feexaro-gray border-feexaro-border/60 hover:text-feexaro-navy'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Breakdown Card & Action */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-2xl p-6 border border-feexaro-border shadow-sm">
            <div>
              <div className="text-xs font-heading font-extrabold text-feexaro-blue uppercase tracking-wider mb-2">
                ПІДСУМОК РОЗРАХУНКУ
              </div>

              <h4 className="text-base font-heading font-bold text-feexaro-navy mb-4">
                {selectedBrand} • {currentApp.name}
              </h4>

              <div className="space-y-3 py-3 border-y border-gray-100 text-xs font-body">
                <div className="flex justify-between">
                  <span className="text-feexaro-gray">Робота майстра:</span>
                  <strong className="text-feexaro-navy">{currentApp.baseLabor} ₴</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-feexaro-gray">Запчастини та усунення:</span>
                  <strong className="text-feexaro-navy">від {currentFault.price} ₴</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-feexaro-gray">Час ремонту:</span>
                  <strong className="text-feexaro-navy flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-feexaro-blue" />
                    {currentFault.time}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-feexaro-gray">Гарантія:</span>
                  <strong className="text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    12 місяців
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`#booking`}
                className="w-full py-3.5 rounded-full bg-feexaro-navy hover:bg-feexaro-blue text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md text-center"
              >
                <span>Зафіксувати ціну</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-[10px] text-feexaro-gray text-center block mt-2">
                Безкоштовна консультація інженера
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
