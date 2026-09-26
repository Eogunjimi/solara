import { Sun } from 'lucide-react';
import { siteConfig } from '../../config/site.js';

export default function Logo() {
  return (
    <>
      <span className="logomark">
        <Sun size={21} aria-hidden="true" />
      </span>
      <span>
        {siteConfig.name.toUpperCase()}
        <small>{siteConfig.tagline}</small>
      </span>
    </>
  );
}
