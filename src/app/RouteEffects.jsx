import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig, navigation } from '../config/site.js';
import { articles } from '../data/articles.js';
import { services } from '../data/services.js';

/** Keep SPA navigation, hash links, browser history, and document titles in sync. */
export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const article = articles.find((item) => path === `/blog/${item.id}`);
    const service = services.find((item) => path === `/services/${item.id}`);
    const title =
      article?.title ??
      service?.title ??
      navigation.find((item) => item.to === path)?.label ??
      'Page not found';
    document.title = `${title} | ${siteConfig.title}`;
    // Routes render synchronously; defer scrolling until React has committed the page.
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
