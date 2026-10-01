import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BespokeAtelierBanner from '@/components/home/BespokeAtelierBanner';
import EverydayEditSection from '@/components/home/EverydayEditSection';
import BrandPhilosophySection from '@/components/home/BrandPhilosophySection';
import PressQuotesSection from '@/components/home/PressQuotesSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. New Arrivals (4 Product Cards) */}
      <NewArrivalsSection />

      {/* 3. Shop By Category (Women's Indian Couture & Handloom Sarees) */}
      <FeaturedCategories />

      {/* 4. Bespoke Custom Atelier Highlight */}
      <BespokeAtelierBanner />

      {/* 5. Featured Collection (The Everyday Edit) */}
      <EverydayEditSection />

      {/* 5. About the Boutique (Brand Philosophy) */}
      <BrandPhilosophySection />

      {/* 6. Editorial Press Quotes */}
      <PressQuotesSection />

      {/* 7. Newsletter Section ("Stay in the know.") */}
      <NewsletterSection />
    </div>
  );
}
