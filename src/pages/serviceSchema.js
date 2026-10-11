import { siteConfig } from '../config/site.js';

/**
 * Service structured data for one service page. Breadcrumb data is only included once the
 * production origin is configured, because breadcrumb items need absolute URLs.
 */
export function buildServiceSchema(service, detail, path) {
  const graph = [
    {
      '@type': 'Service',
      name: service.title,
      serviceType: detail.seo.keyword,
      description: detail.seo.description,
      areaServed: { '@type': 'AdministrativeArea', name: 'Lagos, Nigeria' },
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
          name: 'Services',
          item: `${siteConfig.siteUrl}/#services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: `${siteConfig.siteUrl}${path}`,
        },
      ],
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
