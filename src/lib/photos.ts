// Подбор фото под место тура. Файлы лежат в public/photos/ — просто замените их своими.
const PLACES: [string[], string][] = [
  [['иссык', 'issyk', 'чолпон', 'cholpon'], '/photos/issyk-kul.jpg'],
  [['ала-арча', 'ала арча', 'ala-archa', 'ala archa'], '/photos/ala-archa.jpg'],
  [['сон-кол', 'сон кол', 'song-kol', 'song kol'], '/photos/song-kol.jpg'],
  [['каракол', 'karakol', 'джети', 'jeti'], '/photos/karakol.jpg'],
  [['сказк', 'skazka', 'fairy'], '/photos/skazka.jpg'],
];
export const HERO_PHOTO = '/kalachov_k._ala_too.jpg.webp';
const DEFAULT_TOUR_PHOTO = '/photo_2026-10-09_23-39-50.jpg';

export function tourPhoto(tour: { title?: string; destination?: string; photo?: string }): string {
  if (tour.photo) return tour.photo;
  const text = `${tour.title ?? ''} ${tour.destination ?? ''}`.toLowerCase();
  for (const [keys, file] of PLACES) if (keys.some((k) => text.includes(k))) return file;
  return DEFAULT_TOUR_PHOTO;
}
