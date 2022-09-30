import './styles.css';
import { renderDOM, registerComponent } from './utils';
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import { NetErrorPage, data404, data500 } from './pages/netError';
import { Form, Input, InputError } from './components/form';
import Button from './components/button';
import Layout from './components/layout';

// Страницы
registerComponent(LoginPage);
registerComponent(IndexPage);
registerComponent(RegistrationPage);
registerComponent(NetErrorPage);

// Компоненты
registerComponent(Form);
registerComponent(Input);
registerComponent(InputError);
registerComponent(Button);
registerComponent(Layout);

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
} else {
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM(new NetErrorPage(data404));
  });
}
