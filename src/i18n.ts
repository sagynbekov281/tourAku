import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';
import en from './locales/en.json';

const saved = (typeof window !== 'undefined' && localStorage.getItem('tourco_lang')) || 'ru';

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, en: { translation: en } },
  lng: saved,
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export function setLanguage(lang: 'ru' | 'en') {
  i18n.changeLanguage(lang);
  try { localStorage.setItem('tourco_lang', lang); } catch { /* ignore */ }
}

export default i18n;
