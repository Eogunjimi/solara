export const siteConfig = {
  name: 'AFEEZTECHSOLAR',
  title: 'AFEEZTECHSOLAR',
  tagline: 'POWERING POSSIBILITY',
  description: 'Smart solar and battery systems for homes and businesses in Lagos.',
  phone: '+234 810 611 1178',
  phoneHref: 'tel:+2348106111178',
  email: 'engafeeztech@gmail.com',
  location: 'Lagos, Nigeria',
};

// The WhatsApp shortcut shares the business phone number above.
const whatsappDigits = siteConfig.phoneHref.replace(/\D/g, '');

export const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
  "Hi AFEEZTECHSOLAR, I'd like to ask about solar and electrical services.",
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
