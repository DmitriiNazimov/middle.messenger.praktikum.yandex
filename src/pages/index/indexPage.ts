import '../../styles.css';
import './index.css';

import Block from '../../utils/Rendering/Block';

type Props = {};

export default class IndexPage extends Block<Props> {
  render() {
    document.title = 'Easy Touch - главная страница';

    return `
    <main>
      {{{ Logo }}}
      <h1>Список страниц:</h1>
      <nav class="index-nav">
        <ul class="navigation-list">
          <li class="navigation-list__row"><a href="./login">Авторизация</a></li>
          <li class="navigation-list__row"><a href="./registration">Регистрация</a></li>
          <li class="navigation-list__row"><a href="./chats">Чаты</a></li>
          <li class="navigation-list__row"><a href="./profile">Профиль</a></li>
          <li class="navigation-list__row"><a href="./404">Ошибка 404</a></li>
          <li class="navigation-list__row"><a href="./500">Ошибка 500</a></li>
        </ul>
      </nav>
    </main>
    `;
  }
}
