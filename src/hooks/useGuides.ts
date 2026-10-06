import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FALLBACK_GUIDES, FALLBACK_GUIDES_EN, type Guide } from '../data';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const cacheKey = (lang: string) => `tourco_guides_cache_${lang}`;

type ApiGuide = {
  id: string; name: string; role: string; experience: string;
  languages: string[]; regions: string[]; bio: string; initials: string;
};

function readCache(lang: string): ApiGuide[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(lang));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

export function useGuides(): Guide[] {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  const [remote, setRemote] = useState<ApiGuide[] | null>(() => readCache(lang));

  useEffect(() => {
    setRemote(readCache(lang));
    let cancelled = false;
    fetch(`${API_URL}/api/guides?lang=${lang}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d.success || !Array.isArray(d.guides)) return;
        try { localStorage.setItem(cacheKey(lang), JSON.stringify(d.guides)); } catch { /* ignore */ }
        setRemote(d.guides.length ? d.guides : null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [lang]);

  if (!remote) return lang === 'en' ? FALLBACK_GUIDES_EN : FALLBACK_GUIDES;

  return remote.map((g, i) => ({
    id: i + 1, name: g.name, role: g.role, experience: g.experience,
    languages: g.languages, regions: g.regions, bio: g.bio, initials: g.initials,
  }));
}
