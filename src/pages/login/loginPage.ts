/* eslint-disable import/prefer-default-export */
import '../../styles.css';

import Block from '../../utils/Block';

export const data: object = {
  header: 'Вход',
  inputs: [
    {
      title: 'Логин',
      type: 'login',
      id: 'login',
      placeholder: 'ivanIvanov',
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      id: 'password',
      placeholder: 'Латинские буквы и цифры',
      required: true,
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Войти',
      link: './chats.html',
    },
    {
      typeFull: false,
      text: 'Ещё не зарегистрированы?',
      link: './registration.html',
    },
  ],
};

export class LoginPage extends Block {
  constructor() {
    super(data);
  }

  render() {
    document.title = 'Авторизация';

    return `
    <main>
      {{{ Logo }}} 
      {{{ Form 
          header="{{header}}" 
          inputs=inputs 
          buttons=buttons 
      }}}
    </main>
    `;
  }
}
