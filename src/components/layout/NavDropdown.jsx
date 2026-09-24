import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/** A disclosure navigation list: real parent links, native tab order, no menu-role traps. */
export default function NavDropdown({
  id,
  label,
  to,
  items,
  expanded,
  onExpand,
  onClose,
  onNavigate,
}) {
  const hoverOpened = useRef(false);
  const trigger = useRef(null);
  const list = useRef(null);
  return (
    <div
      className="nav-dropdown"
      data-expanded={expanded}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1024px)').matches) {
          hoverOpened.current = !expanded;
          onExpand();
        }
      }}
      onPointerLeave={(event) => {
        hoverOpened.current = false;
        if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement))
          onClose();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && expanded) {
          event.stopPropagation();
          onClose();
          trigger.current?.focus();
        }
      }}
    >
      <div className="nav-dropdown-heading">
        <NavLink to={to} onClick={onNavigate}>
          {label}
        </NavLink>
        <button
          ref={trigger}
          type="button"
          aria-label={`Toggle ${label} menu`}
          aria-expanded={expanded}
          aria-controls={`nav-${id}`}
          onClick={(event) => {
            if (hoverOpened.current && event.detail > 0) onExpand();
            else if (expanded) onClose();
            else onExpand();
            hoverOpened.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              onExpand();
              requestAnimationFrame(() => list.current?.querySelector('a')?.focus());
            }
          }}
        >
          <ChevronDown size={13} aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={list}
        id={`nav-${id}`}
        className="nav-submenu"
        aria-label={`${label} links`}
        hidden={!expanded}
      >
        {items.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} onClick={onNavigate}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
