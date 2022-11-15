import './chatMenu.css';
import '../contact/contact.css';
import { DefaultState, store } from '../../../utils';
import { cloneDeep, isEqual } from '../../../utils/Helpers/myDash';
import { SearchUserByLogin } from '../../../api';
import { userController } from '../../../controllers';
import { addNotice, formIsValid } from '../../../utils/Helpers/viewHelpers';
import Block from '../../../utils/Rendering/Block';
import { MENU_CHAT_SCREEN, PATH, StoreEvents } from '../../../consts';
import { Props, data } from './defaultProps';
import {
  Selector,
  clickChatMenu,
  clickAddUserLink,
  clickDeleteUserLink,
  clickDeleteChatLink,
  clickBackLinkFromUsersWrapper,
  clickAddUserToChat,
  clickDeleteUserItem,
  markUsersWhoAddedBefore,
  setListenerToHideBlockByOffTargetClick,
  trimLongEmails,
} from './supportMethods';

export default class ChatMenu extends Block<Props> {
  static componentName = 'ChatMenu';

  private _screenOldState: DefaultState['chatMenuScreen'] = store.state.chatMenuScreen;

  private _usersOldState: DefaultState['users'] = store.state.users;

  private _activeChatOldState: DefaultState['activeChat'] = store.state.activeChat;

  constructor(props: Props) {
    super({
      ...props,
      ...data,
      events: {
        click: (event: Event) => this.clickHandler(event),
        submit: (event: Event) => this.submitHandler(event),
      },
    });

    setListenerToHideBlockByOffTargetClick();

    store.on(StoreEvents.updated, () => this.storeListener());
  }

  storeListener() {
    const screenFreshState: DefaultState['chatMenuScreen'] = store.state.chatMenuScreen;
    const usersFreshState: DefaultState['users'] = store.state.users;
    const activeChatFreshState: DefaultState['activeChat'] = store.state.activeChat;

    // Пре смене выбора чата экземпляры ChatMenu множатся и все отслеживают Store, из-за этого баги.
    if (this._activeChatOldState !== activeChatFreshState) {
      // Здесь прекращаем отслеживание Store при переключении чата (при изменении activeChat).
      store.offAll(StoreEvents.updated, () => this.storeListener());
    }

    if (this._screenOldState !== screenFreshState) {
      this.setProps({ chatMenuScreen: screenFreshState, chatId: activeChatFreshState });
      this._screenOldState = screenFreshState;
    }

    if (this._usersOldState && usersFreshState && !isEqual(this._usersOldState, usersFreshState)) {
      trimLongEmails(usersFreshState);

      this.setProps({ users: usersFreshState });
      this._usersOldState = cloneDeep(usersFreshState) as UserData[];
    }
  }

  clickHandler(event: Event) {
    const target = event.target as HTMLElement;

    // Раскрыть/скрыть меню (три точки)
    clickChatMenu(target);

    // Открыть экран "Добавить пользователя"
    clickAddUserLink(target);

    // Клик по ссылке "Назад" с экрана "Удалить пользователя" или "Добавить пользователя".
    clickBackLinkFromUsersWrapper(target);

    // Клик по конкретному юзеру, чтобы добавить его в чат
    clickAddUserToChat(target, this._props);

    // Открыть экран "Удалить пользователя из чата"
    clickDeleteUserLink(target, this._props);

    // Клик по конкретному юзеру, чтобы удалить его из чата
    clickDeleteUserItem(target, this._props);

    // Клик по ссылке "Удалить чат"
    clickDeleteChatLink(target, this._props);
  }

  // Форма для поиска пользователя по логину, чтобы потом добавить его в чат.
  async submitHandler(event: Event) {
    const form = event.target;

    if (!(form instanceof HTMLFormElement) || !formIsValid(form)) {
      return;
    }

    const formData = Object.fromEntries(new FormData(form)) as SearchUserByLogin;
    const foundUsersByLogin = await userController.getUsersByLogin(formData);

    if (!foundUsersByLogin.length) {
      addNotice('Пользователь не найден.');
    }

    // eslint-disable-next-line max-len
    const usersList = await markUsersWhoAddedBefore(this._props.chatId, foundUsersByLogin);

    if (usersList) {
      store.setState({ users: usersList });
    }
  }

  render() {
    return `
    <section class="${Selector.sectionWrapper}">
        {{!-- Иконка меню (три точки) --}}
        <div class="${Selector.menuIcon}">
            <a href="#">
                <div class="chat-menu__dot"></div>
                <div class="chat-menu__dot"></div>
                <div class="chat-menu__dot"></div>
            </a>
        </div>

        {{!-- Блок меню --}}
        <div class="${Selector.menuWrapper}{{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.start}")}} hide{{/if}}">
            {{!-- Элементы меню (ссылки) --}}
            <div class="${Selector.menuItemsWrapper}{{#if (notEq chatMenuScreen "${MENU_CHAT_SCREEN.items}") }} hide{{/if}}">
                <div class="${Selector.menuItem} ${Selector.addUserLink}">
                    <a class="chat-menu__item__add" href="#">Добавить пользователя в чат</a>
                </div>
                <div class="${Selector.menuItem} ${Selector.deleteUserLink}">
                    <a class="chat-menu__item__delete" href="#">Удалить пользователя из чата</a>
                </div>
                <div class="delimiter__line"></div>
                <div class="${Selector.menuItem} ${Selector.deleteChatLink}">
                    <a class="chat-menu__item__delete" href="#">Удалить чат</a>
                </div>
            </div>

            {{!-- Список пользователей и форма поиска пользователей --}}
            <div class="${Selector.usersWrapper}{{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.items}") }} hide{{/if}}{{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.start}") }} hide{{/if}}">
                <p><a href="#" id="${Selector.backLinkId}">< Назад</a></p>
                {{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.addUser}")}}
                    {{{Form inputs=inputs buttons=buttons}}}
                {{/if}}
                {{#if users}}
                    <div class="chat-menu__users{{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.deleteUser}")}} chat-menu__users__delete{{/if}}">
                        <p class="{{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.addUser}")}}${Selector.addUserBlockWrapper}{{else}}${Selector.deleteUserBlockWrapper}{{/if}}">
                          {{#if (eq chatMenuScreen "${MENU_CHAT_SCREEN.addUser}")}}Добавить пользователя:{{else}}Удалить пользователя:{{/if}}
                        </p>
                        {{#each users}}
                            <div class="delimiter__line"></div>
                            <div class="${Selector.userItem}{{#if alreadyInChat}} contact__user-item__active{{/if}}" data-id="{{id}}">
                                <div class="contact__avatar">
                                {{#if alreadyInChat}}<div class="contact__pointer"></div>{{/if}}
                                    <img src="
                                    {{#if avatar}}${PATH.avatarBase}{{ avatar }}{{else}}${PATH.defaultAvatar}{{/if}}"
                                    alt="{{ login }}">
                                </div>
                                <div class="contact__main-info">
                                    <div class="contact__username">{{ login }}</div>
                                    <div class="contact__message">
                                        {{#if (eq role "admin") }}<strong class="chat-menu__item__add">Админ</strong><br>{{/if}}
                                        Имя: {{first_name}}<br>
                                        Email: {{ email }}
                                    </div>
                                </div>
                            </div>
                        {{/each}}
                        <div class="delimiter__line"></div>
                    </div>
                {{/if}}
            </div>

        </div>
    </section>
     `;
  }
}
