import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Internal navigation styled as a button. Use a native button for actions. */
export default function ButtonLink({ children, outline = false, to = '/contact#quote', onClick }) {
  return (
    <Link to={to} onClick={onClick} className={`btn${outline ? ' btn-outline' : ''}`}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
