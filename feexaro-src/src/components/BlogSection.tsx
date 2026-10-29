import React from 'react';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';

interface Article {
  date: string;
  category: string;
  author: string;
  title: string;
  desc: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    date: '18 ЖОВТНЯ 2024',
    category: 'ПРАЛЬНІ МАШИНИ',
    author: 'Інженер Сергій',
    title: 'Як вберегти підшипники та хрестовину пральної машини від передчасного зносу',
    desc: 'Розбираємо вплив перевантаження білизною, жорсткої води та неправильного встановлення машини на довговічність вузлів.',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop',
  },
  {
    date: '12 ЖОВТНЯ 2024',
    category: 'ХОЛОДИЛЬНИКИ',
    author: 'Майстер Денис',
    title: 'Чому холодильник No Frost не морозить у верхній камері: 5 типових причин',
    desc: 'Огляд проблем із заслінкою повітропроводу, виходом з ладу ТЕНу відтайки та датчика температури випарника.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
  },
  {
    date: '05 ЖОВТНЯ 2024',
    category: 'ПОСУДОМИЙКИ',
    author: 'Інженер Роман',
    title: 'Помилка E15 в посудомийці Bosch / Siemens: що робити в перші хвилини',
    desc: 'Покроковий алгоритм дій при спрацьовуванні системи захисту Aquastop, зливі води та запобіганні затопленню кухні.',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=800&auto=format&fit=crop',
  },
];

export const BlogSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="feexaro-badge feexaro-badge-blue mb-4">
            <span>КОРИСНІ СТАТТІ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-feexaro-navy tracking-tight leading-tight">
            Поради наших інженерів <br />
            <span className="text-feexaro-blue">щодо догляду за технікою</span>
          </h2>
        </div>
        <p className="text-sm text-feexaro-gray max-w-md font-body">
          Дізнайтеся, як продовжити термін служби ваших домашніх приладів та уникнути дорогих ремонтів.
        </p>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((art, idx) => (
          <article
            key={idx}
            className="rounded-card bg-[#edf2f6] border border-feexaro-border/60 hover:border-feexaro-blue/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-feexaro group"
          >
            <div>
              {/* Article Image with Date badge */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-feexaro-navy text-white px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm">
                  {art.date}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] font-heading font-semibold text-feexaro-blue mb-2.5 uppercase tracking-wider">
                  <span>{art.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-feexaro-gray">{art.author}</span>
                </div>

                <h3 className="text-base sm:text-lg font-heading font-bold text-feexaro-navy mb-2 group-hover:text-feexaro-blue transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-feexaro-gray leading-relaxed font-body">
                  {art.desc}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy group-hover:text-feexaro-blue transition-colors"
              >
                <span>Читати статтю</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
};
