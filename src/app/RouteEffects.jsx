import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig, navigation } from '../config/site.js';
import { articles } from '../data/articles.js';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';
import { serviceAreas } from '../data/serviceAreas.js';
import { policies } from '../data/policies.js';
import { areaPages } from '../data/areaPages.js';
import { applyPageMeta } from './pageMeta.js';

/** Keep SPA navigation, hash links, browser history, and document titles in sync. */
export default function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const article = articles.find((item) => path === `/blog/${item.id}`);
    const service = services.find((item) => path === `/services/${item.id}`);
    const seo = service ? serviceDetails[service.id]?.seo : undefined;
    const area = serviceAreas.find((item) => path === `/areas/${item.slug}`);
    const areaSeo = area ? areaPages[area.slug]?.seo : undefined;
    const pageTitles = { '/projects': 'Project gallery' };
    const title =
      pageTitles[path] ??
      (area ? `${area.name} Solar & Electrical Services` : undefined) ??
      article?.title ??
      service?.title ??
      navigation.find((item) => item.to === path)?.label ??
      policies[path.slice(1)]?.title ??
      'Page not found';
    const notFound = title === 'Page not found';
    applyPageMeta({
      title: (seo ?? areaSeo)?.title ?? `${title} | ${siteConfig.title}`,
      description: (seo ?? areaSeo)?.description,
      path,
      indexable: !notFound,
    });
    // Include the location key so repeated clicks on the same anchor scroll again.
    // Routes render synchronously; defer scrolling until React has committed the page.
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}
