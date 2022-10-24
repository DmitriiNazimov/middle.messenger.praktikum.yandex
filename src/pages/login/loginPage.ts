import '../../styles.css';
import { authController } from '../../controllers';
import { formIsValid } from '../../utils/Helpers/domHelpers';
import { Block } from '../../utils';
import { SignIn } from '../../api';

type Props = {
  header: string;
  inputs: {
    title: string;
    type: string;
    id: string;
    placeholder: string;
    required: boolean;
  }[];
  buttons: {
    typeFull: boolean;
    text: string;
    link: string;
  }[];
  events?: {};
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
    super({
      ...data,
      events: { submit: (event: Event) => this.submitHandler(event) },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  submitHandler(event: Event) {
    const form = event.target;

    if (form instanceof HTMLFormElement && formIsValid(form)) {
      const formData = Object.fromEntries(new FormData(form)) as SignIn;
      authController.signIn(formData);
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
