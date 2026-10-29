import React from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { FeaturesGrid } from './components/FeaturesGrid';
import { AboutSection } from './components/AboutSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { AppointmentBanner } from './components/AppointmentBanner';
import { PriceCalculator } from './components/PriceCalculator';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { BookingForm } from './components/BookingForm';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-feexaro-gray font-body flex flex-col selection:bg-feexaro-blue selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content Stream */}
      <main className="flex-1">
        <HeroSlider />
        <FeaturesGrid />
        <AboutSection />
        <MarqueeTicker />
        <ServicesSection />
        <ProcessSection />
        <AppointmentBanner />
        <PriceCalculator />
        <CaseStudies />
        <Testimonials />
        <BookingForm />
        <BlogSection />
      </main>

      {/* Deep Navy Feexaro Footer */}
      <Footer />
    </div>
  );
};
