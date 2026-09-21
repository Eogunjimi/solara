import HeroSection from '../components/sections/HeroSection.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import ServicesSection from '../components/sections/ServicesSection.jsx';
import PanelTypesSection from '../components/sections/PanelTypesSection.jsx';
import StandardsSection from '../components/sections/StandardsSection.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import ProcessSection from '../components/sections/ProcessSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import AcademyPreview from '../features/academy/AcademyPreview.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ReviewsSection />
      <ServicesSection />
      <PanelTypesSection />
      <StandardsSection />
      <ProjectsSection />
      <ProcessSection />
      <FaqSection />
      <AcademyPreview />
      <QuoteSection />
    </>
  );
}
