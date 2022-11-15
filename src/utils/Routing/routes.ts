// Страницы
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ChatsPage from '../../pages/chats';
import ProfilePage from '../../pages/profile';
import { NetErrorPage, data404, data500, data401 } from '../../pages/netError';
import { data as loginData } from '../../pages/login/defaultProps';
import { dataAlreadyAuthorized } from '../../pages/netError/netErrorPage';

// Пути к страницам

// eslint-disable-next-line import/prefer-default-export
export const routes: Routes = {
  index: {
    pathname: '/',
    blockClass: ChatsPage,
    requestAuthorization: true,
    title: 'Чаты',
  },
  login: {
    pathname: '/sign-in',
    blockClass: LoginPage,
    requestAuthorization: false,
    title: 'Авторизация',
    data: loginData,
  },
  registration: {
    pathname: '/sign-up',
    blockClass: RegistrationPage,
    requestAuthorization: false,
    title: 'Регистрация',
  },
  chats: {
    pathname: '/messenger',
    blockClass: ChatsPage,
    requestAuthorization: true,
    title: 'Чаты',
  },
  profile: {
    pathname: '/settings',
    blockClass: ProfilePage,
    requestAuthorization: true,
    title: 'Профиль пользователя',
  },
  page500: {
    pathname: '/500',
    blockClass: NetErrorPage,
    requestAuthorization: false,
    title: 'Ошибка 500',
    data: data500,
  },
  page404: {
    pathname: '/404',
    blockClass: NetErrorPage,
    requestAuthorization: false,
    title: 'Ошибка 404',
    data: data404,
  },
  page401: {
    pathname: '/401',
    blockClass: NetErrorPage,
    requestAuthorization: false,
    title: 'Ошибка 401',
    data: data401,
  },
  alreadyAuthorized: {
    pathname: '/is-authorized',
    blockClass: NetErrorPage,
    requestAuthorization: true,
    title: 'Вы уже авторизованы',
    data: dataAlreadyAuthorized,
  },
};
