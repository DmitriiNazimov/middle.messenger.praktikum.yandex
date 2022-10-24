import { PATH, SELECTOR } from '../../consts';

export type Props = FormProps & { avatarPath: string };

export type propsUpdate = {
  inputs: Props['inputs'];
  header: string;
  avatarPath: string;
};

export const data: Props = {
  header: ' ', // При пустой строке '' выводит некрасивую заглушку на странице {{header}}.
  avatarPath: PATH.defaultAvatar,
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
      placeholder: 'Логин',
      required: true,
    },
    {
      title: 'Имя',
      type: 'text',
      id: 'first_name',
      placeholder: 'Имя',
    },
    {
      title: 'Фамилия',
      type: 'text',
      id: 'second_name',
      placeholder: 'Фамилия',
    },
    {
      title: 'Имя в чате',
      type: 'text',
      id: 'display_name',
      placeholder: 'Имя в чате',
    },
    {
      title: 'Телефон',
      type: 'tel',
      id: 'phone',
      placeholder: 'ivanIvanov',
    },
    {
      inputHeader: 'Если хотите поменять пароль:',
      title: 'Текущий пароль',
      type: 'password',
      id: 'oldPassword',
      placeholder: 'Старый пароль',
    },
    {
      title: 'Новый пароль',
      type: 'password',
      id: 'newPassword',
      placeholder: 'Новый пароль',
    },
    {
      inputHeader: 'Если хотите поменять аватар:',
      title: 'Фото',
      type: 'file',
      id: 'avatar',
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Сохранить изменения',
      link: './messenger',
    },
    {
      typeFull: false,
      text: 'Выйти из аккаунта',
      link: './',
      id: SELECTOR.logoutBtn,
    },
  ],
};
