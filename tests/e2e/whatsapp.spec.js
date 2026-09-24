import { expect, test } from '@playwright/test';
import { siteConfig } from '../../src/config/site.js';

test.beforeEach(async ({ page }) => {
  await page.route(
    /https:\/\/(fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com)\//,
    (route) => route.abort(),
  );
});

test('the WhatsApp shortcut is reachable on every page and steps aside for the footer', async ({
  page,
}) => {
  const fab = page.getByRole('link', { name: `Chat with ${siteConfig.name} on WhatsApp` });
  for (const path of ['/', '/areas/ikoyi', '/services/residential-solar', '/contact']) {
    await page.goto(path);
    await expect(fab).toBeVisible();
    await expect(fab).toHaveAttribute('target', '_blank');
    await expect(fab).toHaveAttribute('rel', 'noopener noreferrer');
    const base = `https://wa.me/${siteConfig.phoneHref.replace(/\D/g, '')}`;
    await expect(fab).toHaveAttribute('href', new RegExp(`^${base.replace(/\./g, '\\.')}\\?text=`));
    const href = await fab.getAttribute('href');
    expect(decodeURIComponent(href)).toBe(
      `${base}?text=Hi ${siteConfig.name}, I'd like to ask about solar and electrical services.`,
    );
    for (const width of [320, 390, 800, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 800 });
      const box = await fab.boundingBox();
      expect(box.x, `${path} @${width}`).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width, `${path} @${width}`).toBeLessThanOrEqual(width);
      expect(box.height, `${path} @${width}`).toBeGreaterThanOrEqual(48);
    }
  }
  // At the foot of the page the footer's own Back to top control must stay usable.
  await page.goto('/');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.locator('.footer-back-top').scrollIntoViewIfNeeded();
  await expect(fab).toBeHidden();
  const backToTop = page.getByRole('button', { name: /Back to top/ });
  const clickable = await backToTop.evaluate((node) => {
    const box = node.getBoundingClientRect();
    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
    return node.contains(hit);
  });
  expect(clickable).toBe(true);
  await backToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
  await expect(fab).toBeVisible();
});
