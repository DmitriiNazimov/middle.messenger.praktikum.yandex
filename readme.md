# Проект от Яндекс.Практикум

Учебный проект веб-мессенджера на курсе middle frontend developer от Yandex Practicum

## Демо проекта:

Netlify:
https://effortless-nougat-339a5d.netlify.app/

Heroku:
https://easytouch.herokuapp.com/

Тестовые данные:

- Логин: Ivan
- Пароль: qwerty585Q

## Команды:

- `npm install` - установка зависимостей.

- `npm run start` - команда для сборки и запуска на порту 3000.
- `npm run dev` - сборка и запуск версии для разработчика.
- `npm run build` - сборка.

- `npm run lint` - запуск проверки линтерами.
- `npm run test` - запуск тестов.

## Стэк технологий:

- JavaScript, TypeScript
- PostCSS
- NodeJS + Express
- Handlebars
- ESlint, Stylelint
- WebPack
- Docker
- Jest
- Husky

## UI:

Визуальный прототип доступен в Figma: https://www.figma.com/file/8DmrTWKCiSKpiAVycxEJCw/EasyTouch?node-id=0%3A1

## Реализованные задачи:

1. Настройка сборки проекта: Docker, WebPack, PostCSS, Handlebars, NodeJS + Express.
2. Внедрен статический анализ кода: eslint, stylelint.
3. Дизайн-макет в Figma.
4. Верстка макета (адаптированная под мобильные устройства).
5. Реализован динамический рендеринг страниц на стороне клиента по принципу SPA-приложения с применением паттерна "Медиатор" и архитектуры MVC. Проект разбит на независимые компоненты.
6. Создан механизм валидации полей форм.
7. Реализован роутинг.
8. Реализовано API для связи с сервером. В том числе: регистрация, авторизация, работа с чатами, редактирование данных пользователя.
9. Реализовано хранилище состояния проекта - Store.
10. Подключен WebSocket для работы с real-time сообщениями в чате.
11. Реализован собственный аналог fetch через XMLHttpRequest для запросов на сервер.
12. Проект защищен от XSS атак, в том числе благодаря внедрению Content-Security-Policy.
13. Проект покрыт тестами наиболее критичного функционала.
