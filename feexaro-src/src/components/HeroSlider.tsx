import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface SlideData {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  btnText: string;
  btnLink: string;
  image: string;
  tag: string;
}

const SLIDES: SlideData[] = [
  {
    badge: 'НАДІЙНИЙ СЕРВІС ПОБУТОВОЇ ТЕХНІКИ У ХАРКОВІ',
    titleLine1: 'Професійний &',
    titleLine2: 'Швидкий Сервіс',
    desc: 'Терміновий виїзд майстра по Харкову за 45 хвилин: Салтівка, Олексіївка, Центр, Холодна Гора. Ремонт пральних машин, холодильників No Frost, бойлерів та плит вдома.',
    btnText: 'НАШІ ПОСЛУГИ',
    btnLink: '#services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
    tag: 'Майстри у кожному районі Харкова',
  },
  {
    badge: '100% ОРИГІНАЛЬНІ ЗАПЧАСТИНИ',
    titleLine1: 'Майстри з досвідом',
    titleLine2: 'понад 12 років',
    desc: 'Працюємо з провідними світовими брендами: Bosch, Samsung, LG, Whirlpool, Miele, Electrolux. Власний харківський склад оригінальних комплектуючих без націнок.',
    btnText: 'РОЗРАХУВАТИ ВАРТІСТЬ',
    btnLink: '#calculator',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    tag: 'Офіційна гарантія 12 місяців',
  },
  {
    badge: 'ВИЇЗД У ДЕНЬ ЗВЕРНЕННЯ ПО ХАРКОВУ',
    titleLine1: 'Діагностика 0 ₴',
    titleLine2: 'при ремонті техніки',
    desc: '92% несправностей усуваємо за один візит без вивезення техніки в майстерню. Офіційний договір та письмова гарантія на виконані роботи у Харкові.',
    btnText: 'ВИКЛИКАТИ МАЙСТРА',
    btnLink: '#booking',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    tag: 'Ремонт за 1 візит на дім',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section id="hero" className="px-4 sm:px-8 pt-4 pb-12 max-w-7xl mx-auto">
      {/* Feexaro Signature Rounded-25px Card Container */}
      <div className="relative rounded-card bg-[#edf2f6] border border-feexaro-border/40 overflow-hidden p-6 sm:p-12 lg:p-16 min-h-[580px] sm:min-h-[640px] flex flex-col justify-between shadow-feexaro">
        
        {/* Subtle background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#edf2f6] via-[#edf2f6]/95 to-[#edf2f6]/80 lg:to-transparent z-10 w-full lg:w-3/5 pointer-events-none" />

        {/* Background lifestyle image on right */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.titleLine1}
            className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-feexaro-navy/15 lg:bg-transparent" />
        </div>

        {/* Content Area (Left aligned, high visual hierarchy) */}
        <div className="relative z-20 max-w-2xl my-auto">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-feexaro-navy text-[11px] font-heading font-bold tracking-widest text-feexaro-navy uppercase bg-white/70 backdrop-blur-sm mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-feexaro-blue animate-pulse" />
            {slide.badge}
          </div>

          {/* Main H1 Title in Public Sans Bold */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-feexaro-navy tracking-tight leading-[1.08] mb-6">
            {slide.titleLine1} <br />
            <span className="text-feexaro-blue">{slide.titleLine2}</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-feexaro-gray leading-relaxed mb-8 max-w-xl font-body pr-6 sm:pr-0">
            {slide.desc}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-4">
            <a href={slide.btnLink} className="feexaro-btn feexaro-btn-primary">
              <span>{slide.btnText}</span>
              <span className="feexaro-btn-icon-circle">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href="#booking"
              className="px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-wider text-feexaro-navy border border-feexaro-navy/30 hover:border-feexaro-navy bg-white/60 hover:bg-white transition-all shadow-sm"
            >
              Терміновий виклик
            </a>
          </div>

          {/* Trust badges row under hero */}
          <div className="mt-8 pt-6 border-t border-feexaro-border/60 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-heading font-semibold text-feexaro-navy">
            <div className="flex items-center gap-1.5 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Безкоштовний виїзд</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-4 h-4 text-feexaro-blue shrink-0" />
              <span>Гарантія 12 місяців</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-feexaro-navy ml-1">4.9/5.0</span>
              <span className="text-feexaro-gray text-[11px] ml-0.5">(1,420+ відгуків)</span>
            </div>
          </div>

        </div>

        {/* Feexaro Vertical Slide Pagination Dots (Right Side Anchor) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-md px-2.5 py-4 rounded-full border border-feexaro-border/50 flex flex-col gap-3 shadow-md">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-feexaro-navy h-6'
                  : 'bg-slate-300 hover:bg-feexaro-blue'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
