import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import WorkCarousel from './WorkCarousel.jsx';

const items = [
  { title: 'Solar installation', image: '/hero-solar.jpg' },
  { title: 'Rooftop panels', image: '/panels/mono.jpg' },
  { title: 'Panel technology', image: '/panels/bifacial.webp' },
];
function renderCarousel() {
  return render(
    <MemoryRouter initialEntries={['/services/0']}>
      <WorkCarousel items={items} ctaTo="#quote" ctaLabel="Discuss your project" />
    </MemoryRouter>,
  );
}

describe('work carousel', () => {
  it('cycles, wraps in both directions, and supports direct selection with focus preserved', async () => {
    const user = userEvent.setup();
    const { container } = renderCarousel();
    const first = () => container.querySelector('.work-slide');
    expect(first()).toHaveTextContent('Solar installation');
    await user.click(screen.getByRole('button', { name: 'Next work' }));
    expect(first()).toHaveTextContent('Rooftop panels');
    expect(screen.getByRole('button', { name: 'Next work' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Previous work' }));
    await user.click(screen.getByRole('button', { name: 'Previous work' }));
    expect(first()).toHaveTextContent('Panel technology');
    await user.click(screen.getByRole('button', { name: 'Next work' }));
    expect(first()).toHaveTextContent('Solar installation');
    await user.click(screen.getByRole('button', { name: 'Show: Rooftop panels' }));
    expect(first()).toHaveTextContent('Rooftop panels');
    expect(screen.getByRole('button', { name: 'Show: Rooftop panels' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(container.querySelector('[aria-live]')).toHaveTextContent('2 of 3');
    expect(screen.getByRole('link', { name: 'Discuss your project' })).toHaveAttribute(
      'href',
      '/services/0#quote',
    );
    expect(first()).toHaveAttribute('href', '/projects');
  });

  it('supports keyboard and directional swipes without hijacking links or vertical scrolling', async () => {
    const user = userEvent.setup();
    const { container } = renderCarousel();
    const gallery = screen.getByRole('group', { name: 'Project gallery' });
    const first = () => container.querySelector('.work-slide');
    gallery.focus();
    await user.keyboard('{ArrowRight}');
    expect(first()).toHaveTextContent('Rooftop panels');
    await user.keyboard('{ArrowLeft}');
    expect(first()).toHaveTextContent('Solar installation');
    first().focus();
    await user.keyboard('{ArrowRight}');
    expect(first()).toHaveTextContent('Solar installation');
    fireEvent.touchStart(gallery, { touches: [{ clientX: 280, clientY: 80 }] });
    fireEvent.touchEnd(gallery, { changedTouches: [{ clientX: 100, clientY: 82 }] });
    expect(first()).toHaveTextContent('Rooftop panels');
    fireEvent.touchStart(gallery, { touches: [{ clientX: 100, clientY: 80 }] });
    fireEvent.touchEnd(gallery, { changedTouches: [{ clientX: 110, clientY: 200 }] });
    expect(first()).toHaveTextContent('Rooftop panels');
    fireEvent.touchStart(gallery, { touches: [{ clientX: 100, clientY: 80 }] });
    fireEvent.touchCancel(gallery);
    fireEvent.touchEnd(gallery, { changedTouches: [{ clientX: 280, clientY: 82 }] });
    expect(first()).toHaveTextContent('Rooftop panels');
  });
});
