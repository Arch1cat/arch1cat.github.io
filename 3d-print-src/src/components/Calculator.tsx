import React, { useState } from 'react';
import { Calculator as CalcIcon, Send, Sparkles, Clock, Weight, DollarSign, Layers } from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  pricePerGram: number; // in UAH
  speedFactor: number;
  category: string;
}

const MATERIALS: MaterialOption[] = [
  { id: 'petg', name: 'PETG Промышленный', pricePerGram: 3.5, speedFactor: 1.0, category: 'Базовый' },
  { id: 'pla', name: 'PLA Tough / Silk', pricePerGram: 3.0, speedFactor: 0.9, category: 'Прототип' },
  { id: 'pacf', name: 'Carbon Fiber PA-12 (Нейлон+Уголь)', pricePerGram: 9.5, speedFactor: 1.4, category: 'Конструкционный' },
  { id: 'tpu', name: 'TPU 95A Эластомер', pricePerGram: 6.0, speedFactor: 1.6, category: 'Гибкий' },
  { id: 'resin', name: 'Tough UV Resin (Фотополимер)', pricePerGram: 8.5, speedFactor: 1.2, category: 'Высокоточный' },
  { id: 'peek', name: 'PEEK Аэрокосмический', pricePerGram: 45.0, speedFactor: 2.2, category: 'Экстремальный' },
];

export const Calculator: React.FC = () => {
  const [material, setMaterial] = useState<string>('pacf');
  const [weight, setWeight] = useState<number>(85);
  const [infill, setInfill] = useState<number>(40);
  const [layerHeight, setLayerHeight] = useState<string>('0.12');
  const [quantity, setQuantity] = useState<number>(1);

  const selectedMat = MATERIALS.find((m) => m.id === material) || MATERIALS[0];

  // Price calculations
  const baseCostPerGram = selectedMat.pricePerGram;
  const qualityFactor = layerHeight === '0.05' ? 1.4 : layerHeight === '0.12' ? 1.15 : 1.0;
  const infillFactor = 0.6 + (infill / 100) * 0.4;
  
  const estimatedGrams = Math.round(weight * infillFactor);
  const singlePriceUah = Math.max(150, Math.round(estimatedGrams * baseCostPerGram * qualityFactor));
  const totalPriceUah = singlePriceUah * quantity;
  const totalPriceUsd = Math.round(totalPriceUah / 41.5);

  const estimatedHours = Math.max(
    1,
    Math.round((estimatedGrams / 25) * selectedMat.speedFactor * (layerHeight === '0.05' ? 2.2 : 1.2))
  );

  const telegramOrderText = encodeURIComponent(
    `Здравствуйте! Хочу заказать 3D-печать:\n- Материал: ${selectedMat.name}\n- Расчетный вес: ~${estimatedGrams} г (шт: ${quantity})\n- Заполнение: ${infill}%\n- Слой: ${layerHeight} мм\n- Оценка: ~${totalPriceUah} грн ($${totalPriceUsd})`
  );

  return (
    <section
      id="calculator"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto z-20 pointer-events-auto"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-10 rounded-3xl bg-dark-900/90 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle orange accent gradient on corner */}
        <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-hot-orange/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-850 border border-hot-orange/20 text-xs font-mono text-hot-orange mb-2 sm:mb-3">
              <CalcIcon className="w-3.5 h-3.5" />
              <span>ИНТЕРАКТИВНЫЙ ОЦЕНЩИК</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-sans text-white">
              Экспресс-калькулятор стоимости
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Рассчитайте предварительную стоимость и время производства вашей детали
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-mono text-neutral-500 uppercase block">Ориентир стоимости</span>
            <div className="text-2xl sm:text-4xl font-mono font-bold text-hot-glow">
              {totalPriceUah} <span className="text-base sm:text-lg font-normal text-neutral-400">₴</span>
              <span className="text-xs text-neutral-500 font-normal ml-2">(~${totalPriceUsd})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Controls Left Column */}
          <div className="space-y-6">
            
            {/* Material Selector */}
            <div>
              <label className="text-xs font-mono text-neutral-300 block mb-2 flex items-center justify-between">
                <span>1. Выберите полимер:</span>
                <span className="text-hot-orange text-[11px] font-semibold">{selectedMat.category}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`p-2.5 rounded-xl border text-left font-mono transition-all text-xs flex flex-col justify-between min-h-[58px] ${
                      material === m.id
                        ? 'bg-hot-orange/15 border-hot-orange text-white shadow-glow-hot'
                        : 'bg-dark-850/80 border-white/5 text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold leading-tight text-[11px] line-clamp-2">{m.name}</span>
                    <span className="text-[10px] text-neutral-500 mt-1">{m.pricePerGram} ₴/г</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Approximate Weight Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-neutral-300">2. Примерный вес детали:</span>
                <span className="text-hot-glow font-bold text-sm">{estimatedGrams} грамм</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-hot-orange"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-600 mt-1">
                <span>10 г (мелочь/крепеж)</span>
                <span>250 г (корпус)</span>
                <span>1000 г (секция)</span>
              </div>
            </div>

          </div>

          {/* Controls Right Column */}
          <div className="space-y-6">
            
            {/* Layer Height (Quality) */}
            <div>
              <label className="text-xs font-mono text-neutral-300 block mb-2">
                3. Толщина слоя (детализация поверхности):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: '0.05', label: '0.05 мм', desc: 'Ультра (SLA)' },
                  { val: '0.12', label: '0.12 мм', desc: 'Премиум' },
                  { val: '0.20', label: '0.20 мм', desc: 'Стандарт' },
                ].map((l) => (
                  <button
                    key={l.val}
                    onClick={() => setLayerHeight(l.val)}
                    className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      layerHeight === l.val
                        ? 'bg-hot-orange/20 border-hot-orange text-white'
                        : 'bg-dark-850/80 border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">{l.label}</div>
                    <div className="text-[10px] text-neutral-500">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Infill Density */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-neutral-300">4. Плотность заполнения (Infill):</span>
                <span className="text-white font-bold">{infill}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {[20, 40, 70, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setInfill(pct)}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      infill === pct
                        ? 'bg-hot-orange text-white border-hot-orange'
                        : 'bg-dark-850 border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {pct === 100 ? '100% (Solid)' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-neutral-300">5. Количество экземпляров:</span>
                <span className="text-white font-bold">{quantity} шт.</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-dark-850 border border-white/10 text-white font-bold hover:bg-dark-800 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center font-mono font-bold text-lg text-white py-1.5 rounded-xl bg-dark-800 border border-white/5">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-dark-850 border border-white/10 text-white font-bold hover:bg-dark-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Summary Telemetry Bar */}
        <div className="p-4 rounded-2xl bg-dark-950/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-hot-orange" />
              <span>Общий вес: <strong className="text-white">{estimatedGrams * quantity} г</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-hot-amber" />
              <span>Время печати: <strong className="text-white">~{estimatedHours * quantity} ч</strong></span>
            </div>
          </div>

          <a
            href={`https://t.me/arch1cat?text=${telegramOrderText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-hot-orange to-hot-amber text-white font-mono text-xs font-bold tracking-wide flex items-center gap-2 shadow-glow-hot hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto justify-center text-center"
          >
            <Send className="w-4 h-4" />
            <span>Отправить расчёт в Telegram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
