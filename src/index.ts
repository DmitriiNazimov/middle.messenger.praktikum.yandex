import './styles.css';

// Утилиты
import { Router, registerComponent } from './utils';

// Страницы
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ChatsPage from './pages/chats';
import ProfilePage from './pages/profile';

// Компоненты
import Logo from './components/logo';
import Button from './components/button';
import { NetErrorPage, data404, data500 } from './pages/netError';
import { Contact, ChatHeader, Message } from './components/chats';
import { Form, Input, InputError, SendMessageForm } from './components/form';

// Компоненты
registerComponent(Logo);
registerComponent(Form);
registerComponent(SendMessageForm);
registerComponent(Input);
registerComponent(InputError);
registerComponent(Button);
registerComponent(Contact);
registerComponent(ChatHeader);
registerComponent(Message);

const routes: Routes = {
  index: {
    pathname: '/',
    blockClass: IndexPage,
    requestAuthorization: false,
    title: 'Easy Touch - главная страница',
  },
  login: {
    pathname: '/sign-in',
    blockClass: LoginPage,
    requestAuthorization: false,
    title: 'Авторизация',
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
};

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('#app');

  Object.keys(routes).forEach((item) => { router.use(routes[item]); });

  router.start();
});
