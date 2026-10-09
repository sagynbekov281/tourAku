import { useEffect } from 'react';

// Вызывает load сразу, потом каждые N секунд, при возврате на вкладку и при появлении сети.
export function useLivePolling(
  load: (cancelled: () => boolean) => void,
  deps: unknown[],
  interval = 5000,
) {
  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;
    const run = () => { if (document.visibilityState === 'visible') load(isCancelled); };

    load(isCancelled);
    const id = window.setInterval(run, interval);
    window.addEventListener('focus', run);
    window.addEventListener('online', run);
    document.addEventListener('visibilitychange', run);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      window.removeEventListener('focus', run);
      window.removeEventListener('online', run);
      document.removeEventListener('visibilitychange', run);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}