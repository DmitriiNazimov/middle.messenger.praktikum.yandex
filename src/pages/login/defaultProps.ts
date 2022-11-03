// eslint-disable-next-line import/prefer-default-export
export const data: FormProps = {
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
