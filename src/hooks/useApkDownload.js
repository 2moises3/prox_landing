import { useEffect, useState } from 'react';
import { BRAND } from '../data/content';

export function useApkDownload() {
  const [url, setUrl] = useState(BRAND.legacyApkUrl);

  useEffect(() => {
    const controller = new AbortController();
    fetch(BRAND.betaReleaseUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo consultar la versión');
        return response.json();
      })
      .then((result) => {
        if (result.data?.apk_url) setUrl(BRAND.betaApkUrl);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return url;
}
