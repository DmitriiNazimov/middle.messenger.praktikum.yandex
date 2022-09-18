import '../styles.css';

import hbs from 'handlebars';
import form from '../components/form/form.tmp';


const data = {
    header: 'Вход',
    formRows: [
        {
            title: 'Логин',
            type: 'login',
            id: 'login',
            placeholder: 'ivanIvanov',
            required: true
        },
        {
            title: 'Пароль',
            type: 'password',
            id: 'password',
            placeholder: 'Латинские буквы и цифры',
            required: true
        }
    ],
    buttons: [
        {
            typeFull: true,
            text: 'Войти',
            link: './chats.html'
        },
        {
            typeEmpty: true,
            text: 'Ещё не зарегистрированы?',
            link: './registration.html'
        }
    ]
}

const template = hbs.compile('{{> logo }}' + form);
const html = template(data);

document.getElementsByTagName('MAIN')[0].innerHTML += html;