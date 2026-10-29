import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Phone, ShieldCheck, Clock, Send, Sparkles } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [appliance, setAppliance] = useState('Пральна машина');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Салтівка (Харків)');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      <div className="rounded-card bg-feexaro-navy text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-feexaro-blue/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-feexaro-blue/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Offer & Trust */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-heading font-bold uppercase tracking-wider text-feexaro-blue">
              <Sparkles className="w-3.5 h-3.5 text-feexaro-blue" />
              <span>ОНЛАЙН ВИКЛИК МАЙСТРА</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              Замовте діагностику зі <br />
              <span className="text-feexaro-blue">знижкою -15% на роботу</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed max-w-lg">
              Залиште контакти — черговий диспетчер зателефонує протягом 3 хвилин, проконсультує за симптомами поломки та призначить виїзд майстра на зручний для вас час.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-heading font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Діагностика безкоштовна при подальшому ремонті</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-heading font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Офіційна письмова гарантія від 6 до 12 місяців</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-heading font-semibold text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Оплата лише після повної перевірки працездатності приладу</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 text-xs font-heading">
              <div className="w-10 h-10 rounded-full bg-feexaro-blue flex items-center justify-center text-white shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-400 uppercase text-[10px]">Термінова гаряча лінія</div>
                <div className="text-base font-bold text-white">+38 (044) 334-58-92</div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-6 bg-white text-feexaro-navy p-6 sm:p-10 rounded-card shadow-2xl border border-feexaro-border">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-feexaro-navy">
                  Заявку успішно прийнято!
                </h3>
                <p className="text-sm text-feexaro-gray font-body max-w-sm mx-auto">
                  Диспетчер зв’яжеться з вами за номером <strong>{phone}</strong> протягом 3-5 хвилин для підтвердження виклику.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-feexaro-navy text-white text-xs font-heading font-bold uppercase mt-4 hover:bg-feexaro-blue transition-colors"
                >
                  Оформити ще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left mb-6">
                  <h3 className="text-xl font-heading font-bold text-feexaro-navy">
                    Форма швидкого виклику майстра
                  </h3>
                  <p className="text-xs text-feexaro-gray mt-1">
                    Заповніть поля нижче — майстер вже готує деталі для вашого бренду
                  </p>
                </div>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy mb-1.5">
                    Вид несправної техніки *
                  </label>
                  <select
                    value={appliance}
                    onChange={(e) => setAppliance(e.target.value)}
                    className="w-full p-3 rounded-xl border border-feexaro-border bg-feexaro-surface/40 text-xs sm:text-sm font-body text-feexaro-navy focus:outline-none focus:border-feexaro-blue"
                  >
                    <option>Пральна або сушильна машина</option>
                    <option>Холодильник або морозильна камера</option>
                    <option>Посудомийна машина</option>
                    <option>Варильна панель / духова шафа</option>
                    <option>Бойлер / водонагрівач</option>
                    <option>Кавомашина</option>
                    <option>Інша побутова техніка</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy mb-1.5">
                      Ваше ім’я *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-feexaro-border bg-feexaro-surface/40 text-xs sm:text-sm font-body text-feexaro-navy focus:outline-none focus:border-feexaro-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy mb-1.5">
                      Номер телефону *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-feexaro-border bg-feexaro-surface/40 text-xs sm:text-sm font-body text-feexaro-navy focus:outline-none focus:border-feexaro-blue"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy mb-1.5">
                    Район Харкова / передмістя *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-xl border border-feexaro-border bg-feexaro-surface/40 text-xs sm:text-sm font-body text-feexaro-navy focus:outline-none focus:border-feexaro-blue"
                  >
                    <option>Салтівка (всі мікрорайони)</option>
                    <option>Олексіївка</option>
                    <option>Павлове Поле</option>
                    <option>Холодна Гора</option>
                    <option>Центр / Шевченківський</option>
                    <option>Нові Будинки</option>
                    <option>Київський район</option>
                    <option>Індустріальний (ХТЗ)</option>
                    <option>Передмістя (Пісочин, Дергачі, Покотилівка)</option>
                  </select>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy mb-1.5">
                    Короткий опис поломки (за бажанням)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Наприклад: не гріє воду, видає помилку E24..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-feexaro-border bg-feexaro-surface/40 text-xs sm:text-sm font-body text-feexaro-navy focus:outline-none focus:border-feexaro-blue"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-feexaro-navy hover:bg-feexaro-blue text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group mt-2"
                >
                  <span>ВИКЛИКАТИ МАЙСТРА ЗІ ЗНИЖКОЮ 15%</span>
                  <div className="w-6 h-6 rounded-full bg-feexaro-blue group-hover:bg-white text-white group-hover:text-feexaro-navy flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                <p className="text-[10px] text-feexaro-gray text-center pt-1 font-body">
                  Натискаючи кнопку, ви погоджуєтеся на обробку персональних даних. Конфіденційність гарантовано.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
