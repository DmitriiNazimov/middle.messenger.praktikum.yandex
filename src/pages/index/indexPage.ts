import '../../styles.css';
import './index.css';

import { Block } from '../../utils';

export default class IndexPage extends Block<{}> {
  render() {
    return `
    <main>
      {{{ Logo }}}
      <h1>Список страниц:</h1>
      <nav class="index-nav">
        <ul class="navigation-list">
          <li class="navigation-list__row"><a href="./sign-in">Авторизация</a></li>
          <li class="navigation-list__row"><a href="./sign-up">Регистрация</a></li>
          <li class="navigation-list__row"><a href="./messenger">Чаты</a></li>
          <li class="navigation-list__row"><a href="./settings">Профиль</a></li>
          <li class="navigation-list__row"><a href="./401">Ошибка 401</a></li>
          <li class="navigation-list__row"><a href="./404">Ошибка 404</a></li>
          <li class="navigation-list__row"><a href="./500">Ошибка 500</a></li>
        </ul>
      </nav>
    </main>
    `;
  }
}
