import { useParams } from 'react-router-dom';
import { services } from '../data/services.js';
import PageHero from '../components/ui/PageHero.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === serviceId);
  if (!service) return <NotFoundPage />;
  return (
    <>
      <PageHero eyebrow="OUR SOLUTIONS" title={service.title} copy={service.description} />
      <QuoteSection />
    </>
  );
}
