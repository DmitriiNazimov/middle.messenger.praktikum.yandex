import '../../styles.css';

import Block from '../../utils/Block';

type Props = {
  header: string,
  inputs: {
    title: string,
    type: string,
    id: string,
    placeholder?: string,
    value?: string,
    required?: boolean
    inputHeader?: string,
  }[],
  buttons: {
    typeFull: boolean,
    text: string,
    link: string
  }[]
};

export const data: Props = {
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
      link: './chats',
    },
    {
      typeFull: false,
      text: 'Вход',
      link: './login',
    },
  ],
};

export default class RegistrationPage extends Block<Props> {
  constructor() {
    super(data);
  }

  render() {
    document.title = 'Регистрация';

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
