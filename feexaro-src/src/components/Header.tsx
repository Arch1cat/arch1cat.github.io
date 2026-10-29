import React, { useState } from 'react';
import { Phone, ArrowUpRight, Menu, X, ArrowLeft, Wrench, Shield, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-feexaro-border/60 transition-all duration-300">
      
      {/* Top Utility Bar (Ukrainian localization perks: emergency service 24/7 & all cities) */}
      <div className="bg-feexaro-navy text-white text-[11px] font-heading font-medium tracking-wide py-1.5 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-feexaro-blue" />
              Прийом заявок: <strong>08:00 – 21:00 без вихідних</strong>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-feexaro-blue" />
              Офіційна письмова гарантія <strong>до 12 місяців</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Харків: Салтівка, Олексіївка, Павлове Поле, Холодна Гора, Центр</span>
            <a href="../" className="text-feexaro-blue hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              arch1cat.site
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Brand Logo (Feexaro Wrench-House Concept) */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-feexaro-navy flex items-center justify-center relative overflow-hidden group-hover:bg-feexaro-navy-dark transition-colors shadow-sm">
            {/* Feexaro House & Wrench Iconic SVG */}
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
              {/* House roof & wall */}
              <path d="M16 4 L4 14 L8 14 L8 26 L24 26 L24 14 L28 14 Z" fill="#ffffff" />
              {/* Electric blue wrench foundation */}
              <path d="M7 16 C7 13 11 11 14 14 L18 18 C20 20 20 23 18 25 C16 27 13 27 11 25 L7 21 Z" fill="#008cf0" opacity="0.9" />
              <circle cx="16" cy="18" r="2.5" fill="#041f39" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-heading font-extrabold text-feexaro-navy tracking-tight leading-none">
              Feexaro<span className="text-feexaro-blue">.</span>
            </span>
            <span className="text-[9px] font-heading font-semibold text-feexaro-gray tracking-wider uppercase mt-0.5">
              РемПобут Сервіс Харків
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-heading font-bold uppercase tracking-wider text-feexaro-navy">
          <a href="#hero" className="hover:text-feexaro-blue transition-colors">Головна</a>
          <a href="#services" className="hover:text-feexaro-blue transition-colors">Послуги</a>
          <a href="#about" className="hover:text-feexaro-blue transition-colors">Про нас</a>
          <a href="#calculator" className="hover:text-feexaro-blue transition-colors">Ціни</a>
          <a href="#process" className="hover:text-feexaro-blue transition-colors">Етапи</a>
          <a href="#reviews" className="hover:text-feexaro-blue transition-colors">Відгуки</a>
          <a href="#contact" className="hover:text-feexaro-blue transition-colors">Контакти</a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Phone Call link with avatar circle */}
          <a
            href="tel:+380577502026"
            className="flex items-center gap-2.5 text-feexaro-navy hover:text-feexaro-blue transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-feexaro-surface flex items-center justify-center text-feexaro-navy">
              <Phone className="w-4 h-4 text-feexaro-blue" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-heading font-semibold text-feexaro-gray uppercase leading-tight">Гаряча лінія Харків</span>
              <span className="text-xs sm:text-sm font-heading font-bold text-feexaro-navy">+38 (057) 750-20-26</span>
            </div>
          </a>

          {/* Authentic Feexaro Split Pill Button */}
          <a href="#booking" className="feexaro-btn feexaro-btn-outline">
            <span>Викликати майстра</span>
            <span className="feexaro-btn-outline-icon">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="tel:+380443345892"
            className="sm:hidden p-2 rounded-lg bg-feexaro-surface text-feexaro-blue"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-feexaro-surface text-feexaro-navy hover:text-feexaro-blue transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-feexaro-border px-4 py-6 shadow-xl space-y-4 font-heading text-sm font-bold uppercase tracking-wider">
          <div className="flex flex-col space-y-3">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Головна
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Послуги з ремонту
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Про компанію
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Калькулятор вартості
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Як ми працюємо
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue border-b border-gray-100"
            >
              Відгуки клієнтів
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-feexaro-navy hover:text-feexaro-blue"
            >
              Контакти
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <a
              href="tel:+380443345892"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-feexaro-surface text-feexaro-navy font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-feexaro-blue" />
              +38 (044) 334-58-92 (Цілодобово)
            </a>

            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-feexaro-navy text-white font-bold text-xs"
            >
              <span>Терміновий виклик майстра</span>
              <ArrowUpRight className="w-4 h-4 text-feexaro-blue" />
            </a>

            <a
              href="../"
              className="flex items-center justify-center gap-1.5 w-full py-2 text-xs text-feexaro-gray font-normal lowercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              повернутися на arch1cat.site
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
