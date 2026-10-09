import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FALLBACK_GUIDES, FALLBACK_GUIDES_EN, type Guide } from '../data';
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

export function useGuides(): Guide[] {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  const [remote, setRemote] = useState<ApiGuide[] | null>(() => readCache(lang));
  const lastRaw = useRef('');

  useLivePolling((cancelled) => {
    fetch(`${API_URL}/api/guides?lang=${lang}`, { cache: 'no-cache' })
      .then((r) => r.text())
      .then((text) => {
        if (cancelled()) return;
        const key = lang + '|' + text;
        if (key === lastRaw.current) return;
        const d = JSON.parse(text) as { success?: boolean; guides?: ApiGuide[] };
        if (!d.success || !Array.isArray(d.guides)) return;
        lastRaw.current = key;
        try {
          const cached = d.guides.map(({ photo, ...guide }) => ({ ...guide, photo: '' }));
          localStorage.setItem(cacheKey(lang), JSON.stringify(cached));
        } catch { /* ignore */ }
        setRemote(d.guides);
      })
      .catch(() => {});
  }, [lang]);

  if (!remote) return lang === 'en' ? FALLBACK_GUIDES_EN : FALLBACK_GUIDES;

  return remote.map((g, i) => ({
    id: g.id || i + 1, name: g.name, role: g.role, experience: g.experience,
    languages: g.languages || [], regions: g.regions || [], bio: g.bio || '',
    about: g.about || g.bio || '', photo: g.photo || '', initials: g.initials,
  }));
}