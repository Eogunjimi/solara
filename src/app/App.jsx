import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from '../components/layout/SiteLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import ContentPage from '../pages/ContentPage.jsx';
import AcademyPage from '../pages/AcademyPage.jsx';
import ArticlePage from '../pages/ArticlePage.jsx';
import ServiceDetailPage from '../pages/ServiceDetailPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import PolicyPage from '../pages/PolicyPage.jsx';

/** Router provider lives at the entry point so tests can use MemoryRouter. */
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<ContentPage type="about" />} />
        <Route path="services" element={<ContentPage type="services" />} />
        <Route path="services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="areas" element={<ContentPage type="areas" />} />
        <Route path="projects" element={<ContentPage type="projects" />} />
        <Route path="contact" element={<ContentPage type="contact" />} />
        <Route path="blog" element={<AcademyPage />} />
        <Route path="blog/:articleId" element={<ArticlePage />} />
        <Route path="privacy" element={<PolicyPage type="privacy" />} />
        <Route path="terms" element={<PolicyPage type="terms" />} />
        <Route path="quote" element={<Navigate to="/contact#quote" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
