import React from 'react';
import { ArrowUpRight, Phone, ShieldCheck, Clock, Percent } from 'lucide-react';

export const AppointmentBanner: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 py-12 max-w-7xl mx-auto">
      <div className="rounded-card bg-feexaro-navy text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Background glow and geometric decoration */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-feexaro-blue/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-feexaro-blue/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-heading font-bold uppercase tracking-wider text-feexaro-blue">
              <Percent className="w-3.5 h-3.5 text-feexaro-blue" />
              <span>АКЦІЯ ДНЯ: ЗНИЖКА -15% НА РОБОТУ МАЙСТРА</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-white">
              Потрібен терміновий ремонт сьогодні? <br />
              <span className="text-feexaro-blue">Майстер вже чергує у вашому районі</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-body leading-relaxed">
              Телефонуйте просто зараз або оформлюйте онлайн-виклик. Приїдемо за 45 хвилин із необхідними деталями, виконаємо ремонт за один візит та надамо гарантійний талон на 1 рік.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-heading font-semibold text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-feexaro-blue" /> Прибуття за 45 хвилин
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Гарантія 12 місяців
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a
              href="#booking"
              className="feexaro-btn feexaro-btn-primary bg-feexaro-blue hover:bg-feexaro-blue-hover text-center justify-between"
            >
              <span>ОФОРМИТИ ЗАЯВКУ</span>
              <span className="feexaro-btn-icon-circle bg-feexaro-navy">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </a>

            <a
              href="tel:+380443345892"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
            >
              <Phone className="w-4 h-4 text-feexaro-blue" />
              <span>+38 (044) 334-58-92</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
