import '../../styles.css';

import Block from '../../utils/Block';

type Props = {
  header: string,
  inputs: {
    title: string,
    type: string,
    id: string,
    placeholder: string,
    required: boolean
  }[],
  buttons: {
    typeFull: boolean,
    text: string,
    link: string
  }[]
};

export const data: Props = {
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
      link: './chats',
    },
    {
      typeFull: false,
      text: 'Ещё не зарегистрированы?',
      link: './registration',
    },
  ],
};

export default class LoginPage extends Block<Props> {
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
