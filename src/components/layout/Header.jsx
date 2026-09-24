import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../../config/site.js';
import { services } from '../../data/services.js';
import { serviceAreas } from '../../data/serviceAreas.js';
import ButtonLink from '../ui/ButtonLink.jsx';
import Logo from './Logo.jsx';
import NavDropdown from './NavDropdown.jsx';

const groups = [
  { id: 'about', label: 'About Us', to: '/about', items: [{ label: 'Blog', to: '/blog' }] },
  {
    id: 'services',
    label: 'Services',
    to: '/services',
    items: services.map((service) => ({
      label: service.id === '3' ? 'Electronics Repairs' : service.title,
      to: `/services/${service.id}`,
    })),
  },
  {
    id: 'areas',
    label: 'Service Areas',
    to: '/areas',
    items: serviceAreas.map((area) => ({ label: area.name, to: `/areas/${area.slug}` })),
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const toggle = useRef(null);
  const header = useRef(null);
  const closeMenu = () => {
    setOpen(false);
    setExpanded(null);
  };

  useEffect(() => {
    const outside = (event) => {
      if (!header.current?.contains(event.target)) {
        setOpen(false);
        setExpanded(null);
      }
    };
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const resize = () => {
      setOpen(false);
      setExpanded(null);
    };
    document.addEventListener('pointerdown', outside);
    breakpoint.addEventListener('change', resize);
    return () => {
      document.removeEventListener('pointerdown', outside);
      breakpoint.removeEventListener('change', resize);
    };
  }, []);

  return (
    <div className="masthead">
      <div className="topbar">
        <div>Solar made practical for Lagos homes & businesses.</div>
        <a href={`mailto:${siteConfig.email}`}>
          <Mail size={13} aria-hidden="true" /> {siteConfig.email}
        </a>
      </div>
      <header
        ref={header}
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            closeMenu();
            toggle.current?.focus();
          }
        }}
      >
        <div className="nav-center">
          <Link className="logo" to="/" aria-label="AFEEZTECHSOLAR home" onClick={closeMenu}>
            <Logo />
          </Link>
        </div>
        <button
          ref={toggle}
          type="button"
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => {
            setOpen(!open);
            setExpanded(null);
          }}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'open' : ''}>
          <div className="nav-links nav-links--left">
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            {groups.map((group) => (
              <NavDropdown
                key={group.id}
                {...group}
                expanded={expanded === group.id}
                onExpand={() => setExpanded(group.id)}
                onClose={() => setExpanded((current) => (current === group.id ? null : current))}
                onNavigate={closeMenu}
              />
            ))}
          </div>
          <div className="nav-links nav-links--right">
            <NavLink to="/contact" onClick={closeMenu}>
              Contact Us
            </NavLink>
            <a className="nav-phone" href={siteConfig.phoneHref} onClick={closeMenu}>
              <Phone size={15} aria-hidden="true" /> {siteConfig.phone}
            </a>
            <ButtonLink to="/contact#quote" onClick={closeMenu}>
              Free Site Inspection
            </ButtonLink>
          </div>
        </nav>
      </header>
    </div>
  );
}
