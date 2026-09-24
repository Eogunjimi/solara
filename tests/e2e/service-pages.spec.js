import { expect, test } from '@playwright/test';
import { siteConfig } from '../../src/config/site.js';
import { services } from '../../src/data/services.js';
import { serviceDetails } from '../../src/data/serviceDetails.js';
import { faqs } from '../../src/data/faqs.js';
import { serviceFaqCopy } from '../fixtures/serviceFaqCopy.js';

test.beforeEach(async ({ page }) => {
  await page.route(
    /https:\/\/(fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com)\//,
    (route) => route.abort(),
  );
});

for (const service of services) {
  test(`${service.title}: complete page, local actions, and responsive sections`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/services/${service.id}`);
    const detail = serviceDetails[service.id];
    const landing = page.locator('.service-detail');
    await expect(page).toHaveTitle(`${service.title} | ${siteConfig.title}`);
    await expect(landing.getByRole('heading', { level: 1 })).toHaveText(detail.heroTitle);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    await expect(landing.locator('.service-visual')).toHaveCount(0);
    await expect(landing.locator('.page-hero .hero-social-proof')).toContainText('5.0');
    await expect(landing.locator('.page-hero').getByRole('img', { name: '5 stars' })).toBeVisible();
    await expect(landing.locator('.page-hero + .trust-badges')).toHaveCount(1);
    await expect(landing.locator('#projects + #reviews')).toHaveCount(1);
    await expect(landing.locator('#projects').getByRole('heading')).toHaveText('See our work.');
    await expect(landing.locator('.standard-point')).toHaveCount(4);
    await expect(landing.locator('.process-step')).toHaveCount(4);
    await expect(landing.locator('.service-option')).toHaveCount(3);
    await expect(landing.locator('.faq-trigger')).toHaveText(faqs.map((item) => item.question));
    await expect(landing.getByRole('form')).toHaveCount(1);
    await expect(landing.getByLabel('Interested in')).toHaveValue(service.title);
    expect(
      await landing.evaluate((element) => {
        const ids = [...element.querySelectorAll('[id]')].map((node) => node.id);
        return ids.length === new Set(ids).size;
      }),
    ).toBe(true);

    await landing.locator('.page-hero').getByRole('link', { name: 'See what’s included' }).click();
    await expect(page).toHaveURL(`/services/${service.id}#standard`);
    await expect(landing.locator('#standard')).toBeInViewport();
    await landing
      .locator('.service-overview')
      .getByRole('link', { name: 'See how it works' })
      .click();
    await expect(landing.locator('#process')).toBeInViewport();
    await landing.locator('.service-option').first().getByRole('link').click();
    await expect(page).toHaveURL(`/services/${service.id}#quote`);
    await expect(landing.locator('#quote')).toBeInViewport();
    await page.reload();
    await expect(landing.locator('#quote')).toBeInViewport();
    await expect(landing.getByLabel('Interested in')).toHaveValue(service.title);

    const faq = landing.locator('#faq');
    const trigger = faq.getByRole('button', { name: faqs[1].question });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.getByText(faqs[1].answer)).toBeVisible();
    await page.keyboard.press('Space');
    await expect(faq.getByText(faqs[1].answer)).toBeHidden();
    await faq.getByRole('link', { name: 'Get a Solar Quote' }).click();
    await expect(landing.locator('#quote')).toBeInViewport();

    for (const width of [320, 390, 600, 800, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      // Check the actual page content and every reusable section, not overflow clipping.
      const geometry = await landing.evaluate((element) => {
        const nodes = [
          element,
          ...element.querySelectorAll(
            'section, .service-option, .standard-point, .process-card, .quote-form, input, select, textarea',
          ),
        ];
        return nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            width: node.clientWidth,
            scroll: node.scrollWidth,
            selector: node.className || node.tagName,
          };
        });
      });
      for (const box of geometry) {
        expect(box.left, box.selector).toBeGreaterThanOrEqual(-1);
        expect(box.right, box.selector).toBeLessThanOrEqual(width + 1);
        expect(box.scroll, box.selector).toBeLessThanOrEqual(box.width + 1);
      }
    }
    for (const image of await landing.locator('.past-item:visible img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0))
        .toBe(true);
    }
    await landing.locator('.past-item').first().click();
    await expect(page).toHaveURL('/projects');
    expect(errors).toEqual([]);
  });
}

test('service enquiry validation, confirmation, and related-service navigation work independently', async ({
  page,
}) => {
  await page.goto('/services/6#quote');
  const form = page.getByRole('form', { name: 'Service quote request' });
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toHaveCount(0);
  await expect(form.getByLabel('Full name')).toBeFocused();
  await form.getByLabel('Full name').fill('Service Customer');
  await form.getByLabel('Phone number').fill('08000000000');
  await form.getByLabel('Email address').fill('invalid-email');
  await form.getByLabel('Location').fill('Lagos');
  await form.getByLabel('Tell us what you need').fill('Review camera coverage for our shop');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toHaveCount(0);
  await expect(form.getByLabel('Email address')).toBeFocused();
  await form.getByLabel('Email address').fill('test@example.com');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toContainText('has not been sent or saved');
  await form.getByLabel('Location').fill('Lagos Island');
  await expect(form.getByRole('status')).toHaveCount(0);
  await page
    .locator('.service-related')
    .getByRole('link', { name: 'Residential Solar', exact: true })
    .click();
  await expect(page).toHaveURL('/services/0');
  await expect(page.getByLabel('Interested in')).toHaveValue('Residential Solar');
  await expect(page.getByLabel('Full name')).toHaveValue('');
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
});

