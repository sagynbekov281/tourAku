import { useEffect } from 'react';

// Адрес бэкенда. Подставь свой (тот же, что используешь для API)
const API_URL = (import.meta.env.VITE_API_URL || 'https://ТВОЙ-БЭКЕНД.onrender.com').replace(/\/+$/, '');

const PING_INTERVAL = 10 * 60 * 1000; // 10 минут

async function ping() {
  try {
    await fetch(`${API_URL}/health`, {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
    });
  } catch {
    // Ошибки игнорируем: это просто «будильник» для сервера
  }
}

export function useServerKeepAlive() {
  useEffect(() => {
    // 1. Будим сервер сразу при открытии сайта
    ping();

    // 2. Периодически пингуем, пока вкладка открыта
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') ping();
    }, PING_INTERVAL);

    // 3. Когда пользователь возвращается на вкладку, пингуем снова
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