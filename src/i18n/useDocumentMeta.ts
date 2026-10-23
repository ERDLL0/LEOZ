import { useEffect } from 'react';
import { useDict } from './LocaleContext';

/**
 * Keeps the document title and description aligned with the active page and
 * locale. Staging stays noindex; only presentational metadata is updated.
 */
export function useDocumentMeta(title: string, description?: string) {
  const { dict } = useDict();

  useEffect(() => {
    document.title = title ? `${title} | ${dict.common.brandTitle}` : dict.common.brandTitle;
    if (description) {
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (meta) meta.content = description;
    }
  }, [title, description, dict]);
}
