import { SignUp } from '../../api';
import { authController } from '../../controllers';
import '../../styles.css';

import { Block } from '../../utils';
import { formIsValid } from '../../utils/Helpers/viewHelpers';

export const data: FormProps = {
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
      link: './messenger',
    },
    {
      typeFull: false,
      text: 'Вход',
      link: './sign-in',
    },
  ],
};

export default class RegistrationPage extends Block<FormProps> {
  constructor() {
    super({
      ...data,
      events: { submit: (event: Event) => this.submitHandler(event) },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  submitHandler(event: Event) {
    const form = event.target;
    if (form instanceof HTMLFormElement && formIsValid(form)) {
      const formData = Object.fromEntries(new FormData(form)) as SignUp;
      authController.signUp(formData);
    }
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
