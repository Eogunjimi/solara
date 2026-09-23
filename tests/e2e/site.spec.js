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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable solar energy');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Get a free quote' }).click();
  await expect(page).toHaveURL(/\/contact#quote$/);
  await expect(page.locator('#quote')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#quote')).toBeInViewport();
});

test('the connected workflow adapts without overflowing or losing content', async ({ page }) => {
  await page.goto('/');
  const workflow = page.getByRole('region', { name: /Simple steps to/ });
  await expect(workflow.getByRole('listitem')).toHaveCount(4);
  await expect(workflow.locator('.process-track').getByRole('heading', { level: 3 })).toHaveText([
    'Tell Us What You Need',
    'Assessment & Quote',
    'Schedule & Install',
    'Power Up & Support',
  ]);
  const brandGreen = await page
    .locator('#academy')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const faqBackground = await page
    .locator('#faq')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(workflow).toHaveCSS('background-color', faqBackground);
  await expect(workflow.locator('.process-panel')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  );
  await expect(workflow.locator('.process-step-complete .process-card')).toHaveCSS(
    'background-color',
    brandGreen,
  );
  await expect(workflow.locator('.process-step-complete h3')).toHaveText('Power Up & Support');

  for (const width of [320, 390, 600, 800, 1000, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const sectionBox = await workflow.boundingBox();
    expect(sectionBox.x).toBe(0);
    expect(sectionBox.width).toBe(width);
    if (width >= 1280) expect(sectionBox.height).toBeLessThan(900);
    const sectionPadding = width <= 600 ? '75px' : '115px';
    await expect(workflow).toHaveCSS('padding-top', sectionPadding);
    await expect(workflow).toHaveCSS('padding-bottom', sectionPadding);
    const cards = workflow.locator('.process-card');
    const panel = await workflow.locator('.process-panel').boundingBox();
    let previousBottom = 0;
    for (const card of await cards.all()) {
      await expect(card.getByRole('heading')).toBeVisible();
      const box = await card.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(panel.x);
      expect(box.x + box.width).toBeLessThanOrEqual(panel.x + panel.width);
      expect(box.y).toBeGreaterThan(previousBottom);
      previousBottom = box.y + box.height;
      expect(await card.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
        true,
      );
    }
    const form = workflow.getByRole('form', { name: 'Start your solar request' });
    const formBox = await form.boundingBox();
    const detailsBox = await workflow.locator('.process-details').boundingBox();
    expect(formBox.x).toBeGreaterThanOrEqual(panel.x);
    expect(formBox.x + formBox.width).toBeLessThanOrEqual(panel.x + panel.width);
    if (width > 1000) {
      expect(formBox.x + formBox.width).toBeLessThan(detailsBox.x);
      expect(Math.abs(formBox.y - detailsBox.y)).toBeLessThanOrEqual(1);
      expect(
        Math.abs(formBox.y + formBox.height - detailsBox.y - detailsBox.height),
      ).toBeLessThanOrEqual(1);
    } else {
      expect(formBox.y).toBeGreaterThan(detailsBox.y + detailsBox.height);
    }
    for (const control of await form.locator('input, select, textarea, button').all()) {
      const box = await control.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(formBox.x);
      expect(box.x + box.width).toBeLessThanOrEqual(formBox.x + formBox.width);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    expect(await workflow.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true,
    );
  }
});

test('project filtering and the FAQ work in the browser', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'RESIDENTIAL', exact: true }).click();
  await expect(page.locator('.past-item')).toHaveCount(3);
  await page.getByRole('button', { name: 'ALL', exact: true }).click();
  await expect(page.locator('.past-item')).toHaveCount(7);
  const question = page.getByRole('button', { name: 'What size inverter do I need?' });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/The right inverter depends/)).toBeVisible();
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable solar energy');
});

