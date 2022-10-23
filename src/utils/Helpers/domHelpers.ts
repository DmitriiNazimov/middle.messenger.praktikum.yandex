/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { SELECTORS } from '../../consts';

enum NoticeSelectors {
  error = 'notice-error',
  success = 'notice-success'
}

export function addNotice(text: string = 'Возникла ошибка', type: string = 'error') {
  const notice = document.createElement('div');
  notice.textContent = text;

  const noticeSelector = NoticeSelectors[type as keyof typeof NoticeSelectors];
  notice.classList.add('notice', noticeSelector);

  notice.addEventListener('click', () => {
    noticeRemove(notice);
  });

  setTimeout(() => {
    noticeRemove(notice);
  }, 3500);

  document.getElementsByClassName('notice-wrapper')[0].append(notice);
}

function noticeRemove(notice: HTMLElement) {
  notice.classList.add('notice-remove');
  setTimeout(() => {
    notice.remove();
  }, 600);
}

export function formIsValid(form: HTMLFormElement) {
  return form.querySelectorAll(`.${SELECTORS.INPUT_ERROR_LIST}`)?.length === 0;
}

export function loaderToggle({ show = false } = {}) {
  const loader = document.querySelector('.loader__wrapper');

  if (show) {
    loader?.classList.remove('hide');
    return;
  }

  loader?.classList.add('hide');
}
