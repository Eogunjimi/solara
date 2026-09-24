import { expect, test } from '@playwright/test';
import { serviceAreas } from '../../src/data/serviceAreas.js';
import { services } from '../../src/data/services.js';

test.beforeEach(async ({ page }) => {
  await page.route(
    /https:\/\/(fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com)\//,
    (route) => route.abort(),
  );
});

test('desktop has full navigation from 1024px, with keyboard, hover and click dropdowns', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  const about = nav.getByRole('button', { name: 'Toggle About Us menu' });
  await about.focus();
  await page.keyboard.press('ArrowDown');
  await expect(nav.getByRole('link', { name: 'Blog', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(about).toBeFocused();
  const serviceTrigger = nav.getByRole('button', { name: 'Toggle Services menu' });
  await serviceTrigger.click();
  await expect(nav.locator('#nav-services a')).toHaveCount(7);
  for (const service of services) {
    const link = nav.locator(`#nav-services a[href="/services/${service.id}"]`);
    await expect(link).toBeVisible();
  }
  await serviceTrigger.click();
  await expect(nav.locator('#nav-services')).toBeHidden();
  if (!isMobile) {
    await page.getByRole('heading', { level: 1 }).click();
    await nav.getByRole('link', { name: 'Services', exact: true }).hover();
    await expect(nav.locator('#nav-services')).toBeVisible();
    await page.getByRole('heading', { level: 1 }).click();
    await expect(nav.locator('#nav-services')).toBeHidden();
  }
  await nav.getByRole('button', { name: 'Toggle Service Areas menu' }).click();
  for (const area of serviceAreas)
    await expect(nav.getByRole('link', { name: area.name, exact: true })).toHaveAttribute(
      'href',
      `/areas/${area.slug}`,
    );
  await nav.getByRole('link', { name: 'Magodo Phase 2', exact: true }).click();
  await expect(page).toHaveURL('/areas/magodo-phase-2');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Magodo Phase 2');
  for (const width of [1024, 1100, 1240, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden();
    await expect(nav.getByRole('link', { name: 'Service Areas', exact: true })).toBeVisible();
    const layout = await page.locator('.site-header').evaluate((el) => {
      const logo = el.querySelector('.logo').getBoundingClientRect();
      const left = el.querySelector('.nav-links--left').getBoundingClientRect();
      const right = el.querySelector('.nav-links--right').getBoundingClientRect();
      return {
        center: (logo.left + logo.right) / 2,
        leftGap: logo.left - left.right,
        rightGap: right.left - logo.right,
        scroll: el.scrollWidth,
        width: el.clientWidth,
      };
    });
    expect(Math.abs(layout.center - width / 2)).toBeLessThan(1);
    expect(layout.leftGap).toBeGreaterThan(0);
    expect(layout.rightGap).toBeGreaterThan(0);
    expect(layout.scroll).toBeLessThanOrEqual(layout.width + 1);
  }
});

test('all ten area pages support direct loads, reloads, local inspection CTAs and responsive layouts', async ({
  page,
}) => {
  for (const area of serviceAreas) {
    await page.goto(`/areas/${area.slug}`);
    await expect(page).toHaveTitle(`${area.name} Solar & Electrical Services | Solara Energy`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      `Solar & electrical services in ${area.name}.`,
    );
    await expect(page.locator('.area-service-grid a')).toHaveCount(7);
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Free Site Inspection', exact: true })
      .click();
    await expect(page.locator('#quote')).toBeInViewport();
    await expect(page.getByLabel('Location', { exact: true })).toHaveValue(area.name);
    await page.reload();
    await expect(page.locator('#quote')).toBeInViewport();
    await expect(page.getByLabel('Location', { exact: true })).toHaveValue(area.name);
    const geometry = await page
      .locator('.area-page')
      .evaluate((el) => ({ width: el.clientWidth, scroll: el.scrollWidth }));
    expect(geometry.scroll).toBeLessThanOrEqual(geometry.width + 1);
  }
  await page.goto('/areas/unknown');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('back on track');
});

test('area directory and local enquiry reset work without claiming to send requests', async ({
  page,
}) => {
  await page.goto('/areas');
  await expect(page.locator('.area-card')).toHaveCount(10);
  await page.locator('.area-card[href="/areas/ikoyi"]').click();
  const form = page.getByRole('form', { name: 'Site inspection request in Ikoyi' });
  await form.getByLabel('Full name').fill('Test Customer');
  await form.getByLabel('Phone number').fill('08000000000');
  await form.getByLabel('Email address').fill('test@example.com');
  await form.getByLabel('Interested in').selectOption('Residential solar');
  await form
    .getByLabel('Your power needs', { exact: true })
    .fill('Please assess our roof and backup requirements.');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toContainText('not been sent or saved');
  await page
    .locator('.area-other-links')
    .getByRole('link', { name: 'Banana Island', exact: true })
    .click();
  await expect(page.getByLabel('Location', { exact: true })).toHaveValue('Banana Island');
  await expect(page.getByLabel('Full name')).toHaveValue('');
  await expect(page.getByRole('status')).toHaveCount(0);
  for (const width of [320, 600, 800, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const rects = await page
      .locator('.area-page section, .area-service-grid a, .area-focus li, .area-page input')
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            width: node.clientWidth,
            scroll: node.scrollWidth,
          };
        }),
      );
    for (const rect of rects) {
      expect(rect.left).toBeGreaterThanOrEqual(-1);
      expect(rect.right).toBeLessThanOrEqual(width + 1);
      expect(rect.scroll).toBeLessThanOrEqual(rect.width + 1);
    }
  }
});
