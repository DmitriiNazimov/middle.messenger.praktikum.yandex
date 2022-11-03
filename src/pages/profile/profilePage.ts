/* eslint-disable class-methods-use-this */
import '../../styles.css';
import './profile.css';
import { authController, userController } from '../../controllers';
import { Block, store, DefaultState } from '../../utils';
import { PATH, SELECTOR, StoreEvents } from '../../consts';
import { cloneDeep, isEqual } from '../../utils/Helpers/myDash';
import { addNotice, formIsValid } from '../../utils/Helpers/viewHelpers';
import { UpdateProfile } from '../../api';
import { data, Props, propsUpdate } from './defaultProps';

export default class ProfilePage extends Block<Props> {
  constructor() {
    super({
      ...data,
      events: {
        click: (event: Event) => this.clickHandler(event),
        submit: (event: Event) => this.submitHandler(event),
      },
    });

    // Не присваиваем сразу store.state.user чтобы отработал !isEqual(userOldState, userFreshState)
    let userOldState = {};

    store.on(StoreEvents.updated, () => {
      const userFreshState: DefaultState['user'] = store.state.user!;
      const newProps: propsUpdate = this.convertStateToProps(userFreshState);

      if (!isEqual(userOldState, userFreshState)) {
        this.setProps(newProps);
        userOldState = cloneDeep(userFreshState) as UserData;
      }
    });
  }

  convertStateToProps(freshState: DefaultState['user']): propsUpdate {
    const props: propsUpdate = {
      inputs: data.inputs,
      header: freshState?.first_name || ' ',
      avatarPath: freshState?.avatar ? PATH.avatarBase + freshState.avatar : data.avatarPath,
    };

    props.inputs.map((item) => {
      const key = item.id as keyof DefaultState['user'];
      // eslint-disable-next-line no-param-reassign
      item.value = freshState![key];
      return item;
    });

    return props;
  }

  clickHandler(event: Event) {
    const target = event.target as HTMLElement;
    if (target.id === SELECTOR.logoutBtn) {
      authController.logout();
    }
  }

  submitHandler(event: Event) {
    const form = event.target as HTMLElement;

    if (!(form instanceof HTMLFormElement) || !formIsValid(form)) {
      return;
    }

    // Обновление пароля
    const oldPasswordInput: HTMLInputElement = form.querySelector(`#${SELECTOR.input.oldPassword}`)!;
    const newPasswordInput: HTMLInputElement = form.querySelector(`#${SELECTOR.input.newPassword}`)!;

    if (oldPasswordInput.value && newPasswordInput.value) {
      const formDataPassword = {
        oldPassword: oldPasswordInput.value,
        newPassword: newPasswordInput.value,
      };
      userController.updateUserPassword(formDataPassword);
    } else if (oldPasswordInput.value && !newPasswordInput.value) {
      addNotice('Для изменения пароля необходимо указать старый и новый пароль.', 'error');
      return;
    }

    // Обновление аватара
    const avatarInput: HTMLInputElement = form.querySelector(`#${SELECTOR.input.avatar}`)!;

    if (avatarInput.value) {
      userController.updateUserAvatar(new FormData(form));
    }

    // Обновление данных пользователя
    const formData = Object.fromEntries(new FormData(form)) as UpdateProfile;
    userController.updateUserProfileData(formData);
  }

  getContent(): HTMLElement {
    authController.getUser({ withLoader: !this.propsIsFilled() });

    return this.element;
  }

  propsIsFilled() {
    // Если логин в хедере не указан - значит данные пользователя недостаточны.
    return this._props.header!.length > 2;
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
          class="avatar-img avatar-img__big"
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
