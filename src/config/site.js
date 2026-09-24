// Placeholder business details: verify these before deploying publicly.
export const siteConfig = {
  name: 'Solara',
  title: 'Solara Energy',
  tagline: 'POWERING POSSIBILITY',
  description: 'Smart solar and battery systems for homes and businesses in Lagos.',
  phone: '+234 800 000 0000',
  phoneHref: 'tel:+2348000000000',
  email: 'hello@solara.ng',
  location: 'Lagos, Nigeria',
};

// Replace the placeholder number above with the live WhatsApp line before launch.
const whatsappDigits = siteConfig.phoneHref.replace(/\D/g, '');

export const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
  "Hi Solara, I'd like to ask about solar and electrical services.",
)}`;

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Areas', to: '/areas' },
  { label: 'Past Work', to: '/projects' },
  { label: 'Blog / Academy', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];
