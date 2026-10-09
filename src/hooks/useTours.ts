import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiLandscapeLine, RiWaterFlashLine, RiTentLine, RiRoadsterLine, RiSnowyLine, RiPlantLine, RiCompassLine } from 'react-icons/ri';
import type { IconType } from 'react-icons';
import { FALLBACK_TOURS, FALLBACK_TOURS_EN, type Tour } from '../data';
import { API_URL } from '../api';
import { useLivePolling } from './useLivePolling';

const cacheKey = (lang: string) => `tourco_tours_cache_${lang}`;

const ICONS: Record<string, IconType> = {
  mountain: RiLandscapeLine, water: RiWaterFlashLine, tent: RiTentLine,
  rideshare: RiRoadsterLine, snow: RiSnowyLine, plant: RiPlantLine,
};

const PLACEHOLDER_PHOTO: Record<string, string> = {
  mountain: 'https://picsum.photos/seed/tour-mountain/800/600',
  water: 'https://picsum.photos/seed/tour-water/800/600',
  tent: 'https://picsum.photos/seed/tour-tent/800/600',
  rideshare: 'https://picsum.photos/seed/tour-offroad/800/600',
  snow: 'https://picsum.photos/seed/tour-snow/800/600',
  plant: 'https://picsum.photos/seed/tour-forest/800/600',
};

type ApiTour = {
  id: string; title: string; photo?: string; destination: string; description: string; about: string;
  duration: string; difficultyKey: 'easy' | 'medium' | 'hard'; difficulty: string; iconKey: string;
  highlights: string[]; itinerary: string[]; included: string[]; groupSize: string;
  totalSeats: number; seatsLeft: number | null; rating: number; reviewsCount: number;
  price: number; finalPrice: number; discountPercent: number;
};

const money = (n: number, lang: string) => (lang === 'en' ? `${n.toLocaleString('en-US')} KGS` : `${n.toLocaleString('ru-RU')} сом`);

function readCache(lang: string): ApiTour[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(lang));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function useTours(): Tour[] {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  const [remote, setRemote] = useState<ApiTour[] | null>(() => readCache(lang));
  const lastRaw = useRef('');

  useLivePolling((cancelled) => {
    fetch(`${API_URL}/api/tours?lang=${lang}`, { cache: 'no-cache' })
      .then((r) => r.text())
      .then((text) => {
        if (cancelled()) return;
        const key = lang + '|' + text;
        if (key === lastRaw.current) return; // ничего не изменилось
        const d = JSON.parse(text);
        if (!d.success || !Array.isArray(d.tours)) return;
        lastRaw.current = key;
        try { localStorage.setItem(cacheKey(lang), JSON.stringify(d.tours)); } catch { /* ignore */ }
        setRemote(d.tours);
      })
      .catch(() => {});
  }, [lang]);

  if (!remote) return lang === 'en' ? FALLBACK_TOURS_EN : FALLBACK_TOURS;

  return remote.map((t, i) => ({
    id: i + 1,
    title: t.title,
    photo: t.photo || PLACEHOLDER_PHOTO[t.iconKey] || `https://picsum.photos/seed/tour-${i}/800/600`,
    destination: t.destination,
    description: t.description,
    about: t.about || t.description,
    duration: t.duration,
    difficultyKey: t.difficultyKey,
    difficulty: t.difficulty,
    icon: ICONS[t.iconKey] ?? RiCompassLine,
    price: money(t.finalPrice, lang),
    oldPrice: t.discountPercent > 0 ? money(t.price, lang) : undefined,
    discountPercent: t.discountPercent || undefined,
    highlights: t.highlights,
    itinerary: t.itinerary,
    included: t.included,
    groupSize: t.groupSize,
    totalSeats: t.totalSeats,
    seatsLeft: t.seatsLeft,
    rating: t.rating,
    reviewsCount: t.reviewsCount,
  }));
}