import { useEffect } from 'react';
import { API_URL } from '../api';

const PING_INTERVAL = 10 * 60 * 1000; // 10 минут

function ping() {
  fetch(`${API_URL}/health`, { cache: 'no-store', keepalive: true }).catch(() => {});
}

export function useServerKeepAlive() {
  useEffect(() => {
    ping(); // будим сервер сразу при открытии сайта

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') ping();
    }, PING_INTERVAL);

    const onVisible = () => {
      if (document.visibilityState === 'visible') ping();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);
}