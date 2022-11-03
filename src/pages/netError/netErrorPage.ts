import '../../styles.css';
import './netError.css';

import Block from '../../utils/Rendering/Block';
import { router } from '../../utils';

type Props = {
  code: string;
  message: string;
  url: string;
  linkText: string;
  events?: Record<string, unknown>;
};

export const data401: Props = {
  code: 'Нет доступа',
  message: 'Требуется авторизация',
  url: '/',
  linkText: 'Назад',
};

export const data404: Props = {
  code: '404',
  message: 'Не туда попали',
  url: '/',
  linkText: 'Назад',
};

export const data500: Props = {
  code: '500',
  message: 'Мы уже чиним',
  url: '/',
  linkText: 'Назад',
};

export class NetErrorPage extends Block<Props> {
  constructor(data: Props) {
    super({
      ...data,
      events: { click: (event: Event) => this.clickHandler(event) },
    });
  }

  clickHandler(event: Event) {
    const target = event.target as HTMLElement;

    if (target.id === 'navigate-back') {
      event.preventDefault();
      router.back();
    }
  }

  render() {
    return `
    <main>
    {{{ Logo }}}
    <div class="web-error">
        <p class="web-error__paragraph web-error__header">{{ code }}</p>
        <p class="web-error__paragraph web-error__msg">{{ message }}</p>
        <p class="web-error__paragraph web-error__link">
            <a href="{{ url }}" id="navigate-back" class="button button__empty">{{ linkText }}</a>
        </p>
    </div>
    </main>
    `;
  }
}
