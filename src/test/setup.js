import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);
// jsdom does not implement layout or scrolling. Browser tests cover anchor behavior.
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
