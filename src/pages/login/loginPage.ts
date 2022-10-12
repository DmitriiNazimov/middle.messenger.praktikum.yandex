import '../../styles.css';

import { Block } from '../../utils';

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
      link: './messenger',
    },
    {
      typeFull: false,
      text: 'Ещё не зарегистрированы?',
      link: './sign-up',
    },
  ],
};

export default class LoginPage extends Block<Props> {
  constructor() {
    super(data);
  }

  render() {
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
