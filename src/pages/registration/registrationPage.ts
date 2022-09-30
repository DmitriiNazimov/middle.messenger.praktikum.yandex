/* eslint-disable import/prefer-default-export */
import '../../styles.css';

import Block from '../../utils/Block';
import '../../components/logo/logo.tmp';

export const data: object = {
  header: 'Регистрация',
  inputs: [
    {
      title: 'Email',
      type: 'email',
      id: 'email',
      placeholder: 'ivan@mail.ru',
      required: true,
    },
    {
      title: 'Логин',
      type: 'text',
      id: 'login',
      placeholder: 'ivanIvanov',
      required: true,
    },
    {
      title: 'Имя',
      type: 'text',
      id: 'first_name',
      placeholder: 'Иван',
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      id: 'second_name',
      placeholder: 'Иванов',
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      id: 'phone',
      placeholder: '+7 999 777 55 22',
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      id: 'password',
      placeholder: 'Латинские буквы и цифры',
      required: true,
    },
    {
      title: 'Пароль (ещё раз)',
      type: 'password',
      id: 'passwordAgain',
      placeholder: 'Латинские буквы и цифры',
      required: true,
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Зарегистрироваться',
      link: './chats.html',
    },
    {
      typeEmpty: true,
      text: 'Вход',
      link: './login.html',
    },
  ],
};

export class RegistrationPage extends Block {
  constructor() {
    super(data);
  }

  render() {
    document.title = 'Регистрация';

    return `
    <main>
      {{> logo}} 
      {{{ Form 
          header="{{header}}" 
          inputs=inputs 
          buttons=buttons 
      }}}
    </main>
    `;
  }
}
