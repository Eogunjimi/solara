import { useEffect } from 'react';

/** Adds one JSON-LD block for the current page and removes it when the page unmounts. */
export default function useJsonLd(schema, page) {
  const json = schema ? JSON.stringify(schema) : null;
  useEffect(() => {
    if (!json) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.page = page;
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [json, page]);
}
