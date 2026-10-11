import { siteConfig } from '../config/site.js';

let defaultDescription;

/**
 * Sets the document title, meta description, and canonical link for the current route.
 * Canonical links are only written once `siteConfig.siteUrl` is configured, so preview hosts
 * are never advertised as the canonical address.
 */
export function applyPageMeta({ title, description, path, indexable = true }) {
  document.title = title;

  let descriptionTag = document.querySelector('meta[name="description"]');
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.name = 'description';
    document.head.appendChild(descriptionTag);
  }
  if (defaultDescription === undefined) defaultDescription = descriptionTag.content;
  descriptionTag.content = description ?? defaultDescription;

  let canonical = document.querySelector('link[rel="canonical"]');
  const canonicalHref =
    indexable && siteConfig.siteUrl && path ? `${siteConfig.siteUrl}${path}` : null;
  if (canonicalHref) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
  } else if (canonical) {
    canonical.remove();
  }
}