test('FAQ cards follow the brand palette, support keyboard controls, and fit small screens', async ({
  page,
}) => {
  await page.goto('/#faq');
  const faq = page.getByRole('region', { name: 'Frequently Asked Questions', exact: true });
  const cards = faq.locator('.faq-item');
  await expect(cards).toHaveCount(6);
  const green = await page
    .locator('#academy')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(cards.first()).toHaveCSS('background-color', green);
  await expect(cards.first().locator('.lucide-minus')).toBeVisible();
  await expect(cards.nth(1).locator('.lucide-plus')).toBeVisible();

  const second = faq.getByRole('button', { name: 'What size inverter do I need?' });
  await second.focus();
  await page.keyboard.press('Enter');
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(cards.first().getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  await expect(cards.nth(1)).toHaveCSS('background-color', green);
  await expect(faq.getByText(/The right inverter depends/)).toBeVisible();
  await page.keyboard.press('Space');
  await expect(second).toHaveAttribute('aria-expanded', 'false');
  await expect(faq.getByText(/The right inverter depends/)).toBeHidden();
  await expect(second).toBeFocused();

  await cards.first().getByRole('button').click();
  for (const width of [320, 390, 600, 800, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await faq.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    for (const card of await cards.all()) {
      const button = card.getByRole('button');
      const box = await button.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(await card.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
        true,
      );
    }
  }
});

test('footer links, quote CTA, legal pages, and back-to-top work', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  for (const [name, path, title] of [
    ['Privacy notice', '/privacy', 'Privacy notice'],
    ['Website terms', '/terms', 'Website terms'],
    ['Our services', '/services', 'The right system starts with listening.'],
  ]) {
    await footer.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
  await footer.getByRole('link', { name: 'Get a free quote' }).click();
  await expect(page).toHaveURL('/contact#quote');
  await expect(page.locator('#quote')).toBeInViewport();
  await footer.getByRole('link', { name: 'FAQs', exact: true }).click();
  await expect(page).toHaveURL('/#faq');
  await expect(page.locator('#faq')).toBeInViewport();
  await footer.getByRole('button', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole('main')).toBeFocused();
});

test('footer animation pauses and respects reduced-motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const track = page.locator('.footer-marquee-track');
  await expect(track).toHaveCSS('animation-name', 'footer-scroll');
  const initial = await track.evaluate((element) => getComputedStyle(element).transform);
  await expect
    .poll(() => track.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(initial);
  await page.getByRole('button', { name: 'Pause footer animation' }).click();
  await expect(track).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Resume footer animation' }).click();
  // Focus/hover also pause the strip, so move both away after resuming.
  await page.getByRole('contentinfo').getByRole('link', { name: 'Home', exact: true }).focus();
  await page.mouse.move(0, 0);
  await expect(track).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(track).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.footer-motion-control')).toBeHidden();
});

test('footer remains readable and contained at phone, tablet, and desktop widths', async ({
  page,
}) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');
  for (const width of [320, 390, 600, 800, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(footer.getByRole('link', { name: 'Get a free quote' })).toBeVisible();
    expect(await footer.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true,
    );
    for (const selector of ['.footer-top', '.footer-bottom', '.footer-cta .btn', '.footer-year']) {
      const box = await footer.locator(selector).boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
  }
});

test('academy carousel controls, keyboard navigation, and article destinations work', async ({
  page,
}) => {
  await page.goto('/#academy');
  const academy = page.getByRole('region', { name: 'Useful thoughts on better energy.' });
  const firstHeading = () => academy.getByRole('heading', { level: 3 }).first();
  await expect(firstHeading()).toHaveText('How to choose the right solar system for your home');
  await academy.getByRole('button', { name: 'Next academy articles' }).click();
  await expect(firstHeading()).toHaveText('Solar panels, inverters and batteries explained');
  await academy.getByRole('button', { name: 'Previous academy articles' }).click();
  await expect(firstHeading()).toHaveText('How to choose the right solar system for your home');
  await academy.getByRole('button', { name: 'Previous academy articles' }).click();
  await expect(firstHeading()).toHaveText('What affects solar installation cost?');
  const viewport = academy.getByRole('group', { name: /Academy articles/ });
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect(firstHeading()).toHaveText('How to choose the right solar system for your home');
  await expect(viewport).toBeFocused();
  await academy
    .getByRole('button', { name: 'Start with: What affects solar installation cost?' })
    .click();
  await academy
    .getByRole('link', { name: 'Read article: What affects solar installation cost?' })
    .click();
  await expect(page).toHaveURL('/blog/2');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'What affects solar installation cost?',
  );
  await expect(page.getByText(/full guide has not been published/)).toBeVisible();
  await page.goBack();
  await academy.getByRole('link', { name: 'Visit the academy' }).click();
  await expect(page).toHaveURL('/blog');
  await expect(page.locator('.blog-grid .article-card')).toHaveCount(3);
  for (const image of await page.locator('.blog-grid .article-img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true);
  }
});

test('academy adapts to one, two, and three cards without clipping content or focus', async ({
  page,
}) => {
  await page.goto('/#academy');
  const academy = page.locator('#academy');
  for (const [width, visibleCards] of [
    [320, 1],
    [390, 1],
    [600, 1],
    [800, 2],
    [1000, 2],
    [1280, 3],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(academy.getByRole('article')).toHaveCount(visibleCards);
    expect(await academy.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true,
    );
    for (const card of await academy.getByRole('article').all()) {
      const box = await card.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(await card.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
        true,
      );
    }
    await academy
      .getByRole('link', { name: /Read article:/ })
      .first()
      .focus();
    const focused = page.locator(':focus');
    await expect(focused).toHaveCSS('outline-style', 'solid');
  }
});

test('academy transitions animate on navigation and honor reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#academy');
  const academy = page.locator('#academy');
  await academy.getByRole('button', { name: 'Next academy articles' }).click();
  await expect(academy.locator('.academy-track')).toHaveCSS('animation-name', 'academy-enter');
  await expect(academy.locator('.academy-track')).toHaveCSS('animation-duration', '0.4s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await academy.getByRole('button', { name: 'Next academy articles' }).click();
  await expect(academy.locator('.academy-track')).toHaveCSS('animation-name', 'none');
});

test('quote form shares the site styles and remains usable at every breakpoint', async ({
  page,
}) => {
  await page.goto('/contact#quote');
  const form = page.getByRole('form', { name: 'Solar quote request' });
  await expect(form).toHaveAttribute('aria-describedby', /.+/);
  await expect(form.getByText(/Demo form: details are not sent or saved/)).toBeVisible();
  await expect(form.getByRole('heading', { name: 'Your solar request' })).toBeVisible();
  const controls = form.locator('input, select, textarea');
  await expect(controls).toHaveCount(6);
  for (const width of [320, 390, 600, 800, 900, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page
        .locator('#quote')
        .evaluate((element) => element.scrollWidth <= element.clientWidth),
    ).toBe(true);
    for (const field of await controls.all()) {
      const box = await field.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.height).toBeGreaterThanOrEqual(44);
      await expect(field).toHaveCSS('font-size', '16px');
    }
  }
  await form.getByLabel('Full name').focus();
  await expect(form.getByLabel('Full name')).toHaveCSS('outline-style', 'solid');
  await expect(form.getByLabel('Full name')).toHaveCSS('outline-width', '2px');
  await page.keyboard.type('Keyboard customer');
  await page.keyboard.press('Tab');
  await expect(form.getByLabel('Phone number')).toBeFocused();
});

test('the contact quote and academy sections share the same textured background', async ({
  page,
}) => {
  await page.goto('/');
  const properties = [
    'background-color',
    'background-image',
    'background-position',
    'background-size',
  ];
  const academyStyles = await page.locator('#academy').evaluate((element, properties) => {
    const style = getComputedStyle(element);
    return properties.map((property) => style.getPropertyValue(property));
  }, properties);
  await page.goto('/contact#quote');
  for (const [index, property] of properties.entries()) {
    await expect(page.locator('#quote')).toHaveCSS(property, academyStyles[index]);
  }
});

test('the simplified homepage form validates required fields and accepts an optional message', async ({
  page,
}) => {
  await page.goto('/#process');
  const form = page.locator('#process').getByRole('form', { name: 'Start your solar request' });
  await expect(page.getByRole('form')).toHaveCount(1);
  await expect(form.locator('input, select, textarea')).toHaveCount(4);
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toHaveCount(0);
  await expect(form.getByLabel('Full name')).toBeFocused();
  await form.getByLabel('Full name').fill('Solar Customer');
  await form.getByLabel('Phone number').fill('08000000000');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByLabel('Location', { exact: true })).toBeFocused();
  await expect(form.getByRole('status')).toHaveCount(0);
  await form.getByLabel('Location', { exact: true }).fill('Lagos');
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toContainText('has not been sent or saved');
  await form.getByLabel('Your power needs (optional)').fill('Lights and fans');
  await expect(form.getByRole('status')).toHaveCount(0);
  await form.getByRole('button', { name: 'Review my request' }).click();
  await expect(form.getByRole('status')).toContainText('has not been sent or saved');
});

test('Good to Know replaces the bottom quote section and hero quote links reach the workflow form', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('LET’S TALK SOLAR', { exact: true })).toHaveCount(0);
  await expect(page.locator('#faq')).toHaveCount(1);
  await expect(page.locator('main > section').last()).toHaveAttribute('id', 'faq');
  await expect(page.locator('#academy + #faq')).toHaveCount(1);
  await page.getByRole('link', { name: 'Get my free quote' }).click();
  await expect(page).toHaveURL('/#quote');
  await expect(page.locator('#process #quote')).toBeInViewport();
  await expect(page.locator('#quote').getByLabel('Full name')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#process #quote')).toBeInViewport();
});

