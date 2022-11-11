import './index.html';
import './styles.css';

import Handlebars from 'handlebars';

// Утилиты
import { router, routes, registerComponent } from './utils';

// Компоненты
import Logo from './components/logo';
import Button from './components/button';
import { Contact, ChatHeader, Message, ChatMenu } from './components/chats';
import { CreateChatForm, Form, Input, InputError, SendMessageForm } from './components/form';

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
registerComponent(CreateChatForm);
registerComponent(ChatMenu);

// Хелперы Handlebars
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('notEq', (a, b) => a !== b);

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(routes).forEach((item) => { router.use(routes[item]); });

  router.start();
});
