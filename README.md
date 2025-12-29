<h1 style="font-size: 48px; margin: 0;">ПРОЕКТ НАХОДИТСЯ В РАЗРАБОТКЕ</h1>

Shop-Co — учебный и демонстрационный фронтенд‑проект интернет‑магазина. Цель — собрать современный интерфейс e‑commerce, показать работу с маршрутизацией, состоянием, анимациями и адаптивной версткой, а также зафиксировать понятную структуру компонентов.
<p>
  <img src="https://img.shields.io/badge/React-F59E0B?style=for-the-badge&logo=react&logoColor=0EA5E9" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=0B1020" />
  <img src="https://img.shields.io/badge/Framer%20Motion-FF0080?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Swiper-0B2748?style=for-the-badge&logo=swiper&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=1F2937" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
</p>

## Описание проекта
Проект представляет собой SPA на React с навигацией между разделами каталога и страницей товара. Данные о товарах и состоянии приложения управляются через Redux Toolkit. Для визуальной части используются Tailwind CSS, слайдеры на Swiper и анимации на Framer Motion. Сборка и разработка выполняются через Vite.

## Технологии
- React 19
- Vite
- React Router
- Redux Toolkit + React Redux
- Tailwind CSS
- Framer Motion
- Swiper

## Возможности
- Навигация по разделам магазина
- Отображение карточек товаров и страницы товара
- Базовое управление состоянием
- Анимации и слайдеры
- Адаптивная верстка
- Настроен CI/CD для автоматической проверки и сборки

## Запуск проекта
Установка зависимостей:
```bash
npm install
```

Запуск dev‑сервера:
```bash
npm run dev
```

Сборка:
```bash
npm run build
```

Локальный просмотр сборки:
```bash
npm run preview
```

## Скрипты
- `dev` — запуск разработки
- `build` — production‑сборка
- `build:local` — сборка с относительным `base`
- `preview` — просмотр сборки через Vite
- `preview:local` — просмотр `dist` через `serve`
- `lint` — проверка ESLint
- `deploy` — публикация в GitHub Pages

## Структура
- `src/components` — UI‑компоненты
- `src/pages` — страницы приложения
- `src/store` — состояние и слайсы Redux

## Статус
Проект находится в активной разработке. Функциональность и структура могут меняться.
