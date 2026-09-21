import { expect, test } from '@playwright/test';

// Third-party fonts/stock images must not determine whether local app tests pass.
test.beforeEach(async ({ page }) => {
  await page.route(
    /https:\/\/(fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com)\//,
    (route) => route.abort(),
  );
});

test('all main routes render without browser errors, including direct reloads', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const path of [
    '/',
    '/about',
    '/services',
    '/areas',
    '/projects',
    '/contact',
    '/blog',
    '/blog/0',
    '/services/0',
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('navigation, browser history, menu, and quote anchor work together', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Powering possibility');
  if (isMobile)
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Power your day');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Get a free quote' }).click();
  await expect(page).toHaveURL(/\/contact#quote$/);
  await expect(page.locator('#quote')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#quote')).toBeInViewport();
});

test('home layout stays within the viewport and How It Works has no background', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('#process')).toHaveCSS('background-image', 'none');
  await expect(page.locator('#process')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('.process-card')).toHaveCount(6);
  await expect(page.locator('.process-card').first()).toHaveCSS('color', 'rgb(251, 252, 248)');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test('project filtering and the FAQ work in the browser', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'RESIDENTIAL', exact: true }).click();
  await expect(page.locator('.past-item')).toHaveCount(3);
  await page.getByRole('button', { name: 'ALL', exact: true }).click();
  await expect(page.locator('.past-item')).toHaveCount(7);
  const question = page.getByRole('button', { name: 'Can solar power my whole home or business?' });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/Often, yes/)).toBeVisible();
});

test('quote form uses native validation and honest local-only confirmation', async ({ page }) => {
  await page.goto('/contact#quote');
  await page.getByRole('button', { name: 'Review my request' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Full name').fill('Test Customer');
  await page.getByLabel('Phone number').fill('08000000000');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Location', { exact: true }).fill('Lagos');
  await page.getByLabel('Interested in').selectOption({ label: 'Residential solar' });
  await page.getByLabel('Your power needs').fill('Lights and refrigerator');
  await page.getByRole('button', { name: 'Review my request' }).click();
  await expect(page.getByRole('status')).toContainText('has not been sent or saved');
});

test('unknown routes show recovery rather than silently rendering the homepage', async ({
  page,
}) => {
  await page.goto('/not-a-page');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('back on track');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Power your day');
});
