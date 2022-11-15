// eslint-disable-next-line import/prefer-default-export
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
