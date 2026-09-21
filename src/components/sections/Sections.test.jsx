import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ProjectsSection from './ProjectsSection.jsx';
import FaqSection from './FaqSection.jsx';
import ReviewsSection from './ReviewsSection.jsx';

function renderSection(section) {
  return render(<MemoryRouter>{section}</MemoryRouter>);
}

describe('interactive sections', () => {
  it('filters and restores projects', async () => {
    const user = userEvent.setup();
    renderSection(<ProjectsSection />);
    expect(screen.getAllByRole('img')).toHaveLength(7);
    await user.click(screen.getByRole('button', { name: 'RESIDENTIAL' }));
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'RESIDENTIAL' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'BACKUP POWER' }));
    expect(screen.getAllByRole('img')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'ALL' }));
    expect(screen.getAllByRole('img')).toHaveLength(7);
  });

  it('opens and closes FAQ answers', async () => {
    const user = userEvent.setup();
    renderSection(<FaqSection />);
    const first = screen.getByRole('button', { name: 'How much does a solar system cost?' });
    const second = screen.getByRole('button', {
      name: 'Can solar power my whole home or business?',
    });
    expect(first).toHaveAttribute('aria-expanded', 'true');
    await user.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Often, yes/)).toBeVisible();
    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/Often, yes/)).not.toBeInTheDocument();
  });

  it('cycles reviews in both directions and wraps around', async () => {
    const user = userEvent.setup();
    const { container } = renderSection(<ReviewsSection />);
    const featured = () => container.querySelector('.review-card.featured');
    expect(featured()).toHaveTextContent('Clear guidance from day one.');
    await user.click(screen.getByRole('button', { name: 'Previous review' }));
    expect(featured()).toHaveTextContent('A practical step forward.');
    await user.click(screen.getByRole('button', { name: 'Next review' }));
    expect(featured()).toHaveTextContent('Clear guidance from day one.');
  });

  it('advances reviews automatically and cleans up the interval', () => {
    vi.useFakeTimers();
    try {
      const { container, unmount } = renderSection(<ReviewsSection />);
      act(() => vi.advanceTimersByTime(4500));
      expect(container.querySelector('.review-card.featured')).toHaveTextContent(
        'Thoughtful work. Real support.',
      );
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});
