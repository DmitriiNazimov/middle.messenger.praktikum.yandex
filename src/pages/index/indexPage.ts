import '../../styles.css';
import './index.css';

import Block from '../../utils/Block';

export default class IndexPage extends Block {
  render() {
    document.title = 'Easy Touch - главная страница';

    return `
    <main>
      {{{ Logo }}}
      <h1>Список страниц:</h1>
      <nav class="index-nav">
        <ul class="navigation-list">
          <li><a href="./login">Авторизация</a></li>
          <li><a href="./registration">Регистрация</a></li>
          <li><a href="./chats">Чаты</a></li>
          <li><a href="./profile">Профиль</a></li>
          <li><a href="./404">Ошибка 404</a></li>
          <li><a href="./500">Ошибка 500</a></li>
        </ul>
      </nav>
    </main>
    `;
  }
}
