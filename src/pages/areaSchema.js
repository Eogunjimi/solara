import { siteConfig } from '../config/site.js';

/**
 * Service structured data for one location page. Breadcrumb items need absolute URLs, so they
 * are only included once the production origin is configured. No LocalBusiness or FAQPage data.
 */
export function buildAreaSchema(area, page, path) {
  const graph = [
    {
      '@type': 'Service',
      name: page.seo.keyword,
      serviceType: 'Solar and electrical services',
      description: page.seo.description,
      areaServed: { '@type': 'Place', name: `${area.name}, Lagos, Nigeria` },
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
      ...(siteConfig.siteUrl ? { url: `${siteConfig.siteUrl}${path}` } : {}),
    },
  ];
  if (siteConfig.siteUrl) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Service areas',
          item: `${siteConfig.siteUrl}/areas`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: area.name,
          item: `${siteConfig.siteUrl}${path}`,
        },
      ],
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
