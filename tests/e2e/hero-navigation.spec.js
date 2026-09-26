import { expect, test } from '@playwright/test';
import { siteConfig } from '../../src/config/site.js';

/** Read a painted background as channels plus alpha, tolerating rgb()/rgba()/hex. */
async function readPaint(page, selector) {
  return page.locator(selector).evaluate((node) => {
    const probe = document.createElement('span');
    probe.style.color = getComputedStyle(node).backgroundColor;
    document.body.append(probe);
    const parsed = getComputedStyle(probe)
      .color.match(/[\d.]+/g)
      .map(Number);
    probe.remove();
    const [r, g, b, a = 1] = parsed;
    return {
      r,
      g,
      b,
      alpha: a,
      blur: getComputedStyle(node).backdropFilter,
    };
  });
}

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
  await expect(hero.getByText('Trusted by 200 Homes & Businesses')).toBeVisible();
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
  // The masthead paints the footer green, but slightly transparent so page
  // content blurs behind the bar as it scrolls. The banner itself stays clear.
  const bar = await readPaint(page, '.masthead');
  const footer = await readPaint(page, '.site-footer');
  expect([bar.r, bar.g, bar.b]).toEqual([footer.r, footer.g, footer.b]);
  expect(bar.alpha).toBeGreaterThan(0.7);
  expect(bar.alpha).toBeLessThan(1);
  expect(bar.blur).toContain('blur');
  expect(
    await page.locator('.site-header').evaluate((node) => getComputedStyle(node).backgroundColor),
  ).toBe('rgba(0, 0, 0, 0)');
  await expect(header.locator('.nav-links--right a')).toHaveCount(3);
  for (const width of [320, 390, 800, 1024, 1240, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const toggle = page.getByRole('button', { name: 'Open menu' });
    if (width < 1024) {
      await toggle.click();
      // The open panel covers photography, so it stays nearly opaque green.
      const panel = await readPaint(page, '.site-header nav');
      expect([panel.r, panel.g, panel.b]).toEqual([footer.r, footer.g, footer.b]);
      expect(panel.alpha).toBeGreaterThan(0.95);
    }
    for (const { label, to } of [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Service Areas', to: '/areas' },
      { label: 'Contact Us', to: '/contact' },
    ]) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', to);
    }
    await expect(nav.getByRole('link', { name: siteConfig.phone })).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
    const rects = await nav.locator('a:visible').evaluateAll((nodes) =>
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
    if (width < 1024) {
      await nav.getByRole('link', { name: 'Home', exact: true }).focus();
      await page.keyboard.press('Escape');
      await expect(nav).toBeHidden();
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    } else {
      const spacing = await header.evaluate((node) => {
        const logo = node.querySelector('.logo').getBoundingClientRect();
        const lastLeftLink = node
          .querySelector('.nav-links--left > .nav-dropdown:last-child')
          .getBoundingClientRect();
        const firstRightLink = node
          .querySelector('.nav-links--right a:first-child')
          .getBoundingClientRect();
        return { left: logo.left - lastLeftLink.right, right: firstRightLink.left - logo.right };
      });
      expect(spacing.left).toBeGreaterThanOrEqual(16);
      expect(spacing.right).toBeGreaterThanOrEqual(16);
      const center = await header
        .getByRole('link', { name: 'AFEEZTECHSOLAR home' })
        .evaluate((node) => {
          const rect = node.getBoundingClientRect();
          return (rect.left + rect.right) / 2;
        });
      expect(Math.abs(center - width / 2)).toBeLessThanOrEqual(1);
    }
  }
  // In a short landscape viewport the dropdown itself scrolls to its quote action.
  await page.setViewportSize({ width: 600, height: 400 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await nav.getByRole('link', { name: 'Free Site Inspection' }).click();
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

test('the navigation bar stays fitted, pinned, and clear of anchored content', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The pinned desktop bar is verified at desktop widths.');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const header = page.getByRole('banner');
  await expect(header).toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect(header).toBeInViewport();
  await expect
    .poll(() => header.evaluate((node) => Math.round(node.getBoundingClientRect().top)))
    .toBe(0);
  const fit = await header.evaluate((node) => ({
    scroll: node.scrollWidth,
    client: node.clientWidth,
    height: Math.round(node.getBoundingClientRect().height),
  }));
  expect(fit.scroll).toBeLessThanOrEqual(fit.client + 1);
  // The pinned bar is deliberately compact; this guards against it growing again.
  expect(fit.height).toBeLessThanOrEqual(60);
  // The CTA keeps a 44px touch target while the painted pill stays small and fitted.
  const cta = await header.locator('.nav-links .btn').evaluate((node) => {
    const box = node.getBoundingClientRect();
    const pill = getComputedStyle(node, '::before');
    return {
      height: Math.round(box.height),
      width: Math.round(box.width),
      right: Math.round(box.right),
      pillHeight: Number.parseFloat(pill.height),
      pillTop: Number.parseFloat(pill.inset.split(' ')[0]),
      pillRight: Math.round(box.right),
      pillBackground: pill.backgroundColor,
      pillBackdrop: pill.backdropFilter,
    };
  });
  expect(cta.height).toBeGreaterThanOrEqual(44);
  expect(cta.pillHeight).toBeLessThanOrEqual(34);
  // The pill is deliberately translucent, so the green bar shows through it.
  expect(cta.pillBackground).toMatch(/^rgba\(\d+, \d+, \d+, 0\.\d+\)$/);
  expect(cta.pillBackdrop).toContain('blur');
  expect(cta.pillTop * 2 + cta.pillHeight).toBeLessThanOrEqual(fit.height);
  expect(cta.right).toBeLessThanOrEqual(1440);
  expect(cta.width).toBeLessThanOrEqual(200);
  for (const [label, id] of [
    ['Services', 'services'],
    ['Service Areas', 'areas'],
    ['About Us', 'about'],
  ]) {
    const trigger = header.getByRole('button', { name: `Toggle ${label} menu` });
    await trigger.click();
    const panel = header.locator(`#nav-${id}`);
    await expect(panel).toBeVisible();
    const box = await panel.boundingBox();
    expect(box.x, label).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, label).toBeLessThanOrEqual(1440);
    expect(box.y, label).toBeGreaterThanOrEqual(fit.height);
    expect(box.y + box.height, label).toBeLessThanOrEqual(900);
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  }
  await page.goto('/contact#quote');
  await expect(page.locator('#quote')).toBeInViewport();
  const gap = await page
    .locator('#quote')
    .evaluate((node) =>
      Math.round(
        node.getBoundingClientRect().top -
          document.querySelector('.site-header').getBoundingClientRect().bottom,
      ),
    );
  expect(gap).toBeGreaterThanOrEqual(0);
});
