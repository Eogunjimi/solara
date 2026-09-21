import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import { articles } from '../data/articles.js';
import { services } from '../data/services.js';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('application routes', () => {
  it.each([
    ['/', /Power your day/],
    ['/about', /Powering possibility, thoughtfully/],
    ['/services', /The right system starts with listening/],
    ['/areas', /Solar for Lagos/],
    ['/projects', /Good energy, in the real world/],
    ['/contact', /Let’s talk about your power/],
    ['/blog', /Clear answers for/],
    ['/about/', /Powering possibility, thoughtfully/],
    ...articles.map((article) => [`/blog/${article.id}`, article.title]),
    ...services.map((service) => [`/services/${service.id}`, service.title]),
  ])('renders %s with one shared layout', (path, title) => {
    renderRoute(path);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' })).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  it.each(['/missing', '/blog/missing', '/services/missing'])(
    'renders a real not-found page at %s',
    (path) => {
      renderRoute(path);
      expect(screen.getByRole('heading', { level: 1, name: /back on track/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Back to home/ })).toHaveAttribute('href', '/');
    },
  );

  it('redirects the legacy quote URL to the contact form', () => {
    renderRoute('/quote');
    expect(screen.getByRole('form', { name: 'Solar quote request' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Let’s talk about your power',
    );
  });

  it('navigates using the shared header and closes the menu', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'About' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Powering possibility');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('keeps home section anchors unique', () => {
    const { container } = renderRoute('/');
    const ids = [...container.querySelectorAll('[id]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(container.querySelector('#process h2')).toHaveTextContent('Simple steps to');
  });
});