test('all six FAQ answers open and the solar quote link reaches the homepage form', async ({
  page,
}) => {
  await page.goto('/#faq');
  const faq = page.locator('#faq');
  await expect(faq.getByRole('heading', { level: 2 })).toHaveText('Frequently Asked Questions');
  await expect(faq.getByRole('button')).toHaveText([
    'How much does a complete solar system cost?',
    'What size inverter do I need?',
    'Can solar power my AC, fridge and other appliances?',
    'How long will my battery last?',
    'Can solar work during the rainy season?',
    'How does the installation process work?',
  ]);
  for (const trigger of await faq.getByRole('button').all()) {
    if ((await trigger.getAttribute('aria-expanded')) !== 'true') await trigger.click();
    await expect(faq.locator('.faq-panel:visible')).toHaveCount(1);
    const panel = page.locator(`[id="${await trigger.getAttribute('aria-controls')}"]`);
    await expect(panel).toBeVisible();
    await expect(panel).not.toBeEmpty();
  }
  await expect(faq.locator('.faq-panel:visible strong')).toContainText(
    'Tell us what you need → Property assessment',
  );
  await faq.getByRole('link', { name: 'Get a Solar Quote' }).click();
  await expect(page).toHaveURL('/#quote');
  await expect(page.locator('#quote').getByLabel('Full name')).toBeInViewport();
});

