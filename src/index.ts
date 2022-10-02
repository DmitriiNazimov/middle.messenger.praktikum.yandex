import './styles.css';
import { renderDOM, registerComponent } from './utils';
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ChatsPage from './pages/chats';
import ProfilePage from './pages/profile';
import Logo from './components/logo';
import Button from './components/button';
import { NetErrorPage, data404, data500 } from './pages/netError';
import { Contact, ChatHeader, Message } from './components/chats';
import {
  Form, Input, InputError, SendMessageForm,
} from './components/form';

// Страницы
registerComponent(LoginPage);
registerComponent(IndexPage);
registerComponent(RegistrationPage);
registerComponent(NetErrorPage);
registerComponent(ChatsPage);
registerComponent(ProfilePage);

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

if (window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new IndexPage());
  });
} else if (window.location.pathname.startsWith('/login')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new LoginPage());
  });
} else if (window.location.pathname.startsWith('/registration')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new RegistrationPage());
  });
} else if (window.location.pathname.startsWith('/500')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new NetErrorPage(data500));
  });
} else if (window.location.pathname.startsWith('/chats')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new ChatsPage());
  });
} else if (window.location.pathname.startsWith('/profile')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new ProfilePage());
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new NetErrorPage(data404));
  });
}
