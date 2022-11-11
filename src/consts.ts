import '../static/img/default-avatar.png';

export const SELECTOR = {
  rootId: 'app',
  input: {
    node: 'standart-input',
    errorList: 'input-error__list',
    errorRow: 'input-error__list-row',
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    avatar: 'avatar',
  },
  chatHeader: {
    wrapper: 'chat-header__wrapper',
    backLink: 'chat-header__back-link',
  },
  loader: { wrapper: 'loader__wrapper' },
  contact: { row: 'contact__row' },
  logoutBtn: 'logout-buton',
  message: 'message',
};

export const MENU_CHAT_SCREEN = {
  start: 'menuStart',
  items: 'menuItems',
  addUser: 'menuAddUser',
  deleteUser: 'menuDeleteUser',
};

export const PATH = {
  baseurl: 'https://ya-praktikum.tech/api/v2',
  avatarBase: 'https://ya-praktikum.tech/api/v2/resources',
  defaultAvatar: '/asset/resource/default-avatar.png',
  socket: 'wss://ya-praktikum.tech/ws/chats',
};

export const HEADERS = { JSON: { 'Content-Type': 'application/json' } };

export const DEFAULT_TITLE = 'Easy Touch';

export enum StoreEvents {
  updated = 'updated',
}
