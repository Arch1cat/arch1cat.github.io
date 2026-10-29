import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  name: string;
  city: string;
  appliance: string;
  text: string;
  rating: number;
  date: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Оксана Мельничук',
    city: 'м. Харків (Салтівка, 602 мкр)',
    appliance: 'Пральна машина LG DirectDrive',
    text: 'Пралка раптово зупинилася з водою всередині якраз перед вихідними. Майстер Андрій приїхав уже за 40 хвилин після дзвінка! Швидко замінив помпу, почистив патрубок і показав стару деталь. Дуже приємно, що працював акуратно та в бахілах. Дякую за врятовані вихідні!',
    rating: 5,
    date: '3 дні тому',
  },
  {
    name: 'Тарас Гринишин',
    city: 'м. Харків (Олексіївка)',
    appliance: 'Двокамерний холодильник Samsung',
    text: 'Перестала морозити верхня камера, хоча морозилка працювала. Думав, доведеться купувати новий дорогий холодильник. Інженер Feexaro виявив несправність датчика відтайки No Frost, замінив за півтори години. Ціна повністю збіглася з прайсом, дали чек та талон на 12 місяців.',
    rating: 5,
    date: '1 тиждень тому',
  },
  {
    name: 'Валерій Коваленко',
    city: 'м. Харків (Холодна Гора)',
    appliance: 'Посудомийна машина Bosch',
    text: 'Вибивало помилку E15, вода не зливалася. Подзвонив о 9 ранку, о 10:15 техніка вже знову працювала. Чесно пояснили причину, без нав’язування зайвих послуг, вартість абсолютно адекватна. Тепер у разі будь-якої поломки побутової техніки — тільки сюди.',
    rating: 5,
    date: '2 тижні тому',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="feexaro-badge feexaro-badge-blue mb-4">
          <span>ВІДГУКИ КЛІЄНТІВ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
          Нам довіряють тисячі родин <br />
          <span className="text-feexaro-blue">у Харкові та області</span>
        </h2>
        <p className="text-sm text-feexaro-gray mt-4 font-body">
          Реальні відгуки від людей, чию побутову техніку ми повернули до ідеального робочого стану.
        </p>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-8 rounded-card bg-[#edf2f6] border border-feexaro-border/60 hover:border-feexaro-blue/40 transition-all duration-300 flex flex-col justify-between hover:shadow-feexaro relative"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-heading font-bold text-feexaro-navy ml-2">5.0</span>
              </div>

              {/* Review Quote text */}
              <p className="text-xs sm:text-sm text-feexaro-gray leading-relaxed font-body mb-6 italic">
                «{rev.text}»
              </p>
            </div>

            <div className="pt-4 border-t border-feexaro-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-feexaro-navy text-sm">
                    {rev.name}
                  </h4>
                  <div className="text-[11px] text-feexaro-gray font-body">
                    {rev.city}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-heading font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Підтверджено
                  </span>
                  <div className="text-[10px] text-feexaro-gray">{rev.date}</div>
                </div>
              </div>

              <div className="mt-2 text-[10px] font-heading font-semibold text-feexaro-blue bg-white/70 px-2.5 py-1 rounded-md inline-block">
                Обслуговування: {rev.appliance}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
