import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { navigation, siteConfig } from '../../config/site.js';
import ButtonLink from '../ui/ButtonLink.jsx';
import Logo from './Logo.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div>Solar made practical for Lagos homes & businesses.</div>
        <div className="toplinks">
          <a href={siteConfig.phoneHref}>
            <Phone size={14} aria-hidden="true" /> {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={14} aria-hidden="true" /> {siteConfig.email}
          </a>
        </div>
      </div>
      <header
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeMenu();
        }}
      >
        <Link className="logo" to="/" aria-label="Solara home" onClick={closeMenu}>
          <Logo />
        </Link>
        <button
          type="button"
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'open' : ''}>
          {navigation.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <ButtonLink to="/contact#quote" onClick={closeMenu}>
            Get a free quote
          </ButtonLink>
        </nav>
      </header>
    </>
  );
}
