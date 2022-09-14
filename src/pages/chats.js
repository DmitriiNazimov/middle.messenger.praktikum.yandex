import '../styles.css';
import './chats.css';
import '../components/form/form.css';


import hbs from 'handlebars';
import '../components/form/formRow.tmp';
import contactRow from '../components/chatList/contactRow.tmp';


const searchInputData =
{
    type: 'text',
    id: 'searchInContactList',
    placeholder: 'Поиск',
}

const contactsData = {
    peoples: [
        {
            avatarPath: './static/img/dimon.jpg',
            display_name: 'Иван',
            lastMsgText: 'Здесь какой-то текст на пару строк',
            lastMsgData: '10:30',
            msgCounter: 4,
            active: true
        },
        {
            avatarPath: '../../static/img/dimon.jpg',
            display_name: 'Миша',
            lastMsgText: 'Здесь какой-то текст на пару строк',
            lastMsgData: '10:30',
            msgCounter: 4,
            active: false
        },
        {
            avatarPath: '../../static/img/dimon.jpg',
            display_name: 'Любовь',
            lastMsgText: 'Здесь какой-то текст на пару строк',
            lastMsgData: '10:30',
            msgCounter: 4,
            active: true
        },
        {
            avatarPath: '../../static/img/dimon.jpg',
            display_name: 'Управление ФСБ',
            lastMsgText: 'Здесь какой-то текст на пару строк',
            lastMsgData: '10:30',
            msgCounter: 4,
            active: false
        },
    ]
}


const templateSearchInput = hbs.compile('{{> formRow }}');
const htmlSearchInput = templateSearchInput(searchInputData);
document.querySelector('.searchInContactList').innerHTML = htmlSearchInput;


const templateContacts = hbs.compile(contactRow);
const htmlContacts = templateContacts(contactsData);
document.querySelector('.contacts').innerHTML = htmlContacts;