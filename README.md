# AFEEZTECHSOLAR Energy

A responsive solar-energy marketing site built with **React, Vite, and React Router**. The project uses JavaScript/JSX, plain CSS, and local React state. There is no backend, database, or live enquiry delivery yet.

## Getting started

Use Node.js **22.12+** (the `.nvmrc` selects Node 22) and npm.

```sh
npm ci
npm run dev
```

Vite listens on `0.0.0.0:5173`. In Arena, open the **AFEEZTECHSOLAR website** live preview. Locally, open `http://localhost:5173`. No environment variables are required.

## Commands

| Command                | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                      |
| `npm run build`        | Production bundle in `dist/`                            |
| `npm run preview`      | Serve the production build locally                      |
| `npm run lint`         | ESLint checks, including undefined JSX and React Hooks  |
| `npm run format`       | Format source and configuration with Prettier           |
| `npm run format:check` | Check formatting without changing files                 |
| `npm test`             | Run component and route tests once                      |
| `npm run test:watch`   | Run Vitest in watch mode                                |
| `npm run check`        | Lint, formatting, component tests, and production build |
| `npm run test:e2e`     | Playwright checks against the production build          |

For browser tests:

```sh
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

Playwright starts and stops its own preview server on port 4173. Tests run at desktop and mobile viewport sizes. An existing compatible Chromium binary can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Browser binaries, reports, and build outputs are not committed.

## Structure

```text
src/
  app/                   Route tree, route effects, and render-error recovery
  components/
    layout/              Shared site shell, header, footer, and logo
    ui/                  Small reusable presentation components
    sections/            Composable marketing sections
  config/                Shared business details and navigation
  data/                  Content collections, page copy, and image references
  features/
    academy/             Reusable article cards, grid, and home preview
    quote/               Quote section and local-only form behavior
  pages/                 Route-level composition and detail/404 pages
  styles/
    features/            Feature styles, including scoped form controls
    sections/            Section-specific styling and responsive rules
    index.css            Explicit stylesheet import order
    tokens.css           Design tokens
  test/                  Shared Vitest setup
  main.jsx               Application bootstrap only

tests/e2e/               Browser regression tests
public/                  Assets served by the application
```

Tests are colocated with the code they exercise. See [Architecture and contribution guide](docs/architecture.md) for conventions and extension points.

## Common edits

- **Business identity/contact details:** `src/config/site.js`
- **Home section order:** `src/pages/HomePage.jsx`
- **Page copy:** `src/data/pages.js`
- **Services, projects, FAQs, reviews, articles:** the corresponding `src/data/` file
- **Shared photography:** `src/data/images.js`; panel imagery is in `src/data/panels.js`
- **Colors and typography:** `src/styles/tokens.css`
- **How It Works:** `src/components/sections/ProcessSection.jsx`, `src/data/process.js`, and `src/styles/sections/process.css`
- **Quote form:** `src/features/quote/QuoteForm.jsx`
- **Routes:** `src/app/App.jsx`

The `image-search/` and `uploads/` directories retain the original reference material. They are not loaded by the application; runtime assets live in `public/` or the image configuration.

## Routing and deployment

The app has explicit routes for the home, about, services, areas, projects, contact, and academy pages, plus service/location/article detail routes and a not-found screen. `/quote` redirects to `/contact#quote`. Header/footer links use client-side navigation; phone and email links remain native anchors.

A floating WhatsApp shortcut is rendered from the shared layout on every page. Its `wa.me` destination is derived from the configured phone number in `src/config/site.js`, so changing the business number updates the shortcut automatically. Keep the number in one place; do not hardcode a second one in components.

Deploy the contents of `dist/` to a static host. Configure the host to **serve `index.html` for application routes that do not match a static file**, so direct visits to `/about` and other nested routes work. Vite provides this fallback in development and preview; your production host must provide it too. The client-side not-found screen is not an HTTP 404 response on a typical static SPA host.

## Before going live

- The quote form validates required fields but **does not send or persist any information**. Its confirmation states this explicitly. Add a backend with server-side validation, abuse protection, and actual delivery feedback before accepting enquiries. Never put service credentials in browser code or `VITE_*` variables.
- Phone/email details, social proof, ratings, testimonials, partner names, and business claims are existing placeholder/unverified content. Review them with the business before publishing.
- Article data currently contains summaries only. Detail pages explicitly state that the full guides are not yet published; add approved content before advertising a complete academy.
- Replace external stock images with approved business photography and verify usage rights. The founder image is not a verified portrait.
- Privacy and terms now link to starter demo notices. Have these reviewed and completed for the real business before enabling live enquiries. No social profile links are shown because verified profile URLs have not been supplied.

## Automated checks

GitHub Actions runs `npm ci`, the quality checks, and desktop/mobile Playwright tests for pushes and pull requests. Browser tests stub external font/stock-image requests so third-party availability does not decide whether the application passes.