test('work carousel supports controls, keyboard, swipe, responsive cards, and a local quote CTA', async ({
  page,
  isMobile,
}) => {
  await page.goto('/services/0');
  const work = page.locator('#projects');
  const first = work.locator('.work-slide').first();
  const gallery = work.getByRole('group', { name: 'Project gallery' });
  await expect(work.locator('.work-slide:visible')).toHaveCount(isMobile ? 1 : 2);
  await expect(first).toContainText('Explore solar installations');
  await work.getByRole('button', { name: 'Previous work' }).click();
  await expect(first).toContainText('Explore panel technology');
  await expect
    .poll(() => first.locator('img').evaluate((img) => img.complete && img.naturalWidth > 0))
    .toBe(true);
  await work.getByRole('button', { name: 'Next work' }).click();
  await expect(first).toContainText('Explore solar installations');
  await work.getByRole('button', { name: 'Show: Explore solar panel systems' }).click();
  await expect(first).toContainText('Explore solar panel systems');
  await expect(
    work.getByRole('button', { name: 'Show: Explore solar panel systems' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await gallery.focus();
  await page.keyboard.press('ArrowRight');
  await expect(first).toContainText('Explore panel technology');
  await gallery.dispatchEvent('touchstart', {
    touches: [{ identifier: 0, clientX: 280, clientY: 80 }],
  });
  await gallery.dispatchEvent('touchend', {
    changedTouches: [{ identifier: 0, clientX: 80, clientY: 85 }],
  });
  await expect(first).toContainText('Explore solar installations');
  await expect(work.locator('.work-track')).toHaveCSS('animation-name', 'none');
  for (const width of [320, 390, 600, 800, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(work.locator('.work-slide:visible')).toHaveCount(width <= 700 ? 1 : 2);
    const buttons = await work.locator('.work-controls button').evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: rect.width, height: rect.height };
      }),
    );
    for (const rect of buttons) {
      expect(rect.left).toBeGreaterThanOrEqual(0);
      expect(rect.right).toBeLessThanOrEqual(width);
      expect(rect.width).toBeGreaterThanOrEqual(44);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
  }
  await work.getByRole('link', { name: 'Discuss your project' }).click();
  await expect(page).toHaveURL('/services/0#quote');
  await expect(page.locator('#quote')).toBeInViewport();
  await expect(page.getByLabel('Interested in')).toHaveValue('Residential Solar');
  await work.getByRole('link', { name: 'Discuss your project' }).click();
  await expect(page.locator('#quote')).toBeInViewport();
});

test('services reuse homepage rating, animated trust badges, reviews, and FAQ styling', async ({
  page,
}) => {
  const sharedSnapshot = () =>
    page.evaluate(() => {
      const headingStyles = (selector) => {
        const style = getComputedStyle(document.querySelector(selector));
        return [style.fontSize, style.fontFamily, style.color, style.lineHeight];
      };
      return {
        proof: document.querySelector('.hero-social-proof').textContent,
        badges: document.querySelector('.trust-badges').textContent,
        reviews: document.querySelector('#reviews').textContent,
        faq: document.querySelector('#faq').textContent,
        reviewHeading: headingStyles('#reviews h2'),
        faqHeading: headingStyles('#faq h2'),
      };
    });
  await page.goto('/');
  const home = await sharedSnapshot();
  await page.goto('/services/0');
  expect(await sharedSnapshot()).toEqual(home);
  const featured = page.locator('.review-card.featured');
  const firstReview = await featured.textContent();
  await page.getByRole('button', { name: 'Next review' }).click();
  await expect(featured).not.toHaveText(firstReview);
  await page.getByRole('button', { name: 'Previous review' }).click();
  await expect(featured).toHaveText(firstReview);
});

for (const service of services) {
  test(`${service.title}: exact approved FAQ copy and local solar quote link`, async ({ page }) => {
    await page.goto(`/services/${service.id}#faq`);
    const section = page.getByRole('region', { name: serviceFaqCopy.heading, exact: true });
    await expect(section.getByRole('heading', { level: 2 })).toHaveText(serviceFaqCopy.heading);
    await expect(section.getByRole('button')).toHaveCount(6);
    for (const item of serviceFaqCopy.items) {
      const trigger = section.getByRole('button', { name: item.question, exact: true });
      if ((await trigger.getAttribute('aria-expanded')) !== 'true') await trigger.click();
      const panel = section.getByRole('region', { name: item.question, exact: true });
      await expect(panel).toBeVisible();
      await expect(panel).toHaveText(item.answer);
      if (item.bold) await expect(panel.locator('strong')).toHaveText(item.bold);
    }
    await expect(section.locator('.faq-contact strong')).toHaveText(serviceFaqCopy.closingHeading);
    await expect(section.locator('.faq-contact p')).toContainText(serviceFaqCopy.closingCopy);
    const quote = section.getByRole('link', { name: serviceFaqCopy.cta, exact: true });
    await expect(quote).toHaveAttribute('href', `/services/${service.id}#quote`);
    await quote.click();
    await expect(page).toHaveURL(`/services/${service.id}#quote`);
    await expect(page.locator('#quote')).toBeInViewport();
    await expect(page.getByLabel('Interested in')).toHaveValue(service.title);
  });
}
