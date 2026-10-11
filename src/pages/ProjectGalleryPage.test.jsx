import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../app/App.jsx';
import { projects } from '../data/projects.js';
import { siteConfig } from '../config/site.js';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Project gallery page', () => {
  it('shows every project at gallery size with an illustrative-image notice', () => {
    renderRoute('/projects');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Project gallery');
    expect(document.title).toBe(`Project gallery | ${siteConfig.title}`);
    expect(screen.getByRole('note')).toHaveTextContent('illustrative stock images');
    const section = screen.getByRole('region', { name: /Systems we design/ });
    expect(section).toHaveClass('past-work--gallery');
    const tiles = within(section).getAllByRole('link');
    expect(tiles).toHaveLength(projects.length);
    expect(tiles[0].querySelector('img')).toHaveAttribute(
      'alt',
      `Illustrative image: ${projects[0].title}`,
    );
  });

  it('filters the gallery by category like the homepage widget', async () => {
    const { container } = renderRoute('/projects');
    const filter = screen.getByRole('button', { name: 'BACKUP POWER' });
    fireEvent.click(filter);
    const expected = projects.filter((item) => item.category === 'BACKUP POWER').length;
    expect(container.querySelectorAll('.past-item--gallery')).toHaveLength(expected);
  });
});
