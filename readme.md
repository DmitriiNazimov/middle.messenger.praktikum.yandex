
# Проект от Яндекс.Практикум

Учебный проект - веб-мессенджер - на курсе middle frontend developer от Yandex Practicum

## Демо проекта:

https://effortless-nougat-339a5d.netlify.app/

## Команды:

- `npm install` - установка зависимостей.
- `npm run start` - команда для сборки и запуска на порту 3000.
- `npm run dev` - сборка и запуск версии для разработчика.
- `npm run build` - сборка.

## Стэк технологий:

- JavaScript, TypeScript
- PostCSS
- NodeJS + Express
- ESlint, Stylelint
- Parcel
- Handlebars

## UI:

Визуальный прототип доступен в Figma: https://www.figma.com/file/8DmrTWKCiSKpiAVycxEJCw/EasyTouch?node-id=0%3A1

## Реализованные задачи:

1. Настройка сборки проекта: Parcel, PostCSS, Handlebars, NodeJS + Express.
2. Внедрен статический анализ кода: eslint, stylelint.
3. Дизайн-макет в Figma.
4. Верстка макета.
5. Реализован динамический рендеринг страниц на стороне клиента по принципу SPA-приложения с применением паттерна "Медиатор" и архитектуры MVC. Проект разбит на независимые компоненты.
6. Создан механизм валидации полей форм.
7. Реализован роутинг.
8. Реализовано API для связи с сервером. В том числе: регистрация, авторизация, работа с чатами, редактирование данных пользователя.
9. Реализовано хранилище состояния проекта Store.
10. Подключен WebSocket для работы с real-time сообщениями в чате.
11. Реализован собственный аналог fetch через XMLHttpRequest.
