import { expect, test } from '@playwright/test';
import { navigation, siteConfig } from '../../src/config/site.js';

test.beforeEach(async ({ page }) => {
  await page.route(
    /https:\/\/(fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com)\//,
    (route) => route.abort(),
  );
});

test('centered hero retains its copy and actions, with no overflowing content at any breakpoint', async ({
  page,
}) => {
  await page.goto('/');
  const hero = page.locator('.hero');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(
    'Reliable solar energy for homes & businesses that want more control.',
  );
  await expect(hero.locator('.hero-content > p')).toHaveText(
    'Smart solar and battery systems for homes and businesses in Lagos—designed around how you actually use power.',
  );
  await expect(hero.getByText('Thoughtful system design')).toBeVisible();
  await expect(hero.getByText('Professional installation')).toBeVisible();
  await expect(hero.getByRole('img', { name: '5 stars' })).toBeVisible();
  await expect(hero.getByText('Trusted by 200 Contractors Nationwide')).toBeVisible();
  await expect(hero.locator('.hero-background-image')).toBeVisible();
  for (const width of [320, 390, 600, 800, 1000, 1024, 1240, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const boxes = await page
      .locator(
        '.masthead, .site-header, .hero-content, .hero h1, .hero-content > p, .hero-actions .btn, .hero-proof, .hero-social-proof',
      )
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            name: node.className,
            left: rect.left,
            right: rect.right,
            width: node.clientWidth,
            scroll: node.scrollWidth,
          };
        }),
      );
    for (const box of boxes) {
      expect(box.left, `${width}px ${box.name}`).toBeGreaterThanOrEqual(-1);
      expect(box.right, `${width}px ${box.name}`).toBeLessThanOrEqual(width + 1);
      expect(box.scroll, `${width}px ${box.name}`).toBeLessThanOrEqual(box.width + 1);
    }
    const center = await hero.locator('h1').evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    });
    expect(Math.abs(center - width / 2)).toBeLessThanOrEqual(1);
    await expect(hero.getByRole('heading', { level: 1 })).toHaveCSS('animation-name', 'none');
  }
  await hero.getByRole('link', { name: 'Explore solutions' }).click();
  await expect(page.locator('#services')).toBeInViewport();
  await hero.getByRole('link', { name: 'Get my free quote' }).click();
  await expect(page.locator('#quote')).toBeInViewport();
});

test('centered desktop navigation and mobile menu keep all destinations and keyboard controls', async ({
  page,
}) => {
  await page.goto('/');
  const header = page.getByRole('banner');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const width of [320, 390, 800, 1024, 1240, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const toggle = page.getByRole('button', { name: 'Open menu' });
    if (width <= 1240) await toggle.click();
    for (const { label, to } of navigation) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', to);
    }
    await expect(nav.getByRole('link', { name: siteConfig.phone })).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
    const rects = await nav.locator('a').evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { left: rect.left, right: rect.right, height: rect.height };
      }),
    );
    for (const rect of rects) {
      expect(rect.left).toBeGreaterThanOrEqual(0);
      expect(rect.right).toBeLessThanOrEqual(width);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
    if (width <= 1240) {
      await nav.getByRole('link', { name: 'Home', exact: true }).focus();
      await page.keyboard.press('Escape');
      await expect(nav).toBeHidden();
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    } else {
      const center = await header.getByRole('link', { name: 'Solara home' }).evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return (rect.left + rect.right) / 2;
      });
      expect(Math.abs(center - width / 2)).toBeLessThanOrEqual(1);
    }
  }
  // In a short landscape viewport the dropdown itself scrolls to its quote action.
  await page.setViewportSize({ width: 600, height: 400 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await nav.getByRole('link', { name: 'Get a free quote' }).click();
  await expect(page).toHaveURL('/contact#quote');
  await expect(page.locator('#quote')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('rooftop background animates, can be paused, and respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const image = page.locator('.hero-background-image');
  await expect(image).toHaveCSS('animation-name', 'hero-background-drift');
  await expect(image).toHaveCSS('animation-play-state', 'running');
  await expect
    .poll(() =>
      image.evaluate(async (node) => {
        const asset = new Image();
        asset.src = getComputedStyle(node).backgroundImage.slice(5, -2);
        await asset.decode();
        return asset.naturalWidth > 0;
      }),
    )
    .toBe(true);
  const before = await image.evaluate((node) => getComputedStyle(node).transform);
  await expect
    .poll(() => image.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(before);
  await page.getByRole('button', { name: 'Pause background animation' }).click();
  await expect(image).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Play background animation' }).press('Enter');
  await expect(image).toHaveCSS('animation-play-state', 'running');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() => image.evaluate((node) => getComputedStyle(node).backgroundImage))
    .toContain('hero-rooftop-installers-mobile.webp');
  await expect
    .poll(() =>
      image.evaluate(async (node) => {
        const asset = new Image();
        asset.src = getComputedStyle(node).backgroundImage.slice(5, -2);
        await asset.decode();
        return asset.naturalWidth > 0;
      }),
    )
    .toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(image).toHaveCSS('animation-name', 'none');
  await expect(page.getByRole('button', { name: 'Pause background animation' })).toBeHidden();
  await expect(page.locator('.hero-showcase')).toHaveCount(0);
});
