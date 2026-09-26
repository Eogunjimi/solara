import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);
// jsdom does not implement layout or scrolling. Browser tests cover anchor behavior.
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

// jsdom has no IntersectionObserver. Browser tests cover the real behaviour.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverStub;

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
