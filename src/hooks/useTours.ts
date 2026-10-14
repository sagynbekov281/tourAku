import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiLandscapeLine, RiWaterFlashLine, RiTentLine, RiRoadsterLine, RiSnowyLine, RiPlantLine, RiCompassLine } from 'react-icons/ri';
import type { IconType } from 'react-icons';
import type { Tour } from '../data';
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

const money = (n: number, lang: string) =>
  lang === 'en' ? `${n.toLocaleString('en-US')} KGS` : `${n.toLocaleString('ru-RU')} сом`;

function readCache(lang: string): ApiTour[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(lang));
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Возвращает туры + состояние загрузки.
 * Запасных (fake) туров больше нет: пока данных нет, tours = [], loading = true.
 * Если в кэше браузера что-то есть, оно показывается мгновенно (loading = false).
 */
export function useToursState() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  const [remote, setRemote] = useState<ApiTour[] | null>(() => readCache(lang));
  const [failed, setFailed] = useState(false);
  const lastRaw = useRef('');
  const fails = useRef(0);

  // При смене языка берём кэш этого языка
  useEffect(() => {
    lastRaw.current = '';
    fails.current = 0;
    setFailed(false);
    setRemote(readCache(lang));
  }, [lang]);

  useLivePolling((cancelled) => {
    fetch(`${API_URL}/api/tours?lang=${lang}`, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((text) => {
        if (cancelled()) return;
        const key = lang + '|' + text;
        if (key === lastRaw.current) return; // ничего не изменилось
        const d = JSON.parse(text);
        if (!d.success || !Array.isArray(d.tours)) throw new Error('bad response');
        lastRaw.current = key;
        fails.current = 0;
        setFailed(false);
        try { localStorage.setItem(cacheKey(lang), JSON.stringify(d.tours)); } catch { /* ignore */ }
        setRemote(d.tours);
      })
      .catch(() => {
        if (cancelled()) return;
        fails.current += 1;
        if (fails.current >= 3) setFailed(true);
      });
  }, [lang]);

  const tours: Tour[] = useMemo(
    () =>
      (remote ?? []).map((t, i) => ({
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
      })),
    [remote, lang],
  );

  return {
    tours,
    loading: remote === null && !failed,
    failed: remote === null && failed,
  };
}

/** Старый вариант (только массив), чтобы не сломать другие файлы, где вызывается useTours(). */
export function useTours(): Tour[] {
  return useToursState().tours;
}