import React from 'react';
import { ArrowUpRight, Phone, Mail, MapPin, Clock, ArrowLeft, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-feexaro-navy text-white rounded-t-card pt-16 pb-12 px-4 sm:px-8 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Newsletter & Consultation Strip */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Підпишіться на сезонні знижки та поради
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-body">
              Надсилаємо купони на безкоштовну чистку бойлерів та чек-листи догляду за технікою
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Дякуємо! Ви підписані на спеціальні пропозиції.'); }} className="flex w-full lg:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Ваш e-mail..."
              className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm font-body focus:outline-none focus:border-feexaro-blue w-full sm:w-72"
            />
            <button
              type="submit"
              className="feexaro-btn feexaro-btn-primary bg-feexaro-blue hover:bg-feexaro-blue-hover shrink-0"
            >
              <span>Підписатися</span>
              <span className="feexaro-btn-icon-circle bg-feexaro-navy">
                <Send className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </form>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-4">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-feexaro-blue flex items-center justify-center text-white font-bold">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path d="M16 4 L4 14 L8 14 L8 26 L24 26 L24 14 L28 14 Z" fill="#ffffff" />
                  <circle cx="16" cy="18" r="3" fill="#041f39" />
                </svg>
              </div>
              <span className="text-2xl font-heading font-extrabold text-white tracking-tight">
                Feexaro<span className="text-feexaro-blue">.</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-body">
              Спеціалізований сервісний центр із ремонту пральних машин, холодильників No Frost, посудомийок та бойлерів. Чергові інженери у кожному районі Харкова.
            </p>

            <div className="pt-2 text-xs font-heading font-semibold text-feexaro-blue flex items-center gap-1.5">
              <span>Працюємо з 2009 року в Харкові</span>
            </div>
            <div className="pt-1">
              <a href="../fixora/" className="text-xs text-amber-300 hover:underline font-heading font-bold">
                → Відкрити прототип Fixora Харків
              </a>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Розділи сайту
            </h4>
            <ul className="space-y-2 text-xs font-heading text-slate-300">
              <li><a href="#hero" className="hover:text-feexaro-blue transition-colors">Головна</a></li>
              <li><a href="#services" className="hover:text-feexaro-blue transition-colors">Каталог послуг</a></li>
              <li><a href="#about" className="hover:text-feexaro-blue transition-colors">Про наш сервіс</a></li>
              <li><a href="#calculator" className="hover:text-feexaro-blue transition-colors">Калькулятор цін</a></li>
              <li><a href="#process" className="hover:text-feexaro-blue transition-colors">Як відбувається ремонт</a></li>
              <li><a href="#reviews" className="hover:text-feexaro-blue transition-colors">Відгуки клієнтів</a></li>
            </ul>
          </div>

          {/* Col 3: Working Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Графік роботи
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-body">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-feexaro-blue shrink-0" />
                <div>
                  <div className="font-heading font-bold text-white">Понеділок – П’ятниця:</div>
                  <div>08:00 – 21:00</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4 text-feexaro-blue shrink-0" />
                <div>
                  <div className="font-heading font-bold text-white">Субота – Неділя:</div>
                  <div>09:00 – 20:00</div>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-emerald-400 font-heading font-semibold">
                ● Чергові майстри чергують без вихідних
              </div>
            </div>
          </div>

          {/* Col 4: Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Контакти
            </h4>
            <div className="space-y-3 text-xs text-slate-300 font-body">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-feexaro-blue shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+380577502026" className="font-heading font-bold text-white hover:text-feexaro-blue transition-colors block">
                    +38 (057) 750-20-26
                  </a>
                  <a href="tel:+380508402026" className="text-slate-400 hover:text-white transition-colors block mt-0.5">
                    +38 (050) 840-20-26
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-feexaro-blue shrink-0" />
                <a href="mailto:service@feexaro-kharkiv.ua" className="hover:text-white transition-colors">
                  service@feexaro-kharkiv.ua
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-feexaro-blue shrink-0 mt-0.5" />
                <span>
                  м. Харків, вул. Сумська, 102 (виїзд майстрів у всі райони міста)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-body">
          <div>
            © {new Date().getFullYear()} Feexaro Сервіс Україна. Усі права захищено.
          </div>

          <div className="flex items-center gap-4 font-heading">
            <a href="../" className="text-feexaro-blue hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              arch1cat.site
            </a>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">Письмова гарантія на ремонт побутової техніки</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
