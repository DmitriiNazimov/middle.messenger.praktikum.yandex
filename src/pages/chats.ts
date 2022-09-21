import '../styles.css';
import './chats.css';
import '../components/form/form.css';

import hbs from 'handlebars';
import '../components/form/formRow.tmp';
import contactRow from '../components/chatList/contactRow.tmp';
import feedHeader from '../components/chatList/feedHeader.tmp';

const searchInputData: object = {
  type: 'text',
  id: 'searchContacts',
  placeholder: 'Поиск',
};

const feedHeaderData: object = {
  avatarPath: '/img/dimon.jpg',
  display_name: 'Иван',
};

const contactsData: object = {
  peoples: [
    {
      avatarPath: '/img/dimon.jpg',
      display_name: 'Иван',
      lastMsgText: 'Как насчет пересмотреть "Бойцовский клуб"?',
      lastMsgData: '10:30',
      msgCounter: 4,
      active: true,
    },
    {
      avatarPath: '/img/misha.jpg',
      display_name: 'Миша',
      lastMsgText: 'Посмотри какой прикол',
      lastMsgData: '08:01',
      msgCounter: 1,
      active: false,
    },
    {
      avatarPath: '/img/love.jpg',
      display_name: 'Любовь',
      lastMsgText: 'Я скучаю.',
      lastMsgData: '09:30',
      msgCounter: 1,
      active: false,
    },
    {
      avatarPath: '/img/fsb.jpg',
      display_name: 'Управление ФСБ',
      lastMsgText: 'Привет. Заедешь сегодня?',
      lastMsgData: 'Вт',
      msgCounter: 0,
      active: false,
    },
  ],
};

const templateSearchInput = hbs.compile('{{> formRow }}');
const htmlSearchInput: string = templateSearchInput(searchInputData);
document.querySelector('.search_form')!.innerHTML = htmlSearchInput;

const templateContacts = hbs.compile(contactRow);
const htmlContacts: string = templateContacts(contactsData);
document.querySelector('.contacts')!.innerHTML = htmlContacts;

const templateFeedHeader = hbs.compile(feedHeader);
const htmlFeedHeader: string = templateFeedHeader(feedHeaderData);
document.querySelector('#feedHeader')!.innerHTML = htmlFeedHeader;
