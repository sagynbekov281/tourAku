import type { IconType } from 'react-icons';
import { RiLandscapeLine, RiWaterFlashLine, RiTentLine, RiRoadsterLine, RiSnowyLine, RiPlantLine } from 'react-icons/ri';

export type DifficultyKey = 'easy' | 'medium' | 'hard';

export type Tour = {
  id: number;
  title: string;
  destination: string;
  description: string;
  about: string;
  duration: string;
  difficultyKey: DifficultyKey;
  difficulty: string;
  icon: IconType;
  photo: string;
  price: string;
  oldPrice?: string;
  discountPercent?: number;
  highlights: string[];
  itinerary: string[];
  included: string[];
  groupSize: string;
  totalSeats?: number;
  seatsLeft?: number | null;
  rating: number;
  reviewsCount: number;
};

export type Guide = {
  id: number;
  name: string;
  role: string;
  experience: string;
  languages: string[];
  regions: string[];
  bio: string;
  initials: string;
};

const DIFFICULTY_LABELS: Record<DifficultyKey, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

// Запасные данные — показываются, пока backend недоступен или база пуста.
export const FALLBACK_TOURS: Tour[] = [
  {
    id: 1,
    title: 'Озеро Иссык-Куль',
    photo: 'https://picsum.photos/seed/issykkul-lake/800/600',
    totalSeats: 20,
    seatsLeft: 7,
    destination: 'Иссык-Кульская область',
    description: 'Классический тур на самое большое озеро Кыргызстана с купанием и пляжным отдыхом.',
    about: 'Трёхдневная поездка на южное побережье Иссык-Куля: пляжи, горячие источники и виды на хребет Тескей Ала-Тоо.',
    duration: '3 дня / 2 ночи',
    difficultyKey: 'easy',
    difficulty: DIFFICULTY_LABELS.easy,
    icon: RiWaterFlashLine,
    price: '9 500 сом',
    highlights: ['Пляжный отдых', 'Горячие источники', 'Фото-точки'],
    itinerary: ['День 1: выезд из Бишкека, заселение, пляж', 'День 2: горячие источники, прогулка по побережью', 'День 3: свободное время, возвращение'],
    included: ['Транспорт', 'Проживание', 'Завтраки'],
    groupSize: 'до 16 человек',
    rating: 4.8,
    reviewsCount: 132,
  },
  {
    id: 2,
    title: 'Ущелье Ала-Арча',
    photo: 'https://picsum.photos/seed/ala-archa-gorge/800/600',
    totalSeats: 14,
    seatsLeft: 3,
    destination: 'Чуйская область',
    description: 'Однодневный горный поход рядом с Бишкеком с видами на ледники.',
    about: 'Национальный парк Ала-Арча — популярное место для однодневных походов в получасе от Бишкека, с маршрутами разной сложности.',
    duration: '1 день',
    difficultyKey: 'medium',
    difficulty: DIFFICULTY_LABELS.medium,
    icon: RiLandscapeLine,
    price: '2 800 сом',
    highlights: ['Горный воздух', 'Ледники', 'Один день'],
    itinerary: ['Утро: выезд из Бишкека', 'День: пеший маршрут по ущелью', 'Вечер: возвращение в город'],
    included: ['Транспорт', 'Гид', 'Обед'],
    groupSize: 'до 12 человек',
    rating: 4.9,
    reviewsCount: 210,
  },
  {
    id: 3,
    title: 'Джайлоо и юрточный лагерь',
    photo: 'https://picsum.photos/seed/yurt-camp/800/600',
    totalSeats: 12,
    seatsLeft: 12,
    destination: 'Нарынская область',
    description: 'Ночёвка в юртах на высокогорном пастбище с местной кухней.',
    about: 'Погружение в кочевую культуру: ночёвка в настоящей юрте, катание на лошадях и традиционная кухня.',
    duration: '2 дня / 1 ночь',
    difficultyKey: 'medium',
    difficulty: DIFFICULTY_LABELS.medium,
    icon: RiTentLine,
    price: '7 200 сом',
    highlights: ['Ночь в юрте', 'Катание на лошадях', 'Местная кухня'],
    itinerary: ['День 1: выезд, катание на лошадях, ужин у костра', 'День 2: рассвет в горах, возвращение'],
    included: ['Транспорт', 'Проживание в юрте', 'Питание'],
    groupSize: 'до 10 человек',
    rating: 4.7,
    reviewsCount: 88,
  },
  {
    id: 4,
    title: 'Перевал Тоссор',
    photo: 'https://picsum.photos/seed/tossor-pass/800/600',
    totalSeats: 6,
    seatsLeft: 1,
    destination: 'Иссык-Кульская область',
    description: 'Внедорожный маршрут через высокогорный перевал.',
    about: 'Насыщенный день на внедорожниках через один из самых живописных перевалов региона.',
    duration: '1 день',
    difficultyKey: 'hard',
    difficulty: DIFFICULTY_LABELS.hard,
    icon: RiRoadsterLine,
    price: '4 500 сом',
    highlights: ['Внедорожник', 'Панорамные виды', 'Активный день'],
    itinerary: ['Утро: выезд из Каракола', 'День: подъём на перевал, фото-остановки', 'Вечер: возвращение'],
    included: ['Внедорожник с водителем', 'Обед', 'Аптечка'],
    groupSize: 'до 6 человек',
    rating: 4.6,
    reviewsCount: 54,
  },
  {
    id: 5,
    title: 'Зимний Каракол',
    photo: 'https://picsum.photos/seed/karakol-winter/800/600',
    totalSeats: 16,
    seatsLeft: 9,
    destination: 'Иссык-Кульская область',
    description: 'Горнолыжный уикенд на курорте Каракол.',
    about: 'Два дня катания на горнолыжном курорте с видом на Терскей Ала-Тоо, для любого уровня подготовки.',
    duration: '2 дня / 1 ночь',
    difficultyKey: 'medium',
    difficulty: DIFFICULTY_LABELS.medium,
    icon: RiSnowyLine,
    price: '11 000 сом',
    highlights: ['Горные лыжи', 'Прокат снаряжения', 'Отель у склона'],
    itinerary: ['День 1: заезд, катание', 'День 2: катание, отъезд'],
    included: ['Проживание', 'Ски-пасс на 1 день', 'Трансфер'],
    groupSize: 'до 14 человек',
    rating: 4.8,
    reviewsCount: 97,
  },
  {
    id: 6,
    title: 'Долина Сары-Челек',
    photo: 'https://picsum.photos/seed/sary-chelek/800/600',
    totalSeats: 10,
    seatsLeft: 0,
    destination: 'Джалал-Абадская область',
    description: 'Поход к заповедному озеру среди ореховых лесов.',
    about: 'Заповедник Сары-Челек — объект ЮНЕСКО с уникальной экосистемой и живописным горным озером.',
    duration: '3 дня / 2 ночи',
    difficultyKey: 'hard',
    difficulty: DIFFICULTY_LABELS.hard,
    icon: RiPlantLine,
    price: '13 500 сом',
    highlights: ['Заповедник ЮНЕСКО', 'Ореховые леса', 'Треккинг'],
    itinerary: ['День 1: выезд, заселение', 'День 2: треккинг к озеру', 'День 3: возвращение'],
    included: ['Транспорт', 'Проживание', 'Гид-натуралист'],
    groupSize: 'до 10 человек',
    rating: 4.9,
    reviewsCount: 41,
  },
];

