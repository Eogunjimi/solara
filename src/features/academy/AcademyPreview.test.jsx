import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { articles } from '../../data/articles.js';
import AcademyPreview from './AcademyPreview.jsx';

function renderPreview() {
  return render(
    <MemoryRouter>
      <AcademyPreview />
    </MemoryRouter>,
  );
}

function expectFirstArticle(index) {
  expect(screen.getAllByRole('heading', { level: 3 })[0]).toHaveTextContent(articles[index].title);
  expect(screen.getByRole('status')).toHaveTextContent(articles[index].title);
}

describe('academy carousel', () => {
  it('preserves all article content and links without pretending summaries are videos', () => {
    renderPreview();
    for (const article of articles) {
      expect(screen.getByRole('heading', { level: 3, name: article.title })).toBeInTheDocument();
      expect(screen.getByText(article.excerpt)).toBeInTheDocument();
      expect(screen.getByText(article.category)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: `Read article: ${article.title}` })).toHaveAttribute(
        'href',
        `/blog/${article.id}`,
      );
    }
    expect(screen.getByRole('link', { name: 'Visit the academy' })).toHaveAttribute(
      'href',
      '/blog',
    );
  });

  it('cycles both directions, wraps around, and allows direct selection', async () => {
    const user = userEvent.setup();
    renderPreview();
    expectFirstArticle(0);
    await user.click(screen.getByRole('button', { name: 'Next academy articles' }));
    expectFirstArticle(1);
    await user.click(screen.getByRole('button', { name: 'Previous academy articles' }));
    expectFirstArticle(0);
    await user.click(screen.getByRole('button', { name: 'Previous academy articles' }));
    expectFirstArticle(2);
    await user.click(screen.getByRole('button', { name: 'Next academy articles' }));
    expectFirstArticle(0);
    const dot = screen.getByRole('button', { name: `Start with: ${articles[2].title}` });
    await user.click(dot);
    expectFirstArticle(2);
    expect(dot).toHaveAttribute('aria-pressed', 'true');
  });

  it('supports arrow-key navigation without losing focus on the viewport', async () => {
    const user = userEvent.setup();
    renderPreview();
    const viewport = screen.getByRole('group', { name: /Academy articles/ });
    viewport.focus();
    await user.keyboard('{ArrowRight}');
    expectFirstArticle(1);
    expect(viewport).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expectFirstArticle(0);
  });

  it('handles horizontal swipes but ignores vertical page-scrolling gestures', () => {
    renderPreview();
    const viewport = screen.getByRole('group', { name: /Academy articles/ });
    fireEvent.touchStart(viewport, { touches: [{ clientX: 250, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 100, clientY: 110 }] });
    expectFirstArticle(1);
    fireEvent.touchStart(viewport, { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 110, clientY: 260 }] });
    expectFirstArticle(1);
    fireEvent.touchStart(viewport, { touches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 260, clientY: 110 }] });
    expectFirstArticle(0);
  });
});
