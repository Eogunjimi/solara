import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { siteConfig, whatsappHref } from '../../config/site.js';
import WhatsAppButton from './WhatsAppButton.jsx';

describe('WhatsApp shortcut', () => {
  it('links to WhatsApp with a prefilled message and a described name', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: `Chat with ${siteConfig.name} on WhatsApp` });
    expect(link).toHaveAttribute('href', whatsappHref);
    expect(whatsappHref).toBe(
      `https://wa.me/${siteConfig.phoneHref.replace(/\D/g, '')}?text=${encodeURIComponent(
        "Hi Solara, I'd like to ask about solar and electrical services.",
      )}`,
    );
  });

  it('opens in a new tab without handing over the opener reference', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /WhatsApp/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Chat on WhatsApp')).toHaveAttribute('aria-hidden', 'true');
  });
});