export const FALLBACK_GUIDES: Guide[] = [
  { id: 1, name: 'Нурлан Асанов', role: 'Старший гид', experience: '10+ лет опыта', languages: ['Русский', 'Кыргызский', 'Английский'], regions: ['Иссык-Куль', 'Тянь-Шань'], bio: 'Ведёт горные маршруты уже больше десяти лет, знает регион как свои пять пальцев.', initials: 'НА' },
  { id: 2, name: 'Айгуль Жумабекова', role: 'Гид-натуралист', experience: '6+ лет опыта', languages: ['Русский', 'Английский'], regions: ['Сары-Челек', 'Нарын'], bio: 'Специализируется на заповедных территориях и экологических маршрутах.', initials: 'АЖ' },
  { id: 3, name: 'Бакыт Эсенов', role: 'Инструктор по треккингу', experience: '8+ лет опыта', languages: ['Кыргызский', 'Русский'], regions: ['Ала-Арча', 'Каракол'], bio: 'Сертифицированный инструктор, водит группы любого уровня подготовки.', initials: 'БЭ' },
];

export const FALLBACK_TOURS_EN: Tour[] = [
  {
    id: 1, title: 'Lake Issyk-Kul', destination: 'Issyk-Kul region',
    description: 'A classic trip to the largest lake in Kyrgyzstan, with swimming and beach time.',
    about: 'A three-day trip to the southern shore of Issyk-Kul: beaches, hot springs and views of the Teskey Ala-Too range.',
    duration: '3 days / 2 nights', difficultyKey: 'easy', difficulty: DIFFICULTY_LABELS.easy, icon: RiWaterFlashLine,
    photo: 'https://picsum.photos/seed/issykkul-lake/800/600', totalSeats: 20, seatsLeft: 7,
    price: '9,500 KGS',
    highlights: ['Beach time', 'Hot springs', 'Photo spots'],
    itinerary: ['Day 1: depart Bishkek, check-in, beach', 'Day 2: hot springs, shoreline walk', 'Day 3: free time, return'],
    included: ['Transport', 'Accommodation', 'Breakfast'], groupSize: 'up to 16 people', rating: 4.8, reviewsCount: 132,
  },
  {
    id: 2, title: 'Ala-Archa Gorge', destination: 'Chuy region',
    description: 'A one-day mountain hike near Bishkek with glacier views.',
    about: 'Ala-Archa National Park is a popular spot for day hikes just half an hour from Bishkek, with routes of varying difficulty.',
    duration: '1 day', difficultyKey: 'medium', difficulty: DIFFICULTY_LABELS.medium, icon: RiLandscapeLine,
    photo: 'https://picsum.photos/seed/ala-archa-gorge/800/600', totalSeats: 14, seatsLeft: 3,
    price: '2,800 KGS',
    highlights: ['Mountain air', 'Glaciers', 'One-day trip'],
    itinerary: ['Morning: depart Bishkek', 'Day: hike through the gorge', 'Evening: return to the city'],
    included: ['Transport', 'Guide', 'Lunch'], groupSize: 'up to 12 people', rating: 4.9, reviewsCount: 210,
  },
  {
    id: 3, title: 'Jailoo & Yurt Camp', destination: 'Naryn region',
    description: 'An overnight stay in yurts on a high-altitude pasture, with local cuisine.',
    about: 'An immersion into nomadic culture: a night in a real yurt, horseback riding and traditional food.',
    duration: '2 days / 1 night', difficultyKey: 'medium', difficulty: DIFFICULTY_LABELS.medium, icon: RiTentLine,
    photo: 'https://picsum.photos/seed/yurt-camp/800/600', totalSeats: 12, seatsLeft: 12,
    price: '7,200 KGS',
    highlights: ['Night in a yurt', 'Horseback riding', 'Local cuisine'],
    itinerary: ['Day 1: depart, horseback riding, campfire dinner', 'Day 2: mountain sunrise, return'],
    included: ['Transport', 'Yurt stay', 'Meals'], groupSize: 'up to 10 people', rating: 4.7, reviewsCount: 88,
  },
  {
    id: 4, title: 'Tossor Pass', destination: 'Issyk-Kul region',
    description: 'An off-road route over a high-altitude mountain pass.',
    about: 'A packed day in 4x4 vehicles through one of the most scenic passes in the region.',
    duration: '1 day', difficultyKey: 'hard', difficulty: DIFFICULTY_LABELS.hard, icon: RiRoadsterLine,
    photo: 'https://picsum.photos/seed/tossor-pass/800/600', totalSeats: 6, seatsLeft: 1,
    price: '4,500 KGS',
    highlights: ['4x4 vehicle', 'Panoramic views', 'Active day'],
    itinerary: ['Morning: depart Karakol', 'Day: climb to the pass, photo stops', 'Evening: return'],
    included: ['4x4 with driver', 'Lunch', 'First-aid kit'], groupSize: 'up to 6 people', rating: 4.6, reviewsCount: 54,
  },
  {
    id: 5, title: 'Winter Karakol', destination: 'Issyk-Kul region',
    description: 'A ski weekend at the Karakol resort.',
    about: 'Two days of skiing at a resort with views of the Terskey Ala-Too range, suitable for any skill level.',
    duration: '2 days / 1 night', difficultyKey: 'medium', difficulty: DIFFICULTY_LABELS.medium, icon: RiSnowyLine,
    photo: 'https://picsum.photos/seed/karakol-winter/800/600', totalSeats: 16, seatsLeft: 9,
    price: '11,000 KGS',
    highlights: ['Skiing', 'Gear rental', 'Hotel at the slope'],
    itinerary: ['Day 1: arrival, skiing', 'Day 2: skiing, departure'],
    included: ['Accommodation', '1-day ski pass', 'Transfer'], groupSize: 'up to 14 people', rating: 4.8, reviewsCount: 97,
  },
  {
    id: 6, title: 'Sary-Chelek Valley', destination: 'Jalal-Abad region',
    description: 'A hike to a protected lake set among walnut forests.',
    about: 'Sary-Chelek Reserve is a UNESCO site with a unique ecosystem and a scenic mountain lake.',
    duration: '3 days / 2 nights', difficultyKey: 'hard', difficulty: DIFFICULTY_LABELS.hard, icon: RiPlantLine,
    photo: 'https://picsum.photos/seed/sary-chelek/800/600', totalSeats: 10, seatsLeft: 0,
    price: '13,500 KGS',
    highlights: ['UNESCO reserve', 'Walnut forests', 'Trekking'],
    itinerary: ['Day 1: depart, check-in', 'Day 2: trek to the lake', 'Day 3: return'],
    included: ['Transport', 'Accommodation', 'Naturalist guide'], groupSize: 'up to 10 people', rating: 4.9, reviewsCount: 41,
  },
];

export const FALLBACK_GUIDES_EN: Guide[] = [
  { id: 1, name: 'Nurlan Asanov', role: 'Senior Guide', experience: '10+ years of experience', languages: ['Russian', 'Kyrgyz', 'English'], regions: ['Issyk-Kul', 'Tian Shan'], bio: 'Has been leading mountain routes for over ten years and knows the region inside out.', initials: 'NA' },
  { id: 2, name: 'Aigul Zhumabekova', role: 'Naturalist Guide', experience: '6+ years of experience', languages: ['Russian', 'English'], regions: ['Sary-Chelek', 'Naryn'], bio: 'Specializes in protected areas and ecological routes.', initials: 'AZ' },
  { id: 3, name: 'Bakyt Esenov', role: 'Trekking Instructor', experience: '8+ years of experience', languages: ['Kyrgyz', 'Russian'], regions: ['Ala-Archa', 'Karakol'], bio: 'A certified instructor who leads groups of any fitness level.', initials: 'BE' },
];
