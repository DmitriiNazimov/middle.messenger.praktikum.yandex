import hbs from 'handlebars';
import '../components/logo/logo.tmp';
import '../styles.css';

const template = hbs.compile(`{{> logo }}
  <h1>Список страниц:</h1>
  <nav class="index-nav">
    <ul class="navigation-list">
      <li><a href="./login.html">Авторизация</a></li>
      <li><a href="./registration.html">Регистрация</a></li>
      <li><a href="./chats.html">Чаты</a></li>
      <li><a href="./profile.html">Профиль</a></li>
      <li><a href="./404.html">Ошибка 404</a></li>
      <li><a href="./500.html">Ошибка 500</a></li>
    </ul>
  </nav>
`);

const html: string = template(1);

document.getElementsByTagName('MAIN')[0].innerHTML += html;
