import '../styles.css';

import hbs from 'handlebars';
import errorNotice from '../components/webError/errorNotice.tmp';


const data = {
    code: '404',
    message: 'Не туда попали',
    url: 'chats.html',
    linkText: 'Назад к чатам'
}

const template = hbs.compile(errorNotice);
const html = template(data);

document.getElementsByTagName('MAIN')[0].innerHTML += html;