import '../../styles.css';
import './profile.css';

import Block from '../../utils/Block';

const data: object = {
  header: 'Иван',
  avatarPath: '/img/dimon.jpg',
  inputs: [
    {
      title: 'Email',
      type: 'email',
      id: 'email',
      value: 'ivan@mail.ru',
      placeholder: 'ivan@mail.ru',
    },
    {
      title: 'Логин',
      type: 'text',
      id: 'login',
      value: 'ivanIvanov',
      placeholder: 'Логин',
    },
    {
      title: 'Имя',
      type: 'text',
      id: 'first_name',
      value: 'Иван',
      placeholder: 'Имя',
    },
    {
      title: 'Фамилия',
      type: 'text',
      id: 'second_name',
      value: 'Иванов',
      placeholder: 'Фамилия',
    },
    {
      title: 'Имя в чате',
      type: 'text',
      id: 'display_name',
      value: 'Иван Грозный',
      placeholder: 'Имя в чате',
    },
    {
      title: 'Телефон',
      type: 'tel',
      id: 'phone',
      value: '+79886663311',
      placeholder: 'ivanIvanov',
    },
    {
      inputHeader: 'Если хотите поменять пароль:',
      title: 'Пароль',
      type: 'password',
      id: 'password',
      placeholder: 'Старый пароль',
    },
    {
      title: 'Пароль (ещё раз)',
      type: 'password',
      id: 'passwordAgain',
      placeholder: 'Новый пароль',
    },
    {
      inputHeader: 'Если хотите поменять аватар:',
      title: 'Фото',
      type: 'file',
      id: 'avatar-input',
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Сохранить изменения',
      link: './chats',
    },
    {
      typeEmpty: true,
      text: 'Выйти из аккаунта',
      link: './',
    },
  ],
};

export default class ProfilePage extends Block {
  constructor() {
    super(data);
  }

  render() {
    document.title = 'Профиль пользователя';

    return `
    <span class="profile-wrapper">
      <div class="sidebar-left">
        <a class="comeback__link" href="./chats">
          <div class="comeback__icon">←</div>
          <p class="comeback__note">Назад</p>
        </a>
      </div>
      <main>
        <img
          src="{{avatarPath}}"
          alt="Аватар пользователя {{header}}"
          class="avatar avatar__big"
        />
        {{{ Form 
          header="{{header}}" 
          inputs=inputs 
          buttons=buttons 
      }}}
      </main>
    </span>
    `;
  }
}
