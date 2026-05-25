import HeroSection from '../components/sections/HeroSection';
import PremiumSlider from '../components/sections/PremiumSlider';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import BudgetCalculator from '../components/sections/BudgetCalculator';
import PortfolioSection from '../components/sections/PortfolioSection';
import PackagesSection from '../components/sections/PackagesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SocialFeeds from '../components/sections/SocialFeeds';
import CTASection from '../components/sections/CTASection';
import ContactSection from '../components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PremiumSlider />
      <AboutSection />
      <ServicesSection />
      <BudgetCalculator />
      <PortfolioSection />
      <PackagesSection />
      <TestimonialsSection />
      <SocialFeeds />
      <CTASection />
      <ContactSection />
    </>
  );
}

