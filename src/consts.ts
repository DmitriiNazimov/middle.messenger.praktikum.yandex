/* eslint-disable no-unused-vars */
export const SELECTOR = {
  input: {
    errorList: 'input-error__list',
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    avatar: 'avatar',
  },
  chatHeaderWrapper: 'chat-header__wrapper',
  loader: { wrapper: 'loader__wrapper' },
  contact: { row: 'contact__row' },
  logoutBtn: 'logout-buton',
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
  defaultAvatar: '/img/default-avatar.png',
};

export const HEADERS = { JSON: { 'Content-Type': 'application/json' } };

export const DEFAULT_TITLE = 'Easy Touch';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  updated = 'updated',
}
