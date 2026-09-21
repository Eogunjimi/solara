import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { faqs } from '../../data/faqs.js';
import FaqSection from './FaqSection.jsx';

describe('FAQ cards', () => {
  it('shows all six supplied questions, answers, and the quote call to action', () => {
    render(<FaqSection />, { wrapper: MemoryRouter });
    const section = screen.getByRole('region', { name: 'Frequently Asked Questions' });
    expect(within(section).getAllByRole('button')).toHaveLength(6);
    faqs.forEach(({ question, answer }, index) => {
      const trigger = within(section).getByRole('button', { name: question });
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
      expect(panel).toHaveTextContent(answer);
      expect(trigger).toHaveAttribute('aria-expanded', String(index === 0));
      if (index === 0) expect(panel).toBeVisible();
      else expect(panel).not.toBeVisible();
    });
    expect(within(section).getByText('GOOD TO KNOW')).toBeInTheDocument();
    expect(within(section).getByText('Still have questions?').tagName).toBe('STRONG');
    expect(within(section).getByText(faqs[5].answer).tagName).toBe('STRONG');
    expect(within(section).getByText(faqs[5].answer).parentElement).toHaveTextContent(
      faqs[5].answerIntro + faqs[5].answer,
    );
    expect(
      within(section).getByText(
        'Talk to our team and get professional advice based on your actual power needs.',
      ),
    ).toBeInTheDocument();
    expect(within(section).getByRole('link', { name: 'Get a Solar Quote' })).toHaveAttribute(
      'href',
      '/#quote',
    );
  });

  it('supports keyboard opening, switching, and collapsing without losing focus', async () => {
    const user = userEvent.setup();
    render(<FaqSection />, { wrapper: MemoryRouter });
    const first = screen.getByRole('button', { name: faqs[0].question });
    const second = screen.getByRole('button', { name: faqs[1].question });
    await user.tab();
    expect(first).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard(' ');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    await user.tab();
    expect(second).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(faqs[1].answer)).toBeVisible();
    await user.keyboard(' ');
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveFocus();
    expect(screen.getByText(faqs[1].answer)).not.toBeVisible();
  });
});
