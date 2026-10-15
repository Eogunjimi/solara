import { expect, test } from '@playwright/test';
import { siteConfig } from '../../src/config/site.js';
import { services } from '../../src/data/services.js';
import { serviceDetails } from '../../src/data/serviceDetails.js';
import { serviceAreas } from '../../src/data/serviceAreas.js';

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
    await expect(page).toHaveTitle(detail.seo.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      detail.seo.description,
    );
    await expect(landing.getByRole('heading', { level: 1 })).toHaveText(detail.heroTitle);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    await expect(landing.locator('.service-visual')).toHaveCount(0);
    await expect(landing.locator('.service-hero .social-badge')).toContainText('5.0');
    await expect(
      landing.locator('.service-hero').getByRole('img', { name: '5 stars' }),
    ).toBeVisible();
    await expect(landing.locator('.service-hero + .trust-badges')).toHaveCount(1);
    await expect(landing.locator('#projects + #reviews')).toHaveCount(1);
    await expect(landing.locator('.standard-point')).toHaveCount(4);
    await expect(landing.locator('.process-step')).toHaveCount(4);
    await expect(landing.locator('.service-start li')).toHaveCount(3);
    await expect(landing.locator('.faq-trigger')).toHaveText(
      detail.faqs.map((item) => item.question),
    );
    await expect(landing.getByRole('form')).toHaveCount(1);
    await expect(landing.locator('.service-quote-for')).toContainText(service.title);
    expect(
      await landing.evaluate((element) => {
        const ids = [...element.querySelectorAll('[id]')].map((node) => node.id);
        return ids.length === new Set(ids).size;
      }),
    ).toBe(true);

    await landing.locator('.service-hero').getByRole('link', { name: 'View our projects' }).click();
    await expect(page).toHaveURL(`/services/${service.id}#projects`);
    await expect(landing.locator('#projects')).toBeInViewport();
    await landing.locator('.service-hero').getByRole('link', { name: 'Get a free quote' }).click();
    await expect(page).toHaveURL(`/services/${service.id}#quote`);
    await expect(landing.locator('#quote')).toBeInViewport();
    await page.reload();
    await expect(landing.locator('#quote')).toBeInViewport();
    await expect(landing.locator('.service-quote-for')).toContainText(service.title);

    await landing.locator('.service-step-cta').getByRole('link').click();
    await expect(landing.locator('#quote')).toBeInViewport();

    const faq = landing.locator('#faq');
    const questionIndex = Math.min(1, detail.faqs.length - 1);
    const trigger = faq.getByRole('button', { name: detail.faqs[questionIndex].question });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(faq.getByText(detail.faqs[questionIndex].answer)).toBeVisible();
    await page.keyboard.press('Space');
    await expect(faq.getByText(detail.faqs[questionIndex].answer)).toBeHidden();
    await faq.getByRole('link', { name: 'Get a free quote' }).click();
    await expect(landing.locator('#quote')).toBeInViewport();

    const area = serviceAreas[0];
    await landing
      .locator('.service-area-links')
      .getByRole('link', { name: new RegExp(area.name) })
      .click();
    await expect(page).toHaveURL(`/areas/${area.slug}`);
    await page.goBack();
    await expect(page).toHaveURL(`/services/${service.id}#quote`);

    for (const width of [320, 390, 600, 800, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      // Check the actual page content and every reusable section, not overflow clipping.
      const geometry = await landing.evaluate((element) => {
        const nodes = [
          element,
          ...element.querySelectorAll(
            'section, .service-quote-card, .standard-point, .process-card, .service-start li, .service-area-links a, input, select, textarea',
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
    expect(errors).toEqual([]);
  });
}

test('service pages publish service structured data and no canonical link until a site URL is configured', async ({
  page,
}) => {
  await page.goto('/services/0');
  const schema = await page.locator('script[data-page="service"]').textContent();
  const json = JSON.parse(schema);
  expect(json['@graph'][0]['@type']).toBe('Service');
  expect(json['@graph'][0].provider.name).toBe(siteConfig.name);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(siteConfig.siteUrl ? 1 : 0);
  await page.goto('/services/1');
  await expect(page.locator('script[data-page="service"]')).toHaveCount(1);
});

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
  await form.getByLabel('Location').fill('Lagos');
  await form.getByLabel('Tell us what you need').fill('Review camera coverage for our shop');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toContainText('has not been sent or saved');
  await form.getByLabel('Location').fill('Lagos Island');
  await expect(form.getByRole('status')).toHaveCount(0);
  await page
    .locator('.service-related')
    .getByRole('link', { name: 'Residential Solar', exact: true })
    .click();
  await expect(page).toHaveURL('/services/0');
  await expect(page.locator('.service-quote-for')).toContainText('Residential Solar');
  await expect(page.getByLabel('Full name')).toHaveValue('');
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
});

test('the portfolio placeholder links to the quote form until project photos are supplied', async ({
  page,
}) => {
  await page.goto('/services/2');
  const work = page.locator('#projects');
  await expect(work.getByRole('heading', { level: 2 })).toContainText('Our');
  await work.getByRole('link', { name: 'Let’s discuss your project' }).click();
  await expect(page).toHaveURL('/services/2#quote');
  await expect(page.locator('#quote')).toBeInViewport();
});

test('services reuse homepage rating, trust badges, and reviews', async ({ page }) => {
  const sharedSnapshot = () =>
    page.evaluate(() => {
      const headingStyles = (selector) => {
        const style = getComputedStyle(document.querySelector(selector));
        return [style.fontSize, style.fontFamily, style.color, style.lineHeight];
      };
      return {
        proof: document.querySelector('.social-badge').textContent,
        badges: document.querySelector('.trust-badges').textContent,
        reviews: document.querySelector('#reviews').textContent,
        reviewHeading: headingStyles('#reviews h2'),
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
