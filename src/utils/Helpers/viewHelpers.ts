/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { SELECTOR } from '../../consts';

export enum NoticeSelectors {
  error = 'notice-error',
  success = 'notice-success',
  wrapper = 'notice-wrapper',
  remove = 'notice-remove',
}

// Показываем уведомление об успешной операции или провале.
export function addNotice(text: string = 'Возникла ошибка', type: string = 'error') {
  const notice = document.createElement('div');
  const noticeSelector = NoticeSelectors[type as keyof typeof NoticeSelectors];

  notice.classList.add('notice', noticeSelector);

  notice.textContent = text;

  notice.addEventListener('click', () => {
    noticeRemove(notice);
  });

  setTimeout(() => {
    noticeRemove(notice);
  }, 3500);

  document.getElementsByClassName(NoticeSelectors.wrapper)[0].append(notice);
}

// Эффект скрытия уведомления
function noticeRemove(notice: HTMLElement) {
  notice.classList.add(NoticeSelectors.remove);
  setTimeout(() => {
    notice.remove();
  }, 600);
}

// Если в форме нет элементов вывода ошибки - она прошла валидацию.
export function formIsValid(form: HTMLFormElement) {
  return form.querySelectorAll(`.${SELECTOR.input.errorList}`)?.length === 0;
}

// "Крутилка" на время выполнения запроса к серверу.
export function loaderToggle({ show = false, timer = false } = {}) {
  const loader = document.querySelector(`.${SELECTOR.loader.wrapper}`);

  // Отключаем лоудер по таймеру
  if (timer) {
    setTimeout(() => {
      loader?.classList.add('hide');
    }, 200);
  }

  // Включам лоудер
  if (show) {
    loader?.classList.remove('hide');
    return;
  }

  // Отключаем лоудер по вызову функции без аргументов
  // Задержка чтобы компоненты успели перерендериться и пользователю это было незаметно
  setTimeout(() => {
    loader?.classList.add('hide');
  }, 200);
}

// Вывод даты последнего сообщения в списке чатов.
export function getLastMessageDate(chat: Chat): string {
  if (!chat.last_message) {
    return '';
  }

  const messageTime = new Date(chat.last_message.time) as unknown as number;
  const currentTime = Date.now();
  const hours24 = 24 * 60 * 60 * 1000;

  if (currentTime - messageTime > hours24) {
    return new Date(chat.last_message.time).toLocaleDateString('ru-RU', { weekday: 'short' });
  }

  return new Date(chat.last_message.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Переключает видимость элемента на странице (скрывает/показывает)
export function toggle(elem: HTMLElement | string) {
  let node = elem as HTMLElement;

  if (typeof elem === 'string') {
    node = document.querySelector(elem) as HTMLElement;
  }

  if (node.classList.contains('hide')) {
    node.classList.remove('hide');
    return;
  }
  node.classList.add('hide');
}

export function trimLongString(str: string, num: number): string {
  if (str.length >= num) {
    return `${str.slice(0, num).trim()}...`;
  }

  return str;
}
