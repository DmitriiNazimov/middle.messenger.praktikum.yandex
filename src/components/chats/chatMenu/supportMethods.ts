/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import { MENU_CHAT_SCREEN } from '../../../consts';
import { chatsController } from '../../../controllers';
import { store } from '../../../utils';
import { NoticeSelectors, toggle, trimLongString } from '../../../utils/Helpers/viewHelpers';
import { FoundUser, Props } from './defaultProps';

// eslint-disable-next-line no-shadow
export enum Selector {
  sectionWrapper = 'chat-menu',
  menuIcon = 'chat-menu__icon',
  menuItem = 'chat-menu__item',
  menuWrapper = 'chat-menu__wrapper',
  menuItemsWrapper = 'chat-menu__items-wrapper',
  addUserLink = 'chat-menu__add-user',
  deleteUserLink = 'chat-menu__delete-user',
  usersWrapper = 'chat-menu__users-wrapper',
  deleteUserMarker = 'chat-menu__users__delete',
  userItem = 'contact__user-item',
  deleteChatLink = 'chat-menu__delete-chat',
}

// Раскрыть/скрыть меню (иконка три точки)
export function clickChatMenu(target: HTMLElement) {
  if (target.closest(`.${Selector.menuIcon}`)) {
    if (store.state.chatMenuScreen === MENU_CHAT_SCREEN.start) {
      store.setState({ users: [], chatMenuScreen: MENU_CHAT_SCREEN.items });
      return;
    }

    toggle(`.${Selector.menuWrapper}`);
  }
}

// Открыть экран "Добавить пользователя"
export function clickAddUserLink(target: HTMLElement) {
  if (target.closest(`.${Selector.addUserLink}`)) {
    store.setState({ users: [], chatMenuScreen: MENU_CHAT_SCREEN.addUser });
  }
}

// Клик по ссылке "Назад" с экрана "Удалить пользователя" или "Добавить пользователя".
export function clickBackLinkFromUsersWrapper(target: HTMLElement) {
  if (target.id === 'back-to-menu-items') {
    store.setState({ users: [], chatMenuScreen: MENU_CHAT_SCREEN.items });
  }
}

// Клик по конкретному юзеру, чтобы добавить его в чат
export async function clickAddUserToChat(target: HTMLElement, props: Props) {
  const userItem = target.closest(`.${Selector.userItem}`) as HTMLElement;

  if (userItem && props.chatMenuScreen === MENU_CHAT_SCREEN.addUser) {
    const userId = userItem.dataset.id as string;
    const isUserAdded = await chatsController.addUser({ users: [userId], chatId: props.chatId });

    // Визуально выделить юзера как успешно добавленного.
    if (isUserAdded) {
      // eslint-disable-next-line no-param-reassign
      props.users.find((user) => +user.id! === +userId!)!.alreadyInChat = true;

      store.setState({ users: props.users });
    }
  }
}

// Открыть экран "Удалить пользователя из чата"
export async function clickDeleteUserLink(target: HTMLElement, props:Props) {
  if (target.closest(`.${Selector.deleteUserLink}`)) {
    const usersList = await chatsController.getUsersList({ id: props.chatId });

    // Визуально выделяем всех юзеров как добавленных в чат.
    usersList.map((user: FoundUser) => {
      // eslint-disable-next-line no-param-reassign
      user.alreadyInChat = true;
      return user;
    });

    store.setState({ users: usersList, chatMenuScreen: MENU_CHAT_SCREEN.deleteUser });
  }
}

// Клик по конкретному юзеру, чтобы удалить его из чата
export async function clickDeleteUserItem(target: HTMLElement, props: Props) {
  const userItem = target.closest(`.${Selector.userItem}`) as HTMLElement;

  if (userItem && props.chatMenuScreen === MENU_CHAT_SCREEN.deleteUser) {
    userItem.classList.add('contact__user-item__delete');

    const userId = userItem.dataset.id as string;

    const usersList = (await chatsController.deleteUser({
      users: [userId],
      chatId: props.chatId,
    })) as FoundUser[];

    // Закрываем ленту переписки если пользователь удалил себя из чата.
    if (store.state.user?.id === +userId && usersList) {
      store.setState({ activeChat: null, messages: [] });
      return;
    }

    const markedUsersList: FoundUser[] = await markUsersWhoAlreadyInChat(props.chatId, usersList);

    store.setState({ users: markedUsersList });
  }
}

// Клик по ссылке "Удалить чат"
export async function clickDeleteChatLink(target: HTMLElement, props: Props) {
  if (target.closest(`.${Selector.deleteChatLink}`)) {
    const response = await chatsController.deleteChat({ chatId: props.chatId });

    // Скрыть ленту переписки чата
    if (response) {
      store.setState({
        activeChat: null, messages: [], lastMessageEffect: false,
      });
    }
  }
}

// Отмечаем юзеров уже добавленных в чат, чтобы потом визуально их выделить
export async function markUsersWhoAlreadyInChat(chatId: number, foundUsersByLogin: FoundUser[]) {
  const usersInChat = await chatsController.getUsersList({ id: chatId });

  foundUsersByLogin.map((item: FoundUser) => {
    if (usersInChat.find((user: FoundUser) => +user.id! === +item.id!)) {
      // eslint-disable-next-line no-param-reassign
      item.alreadyInChat = true;
    }

    return item;
  });

  return foundUsersByLogin;
}

// Установка события клика мимо блока меню. По этому событию блок скрывается.
export function setListenerToHideBlockByOffTargetClick() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (!target.closest(`.${Selector.sectionWrapper}`)
    && !target.closest(`.${NoticeSelectors.wrapper}`)) {
      document.querySelector(`.${Selector.menuWrapper}`)?.classList.add('hide');
    }
  });
}

export function trimLongEmails(users: UserData[]) {
  users.map((user) => {
    // eslint-disable-next-line no-param-reassign
    user.email = trimLongString(user.email!, 23);
    return user;
  });
}
