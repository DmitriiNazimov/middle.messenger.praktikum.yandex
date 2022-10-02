import './styles.css';

// Утилиты
import { renderDOM, registerComponent } from './utils';

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

// Зародыш роутинга
document.addEventListener('DOMContentLoaded', () => {
  switch (window.location.pathname) {
    case '/':
      renderDOM(new IndexPage());
      break;
    case '/login':
      renderDOM(new LoginPage());
      break;
    case '/registration':
      renderDOM(new RegistrationPage());
      break;
    case '/500':
      renderDOM(new NetErrorPage(data500));
      break;
    case '/chats':
      renderDOM(new ChatsPage());
      break;
    case '/profile':
      renderDOM(new ProfilePage());
      break;
    default:
      renderDOM(new NetErrorPage(data404));
  }
});
