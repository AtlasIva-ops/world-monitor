export const SITE_VARIANT: string = (() => {
  if (typeof window === 'undefined') return import.meta.env.VITE_VARIANT || 'full';

  const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
  if (isTauri) {
    const stored = localStorage.getItem('worldmonitor-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy') return stored;
    return import.meta.env.VITE_VARIANT || 'full';
  }

  // Build-time variant takes priority over hostname detection.
  // This makes dedicated Vercel deployments (e.g. *.vercel.app) render the correct
  // variant even when the hostname doesn't match tech./finance./happy. prefixes.
  const buildVariant = import.meta.env.VITE_VARIANT;
  if (buildVariant && buildVariant !== 'full') return buildVariant;

  const h = location.hostname;
  if (h.startsWith('tech.')) return 'tech';
  if (h.startsWith('finance.')) return 'finance';
  if (h.startsWith('happy.')) return 'happy';

  if (h === 'localhost' || h === '127.0.0.1') {
    const stored = localStorage.getItem('worldmonitor-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy') return stored;
    return import.meta.env.VITE_VARIANT || 'full';
  }

  return 'full';
})();