test('solar technology wraps all five cards without horizontal scrolling', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('.panel-types');
  const list = section.locator('.panel-list');
  const cards = section.getByRole('article');
  await expect(cards).toHaveCount(5);
  await expect(cards.locator('b')).toHaveText([
    'Monocrystalline',
    'Polycrystalline',
    'Monocrystalline PERC',
    'Monocrystalline TOPCon',
    'Bifacial',
  ]);
  for (const width of [320, 360, 390, 480, 481, 600, 768, 800, 801, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const expectedColumns = width <= 480 ? 2 : width <= 800 ? 3 : 5;
    expect(
      await list.evaluate(
        (element) => getComputedStyle(element).gridTemplateColumns.split(' ').length,
      ),
    ).toBe(expectedColumns);
    for (const element of [
      section,
      section.locator('.panel-types-inner'),
      list,
      ...(await cards.all()),
    ]) {
      expect(await element.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
      const box = await element.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    const boxes = [];
    for (const card of await cards.all()) {
      await expect(card).toBeVisible();
      await expect(card.locator('b')).toBeVisible();
      const box = await card.boundingBox();
      boxes.push(box);
      expect((await card.locator('.panel-photo').boundingBox()).height).toBeGreaterThan(0);
    }
    for (let index = 1; index < boxes.length; index++) {
      const previous = boxes[index - 1];
      const current = boxes[index];
      expect(
        current.y >= previous.y + previous.height - 1 ||
          current.x >= previous.x + previous.width - 1,
      ).toBe(true);
    }
    if (width <= 800) expect(boxes[4].y).toBeGreaterThan(boxes[0].y);
    else expect(boxes[4].y).toBe(boxes[0].y);
    // There is no hidden or off-screen carousel content to swipe into view.
    await list.evaluate((element) => {
      element.scrollLeft = 500;
    });
    expect(await list.evaluate((element) => element.scrollLeft)).toBe(0);
  }
});

test('About Us and Services are separate, responsive sections with working links', async ({
  page,
}) => {
  await page.goto('/');
  const about = page.locator('main > #about');
  const services = page.locator('main > #services');
  await expect(about).toHaveCount(1);
  await expect(page.locator('#about + #services')).toHaveCount(1);
  await expect(services.locator('.about-founder, .about-cta')).toHaveCount(0);
  await expect(services.locator('.mosaic-card')).toHaveCount(7);
  await expect(about.getByText('ABOUT US', { exact: true })).toBeVisible();
  await about.locator('.founder-portrait').scrollIntoViewIfNeeded();
  await expect(about.locator('.founder-photo')).toBeHidden();
  await expect(about.locator('.founder-fallback')).toBeVisible();
  for (const property of [
    'background-color',
    'background-image',
    'background-position',
    'background-size',
  ]) {
    const pastWorkStyle = await page
      .locator('.past-work')
      .evaluate(
        (element, property) => getComputedStyle(element).getPropertyValue(property),
        property,
      );
    await expect(about).toHaveCSS(property, pastWorkStyle);
  }
  await expect(services).toHaveCSS('background-image', 'none');
  const standardBackground = await page
    .locator('.standard-section')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(services).toHaveCSS('background-color', standardBackground);
  const green = await page
    .locator('#academy')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(services.getByRole('heading', { level: 2 })).toHaveCSS('color', green);
  const paper = await page
    .locator('body')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(about.getByRole('heading', { level: 2 })).toHaveCSS('color', paper);
  for (const width of [320, 390, 500, 600, 800, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locator of [
      about,
      services,
      about.locator('.about-cta'),
      ...(await services.locator('.mosaic-card').all()),
    ]) {
      expect(await locator.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
        true,
      );
      const box = await locator.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    for (const card of await services.locator('.mosaic-card').all()) {
      const copyBox = await card.locator('.mosaic-copy').boundingBox();
      const cardBox = await card.boundingBox();
      expect(copyBox.y).toBeGreaterThanOrEqual(cardBox.y);
    }
  }
  await about.getByRole('link', { name: 'GET YOUR FREE SOLAR QUOTE' }).click();
  await expect(page).toHaveURL('/contact#quote');
  await expect(page.locator('#quote')).toBeInViewport();
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore solutions' }).click();
  await expect(page).toHaveURL('/#services');
  await expect(services.getByRole('heading', { level: 2 })).toBeInViewport();
  await services.locator('.mosaic-card').first().click();
  await expect(page).toHaveURL('/services/0');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Residential Solar');
  await page.goto('/services');
  await expect(page.locator('#about')).toHaveCount(0);
  await expect(services).toHaveCount(1);
});
