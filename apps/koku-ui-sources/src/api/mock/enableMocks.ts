/**
 * Dev-only: start MSW in the browser. Gated by webpack DefinePlugin (SOURCES_ENABLE_MSW).
 */
export async function enableMocking(): Promise<void> {
  const { worker } = await import('./browser');
  const swPath = '/sources/mockServiceWorker.js';
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${window.location.origin}${swPath}`,
    },
  });
}
