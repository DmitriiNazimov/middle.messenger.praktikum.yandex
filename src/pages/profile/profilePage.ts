import '../../styles.css';
import './profile.css';
import authController from '../../controllers';
import { Block, store, DefaultState } from '../../utils';
import { StoreEvents } from '../../consts';
import { isEqual } from '../../utils/Helpers/myDash';

type Props = {
  header: string;
  avatarPath: string;
  inputs: {
    title: string;
    type: string;
    id: string;
    placeholder?: string;
    value?: string | number | null;
    required?: boolean;
    inputHeader?: string;
  }[];
  buttons: {
    typeFull: boolean;
    text: string;
    link: string;
    id?: string;
  }[];
  events?: {};
};

type propsUpdate = {
  inputs: Props['inputs'];
  header: string;
  avatarPath: string;
};

const data: Props = {
  header: ' ',
  avatarPath: '/img/default-avatar.png',
  inputs: [
    {
      title: 'Email',
      type: 'email',
      id: 'email',
      placeholder: 'ivan@mail.ru',
    },
    {
      title: 'Логин',
      type: 'text',
      id: 'login',
      placeholder: 'Логин',
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
      link: './messenger',
    },
    {
      typeFull: false,
      text: 'Выйти из аккаунта',
      link: './',
      id: 'logout-buton',
    },
  ],
};

let oldStateUser = store.state.user!;

export default class ProfilePage extends Block<Props> {
  constructor() {
    super({
      ...data,
      events: {
        click: (event: Event) => this.clickHandler(event),
        submit: (event: Event) => this.submitHandler(event),
      },
    });

    store.on(StoreEvents.updated, () => {
      // TODO это сделать хоком ЕСЛИ еще где-то будут нужны данные юзера из стейт.

      const freshStateUser = store.state.user!;

      const newProps: propsUpdate = {
        inputs: data.inputs,
        header: freshStateUser.first_name || ' ',
        avatarPath: freshStateUser.avatar || data.avatarPath,
      };

      newProps.inputs.map((item) => {
        const stateKey = item.id as keyof DefaultState['user'];
        // eslint-disable-next-line no-param-reassign
        item.value = freshStateUser[stateKey];
        return item;
      });

      if (!isEqual(oldStateUser, freshStateUser)) {
        this.setProps(newProps);
        oldStateUser = freshStateUser;
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  clickHandler(event: Event) {
    const target = event.target as HTMLElement;
    if (target.id === 'logout-buton') {
      authController.logout();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  submitHandler(event: Event) {
    const target = event.target as HTMLElement;
    console.log(target);

    // TODO изменение профиля сделать
  }

  getContent(): HTMLElement {
    if (!this.propsIsFilled()) {
      authController.getUser();
    } else {
      authController.getUser({ withLoader: false });
    }

    return this.element;
  }

  propsIsFilled() {
    // Если логин в хедере не указан - значит данные пользователя недостаточны.
    return (this._props.header.length > 2);
  }

  render() {
    return `
    <span class="profile-wrapper">
      <div class="sidebar-left">
        <a class="comeback__link" href="/messenger">
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
