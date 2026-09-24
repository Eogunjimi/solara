import { Outlet, useLocation } from 'react-router-dom';
import RouteEffects from '../../app/RouteEffects.jsx';
import WhatsAppButton from '../ui/WhatsAppButton.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header key={pathname} />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
