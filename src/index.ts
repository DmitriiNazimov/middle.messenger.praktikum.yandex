import './styles.css';
import { renderDOM, registerComponent } from './utils';
import LoginPage from './pages/login';
import { Form, Input, InputError } from './components/form';
import Button from './components/button';
import Layout from './components/layout';

registerComponent(LoginPage);
registerComponent(Form);
registerComponent(Input);
registerComponent(InputError);
registerComponent(Button);
registerComponent(Layout);

if (window.location.pathname.startsWith('/login')) {
  document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new LoginPage();
    renderDOM(loginPage);
  });
}
// else if (window.location.pathname.startsWith('/registration')) {
//   document.addEventListener('DOMContentLoaded', () => {
//     const registrationPage = new registrationPage();
//     renderDOM(registrationPage);
//   });
// }
