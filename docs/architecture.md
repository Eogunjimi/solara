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

## Navigation and Lagos location pages

- The shared header shows full desktop navigation at 1024px and above. About Us, Services, and Service Areas use disclosure lists with real parent links; smaller screens use an expandable mobile navigation panel.
- The masthead is sticky. `top: -26px` parks the 26px utility strip above the viewport so only the 48px navigation bar stays pinned; on mobile the strip is hidden and the whole 48px bar pins. `main [id]` carries a matching `scroll-margin-top` so anchored sections and `/contact#quote` are not hidden behind the pinned bar.
- Desktop layout is a single fitted row: left links, centered logo, right contact links and inspection CTA. The logo's own grid column is sized from its content, so the wrapper is centered at every width from 1024px up; services and area lists open as two-column panels anchored under their parent labels.
- Navbar height is deliberate. Desktop bars measure 48px and every visible link keeps a 44px minimum tap height inside that band, so text and hit areas stay comfortably sized while the bar stays slim. Keep the logo lockup on one row at desktop widths; stacking the mark above the wordmark is what previously forced the bar taller.
- The inspection CTA uses the same trick from the opposite direction: the link keeps a 44px box for tapping, while its pill is painted with a `::before` inset 7px from the top and bottom, so the visible button stays small and fitted inside the slim bar. Desktop only — inside the mobile panel the link paints a normal full-width 48px pill.
- The masthead keeps the footer green but paints it at 75% opacity with a 16px backdrop blur, so page content washes behind the pinned bar instead of being cut off by a solid slab. `.site-header` itself is transparent so it cannot paint over that effect; only the open mobile panel re-paints green, at 98% because it sits on top of photography.
- That pill is translucent (`rgba(214, 168, 77, 0.78)`) with a hairline light border and a small backdrop blur, so the green bar reads through it. Because the surface is see-through, the label uses the brand's dark ink on gold rather than white; white on translucent gold drops to roughly 2:1 contrast. Keep the translucent backgrounds paired with `#14231c` text.
- `src/data/serviceAreas.js` is the single source for the ten area names, slugs, descriptions, and property-planning points. Both the header dropdown and `/areas` directory read it.
- `/areas/:areaSlug` uses `AreaDetailPage` with shared hero, process, FAQ, and quote sections. Unknown slugs show the normal not-found screen.
- A location's inspection form is prefilled with its area name and resets when navigating to a different location. Submission remains local-only, like the existing quote forms; it does not schedule a visit or send an enquiry.
- Area copy must not imply a local office, verified completed work, or guaranteed visit availability. Access and scheduling require confirmation for the specific property.

## WhatsApp shortcut

- `src/components/ui/WhatsAppButton.jsx` renders once from `SiteLayout`, so the floating shortcut appears on every page without pages or sections owning their own copy.
- The destination comes from `whatsappHref` in `src/config/site.js`, which derives `wa.me` from the configured phone number and appends a prefilled greeting. The number is still the placeholder business phone; set the real WhatsApp line before launch, and do not hardcode a second number in components.
- The link opens in a new tab with `rel="noopener noreferrer"`. Its visible label is decorative (`aria-hidden`); the accessible name comes from the link's own `aria-label`.
- An `IntersectionObserver` watches the footer's Back to top button and fades the shortcut out while that control is on screen, so the two never compete for the same corner. The observer is optional: without `IntersectionObserver` support the shortcut simply stays visible.
