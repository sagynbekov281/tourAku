# TourCo — Frontend

React + TypeScript + Tailwind, тот же стек, что и у IhsanAcademy, только под тур-компанию, светлая зелёно-бело-синяя тема.

## Быстрый старт

```bash
cd tour-agency-frontend
npm install
cp .env.example .env
npm run dev
```

Открой `http://localhost:5173`. По умолчанию `VITE_API_URL=http://localhost:5000` — запусти рядом `tour-agency-backend` (см. его README), иначе сайт покажет запасные данные (6 туров, 3 гида), зашитые в `src/data.ts`, и форма бронирования не будет реально отправляться.

## Структура

```
src/
├── components/  Navbar, Footer, AnimSection, ScrollToTop
├── hooks/       useTours.ts, useGuides.ts — берут данные из backend, с запасным fallback
├── pages/       HomePage, ToursPage, GuidesPage, ContactPage
├── data.ts      запасные данные и типы Tour/Guide
├── App.tsx      роутинг
└── index.css    цвета, шрифты, поведение на мобильных
```

## Цвета

Акценты: зелёный `#16A34A` (главный), синий `#2563EB` (вторичный — языки гидов, часть иконок), фон белый, текст тёмно-серый `#0F172A`. Поменять можно точечно через классы Tailwind вида `bg-[#16A34A]`, `text-[#2563EB]` — они разбросаны по файлам в `src/pages` и `src/components`.

## Что дальше

- Страница `/tours` берёт список туров с `GET /api/tours`, `/guides` — с `GET /api/guides`. Если backend недоступен, используются данные из `src/data.ts`.
- Бронирование (`/contact`) отправляет `POST /api/bookings`, дальше — экран ввода SMS-кода (если включена проверка на backend) и подтверждение.
- Фото туров/гидов сейчас нет — везде иконки и инициалы. Если нужны фотографии, это отдельная доработка (хранение файлов, загрузка через админку).
