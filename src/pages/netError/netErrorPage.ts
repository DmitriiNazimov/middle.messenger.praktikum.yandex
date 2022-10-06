import '../../styles.css';
import './netError.css';

import Block from '../../utils/Block';

type Props = {
  code: string,
  message: string,
  url: string,
  linkText: string,
};

export const data404: Props = {
  code: '404',
  message: 'Не туда попали',
  url: '/',
  linkText: 'На главную',
};

export const data500: object = {
  code: '500',
  message: 'Мы уже чиним',
  url: '/',
  linkText: 'На главную',
};

export class NetErrorPage extends Block<Props> {
  render() {
    document.title = `Easy Touch - ошибка ${this.props.code}`;

    return `
    <main>
    {{{ Logo }}}
    <div class="web-error">
        <p class="web-error__paragraph web-error__header">{{ code }}</p>
        <p class="web-error__paragraph web-error__msg">{{ message }}</p>
        <p class="web-error__paragraph web-error__link">
            <a href="{{ url }}" class="button button__empty">{{ linkText }}</a>
        </p>
    </div>
    </main>
    `;
  }
}
