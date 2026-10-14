import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Guide } from '../data';
import { API_URL } from '../api';
import { useLivePolling } from './useLivePolling';

const cacheKey = (lang: string) => `tourco_guides_cache_${lang}`;

type ApiGuide = {
  id: string; name: string; role: string; experience: string; photo?: string;
  languages: string[]; regions: string[]; bio: string; about?: string; initials: string;
};

function readCache(lang: string): ApiGuide[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(lang));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Возвращает гидов + состояние загрузки.
 * Запасных (fake) гидов больше нет: пока данных нет, guides = [], loading = true.
 */
export function useGuidesState() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  const [remote, setRemote] = useState<ApiGuide[] | null>(() => readCache(lang));
  const [failed, setFailed] = useState(false);
  const lastRaw = useRef('');
  const fails = useRef(0);

  useEffect(() => {
    lastRaw.current = '';
    fails.current = 0;
    setFailed(false);
    setRemote(readCache(lang));
  }, [lang]);

  useLivePolling((cancelled) => {
    fetch(`${API_URL}/api/guides?lang=${lang}`, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (cancelled()) return;
        const key = lang + '|' + text;
        if (key === lastRaw.current) return;
        const d = JSON.parse(text) as { success?: boolean; guides?: ApiGuide[] };
        if (!d.success || !Array.isArray(d.guides)) throw new Error('bad response');
        lastRaw.current = key;
        fails.current = 0;
        setFailed(false);
        try {
          // Фото в кэш не кладём (base64 может быть тяжёлым), остальное кладём
          const cached = d.guides.map(({ photo: _photo, ...guide }) => ({ ...guide, photo: '' }));
          localStorage.setItem(cacheKey(lang), JSON.stringify(cached));
        } catch { /* ignore */ }
        setRemote(d.guides);
      })
      .catch(() => {
        if (cancelled()) return;
        fails.current += 1;
        if (fails.current >= 3) setFailed(true);
      });
  }, [lang]);

  const guides: Guide[] = useMemo(
    () =>
      (remote ?? []).map((g, i) => ({
        id: g.id || i + 1,
        name: g.name,
        role: g.role,
        experience: g.experience,
        languages: g.languages || [],
        regions: g.regions || [],
        bio: g.bio || '',
        about: g.about || g.bio || '',
        photo: g.photo || '',
        initials: g.initials,
      })),
    [remote],
  );

  return {
    guides,
    loading: remote === null && !failed,
    failed: remote === null && failed,
  };
}

/** Старый вариант (только массив), чтобы не сломать другие файлы, где вызывается useGuides(). */
export function useGuides(): Guide[] {
  return useGuidesState().guides;
}