# Architecture and contribution guide

## Design goals

Keep the site easy to change without introducing infrastructure it does not need. The application remains a client-rendered React/Vite site. This refactor preserves the existing page content and section layouts, with a responsive, dark connected workflow for **How It Works**.

JavaScript was retained intentionally: converting the product to TypeScript or introducing a framework/backend is a separate decision, not a prerequisite for separating responsibilities. Runtime dependencies use version ranges rather than `latest`; `package-lock.json` and `npm ci` make installs reproducible. Build and test tools belong in `devDependencies`.

## Boundaries

- **`main.jsx`** mounts React, the router provider, and the error boundary. It contains no page content.
- **`app/App.jsx`** defines the route tree. Keeping the provider outside `App` allows tests to use `MemoryRouter`.
- **`SiteLayout`** owns the single header, main landmark, footer, and skip link. Pages must not duplicate these.
- **Pages** compose sections. `ContentPage` is deliberately a shared template for the existing brochure pages; give a page its own component once its layout genuinely diverges.
- **Sections** own local presentation and interactions. The project filter, review index, and FAQ expansion do not need an application-wide store.
- **Features** group related behavior used across pages. The quote form and academy cards have separate, cohesive homes.
- **Data modules** contain static content, not React markup. Use named fields rather than positional tuples. Existing service/article numeric IDs are explicit strings and remain stable when a collection is reordered.
- **Configuration** holds shared business identity and navigation. Do not duplicate email addresses or phone numbers in components.

Dependencies flow from pages to features/sections to shared UI and data. Shared UI must not import pages. Use direct imports; avoid broad barrel files and circular dependencies. Use descriptive component names and keep each component in its own file.

## Navigation

Use React Router `Link`/`NavLink` for internal navigation and native anchors for `mailto:`, `tel:`, and external URLs. `ButtonLink` is a navigation link, not a form-submit button.

`RouteEffects` updates the document title and handles scroll-to-top/hash navigation on route changes. Cross-page CTAs use `/contact#quote` rather than a hash that may not exist on the current page. Section IDs must remain unique. The Solara Standard section uses `standard`; the project gallery owns `projects`.

Unknown routes render `NotFoundPage`, rather than silently falling back to the homepage. Existing service/article links now resolve explicitly. Service detail pages reuse the existing service description; article detail pages label the current summary-only content honestly.

## Styles

All styles are imported once through `src/styles/index.css` in a documented order: tokens and shared foundations, layout/pages, feature and section styles, then accessibility rules.

- Add design tokens to `tokens.css`.
- Put section-specific selectors and responsive rules in the matching section file.
- Edit existing declarations rather than appending “final fix” overrides to a global file.
- Preserve shared class contracts (`container`, `section`, `btn`, etc.) unless intentionally changing the design.
- Form controls are scoped to `.quote-form`, so adding another form will not inherit quote styling accidentally.
- Retired markup rules and provably superseded declarations were removed. Some original selector-specific responsive overrides remain to preserve the current design; simplify them with browser regression checks rather than changing cascade order blindly.
- Check 390px, 800px, and desktop widths after layout changes. Keep reduced-motion and keyboard focus treatments intact.

No CSS framework or CSS-in-JS runtime is required for this site. Stylesheets are deliberately separate from component content and state.

## Quote form integration

`QuoteForm` uses native field validation and component-local feedback. Submission currently only sets local state; there is no network call or persistence. Never show a “request sent” message for this demo behavior.

When an API is available:

1. Introduce a quote-specific API adapter under `features/quote/` with a relative same-origin URL.
2. Validate and rate-limit on the server. Browser validation is not a security boundary.
3. Handle pending, success, and failure states explicitly; announce status accessibly.
4. Keep provider credentials server-side. Do not add secrets to source control or client environment variables.
5. Add tests for failed delivery, repeated submission, and successful delivery before changing the confirmation copy.

There are intentionally no empty API/service/store directories or fake integrations today.

## Testing and quality gates

- **Vitest + React Testing Library:** route rendering, one shared layout, unknown-route handling, navigation, unique anchors, filter behavior, FAQ/review interactions, interval cleanup, quote validation, and render-error recovery.
- **Playwright:** real browser execution, direct route reloads, history navigation, mobile menu behavior, cross-page hash scrolling, form validation, interactive sections, layout overflow, and the responsive process workflow.
- **ESLint:** undefined references (including JSX), unused code, React conventions, Hooks rules, and Fast Refresh boundaries.
- **Prettier + EditorConfig:** consistent readable source, CSS, and configuration.
- **GitHub Actions:** runs the quality gates and browser tests; uploads reports on failure.

Run `npm run check` before a handoff. After visual or navigation changes, also run `npm run build && npm run test:e2e`. Browser tests are not a substitute for reviewing photography, business claims, or visual design.

## Error handling

The root `ErrorBoundary` provides a reload action if a render failure reaches the top of the tree. It does not replace local asynchronous error handling. It currently logs to the console; wire `componentDidCatch` to an approved monitoring service if production observability is needed.

## Scope of this refactor

The site remains a marketing frontend, not a completed production platform. No company claims were newly verified, no full academy articles were fabricated, and no live enquiry service was added. Reference files and approved-for-review imagery remain in place.
