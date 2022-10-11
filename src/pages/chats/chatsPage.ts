import '../../styles.css';
import './chats.css';

import Block from '../../utils/Rendering/Block';

type Props = {
  chatHeader: {
    avatarPath: string,
    displayName: string
  }[],
  contacts: {
    avatarPath: string,
    displayName: string,
    lastMsgText: string,
    lastMsgDate: string,
    msgCounter: number,
    active: boolean,
  }[],
  days: {
    date: string,
    messages: {
      time: string,
      text: string,
      imgPath?: string
      outgoing?: boolean,
      delivered?: boolean
      readed?: boolean
    }[]
  }[]
};

const data: Props = {
  chatHeader: [
    {
      avatarPath: '/img/dimon.jpg',
      displayName: 'Иван',
    },
  ],
  contacts: [
    {
      avatarPath: '/img/dimon.jpg',
      displayName: 'Иван',
      lastMsgText: 'Огонь! 🔥',
      lastMsgDate: '10:30',
      msgCounter: 0,
      active: true,
    },
    {
      avatarPath: '/img/misha.jpg',
      displayName: 'Миша',
      lastMsgText: 'Посмотри какой прикол',
      lastMsgDate: '09:30',
      msgCounter: 1,
      active: false,
    },
    {
      avatarPath: '/img/love.jpg',
      displayName: 'Любовь',
      lastMsgText: 'Я скучаю.',
      lastMsgDate: '09:00',
      msgCounter: 3,
      active: false,
    },
    {
      avatarPath: '/img/fsb.jpg',
      displayName: 'Управление ФСБ',
      lastMsgText: 'Привет. Заедешь сегодня?',
      lastMsgDate: 'Вт',
      msgCounter: 0,
      active: false,
    },
  ],
  days: [
    {
      date: '19.04.2022',
      messages: [
        {
          time: '10:30',
          text: 'Привет. Как дела?',
        },
        {
          time: '10:30',
          text: 'Привет. Я норм. Как сам?',
          outgoing: true,
          delivered: true,
          readed: true,
        },
        {
          time: '10:31',
          text: 'Смотри где я теперь работаю:',
          imgPath: '/img/ya.jpeg',
        },
        {
          time: '10:32',
          text: 'Огонь! 🔥',
          outgoing: true,
          delivered: true,
          readed: false,
        },
      ],
    },
  ],
};

export default class ChatsPage extends Block<Props> {
  constructor() {
    super(data);
  }

  render() {
    document.title = 'Список чатов';

    return `
    <main>
      <div class="chat-side contacts-list">
        <p class="profile-link"><a href="./profile">Профиль ></a></p>
        <form class="search-form form__round-wrapper">
          <div class="form__round-wrapper-row">
            {{{ Input
              type="text"
              id="search-contacts"
              placeholder="Поиск"
            }}}
            </div>
        </form>
        <div class="contacts">
          {{#each contacts}}
            {{{ Contact 
              active=active
              avatarPath=avatarPath
              displayName=displayName
              lastMsgText=lastMsgText
              lastMsgDate=lastMsgDate
              msgCounter=msgCounter
            }}}
            <div class="delimiter__line"></div>
          {{/each}}
        </div>
      </div>
      <div class="chat-side feed">
        {{#each chatHeader}}
          {{{ ChatHeader avatarPath=avatarPath displayName=displayName }}}
        {{/each}}
        <div class="messages">
          {{#if days}}
            {{#each days}}
                    <div class="correspondence-daily">
                        <div class="correspondence-date">{{ date }}</div>
                        {{#each messages}}
                            {{{ Message 
                              time=time
                              text=text
                              outgoing=outgoing
                              delivered=delivered
                              readed=readed
                              imgPath=imgPath
                            }}}
                        {{/each}}
                    </div>
            {{/each}}
        {{else}}
            <p class="messages__empty">Начните беседу!</p>
        {{/if}}
        </div>
        {{{ SendMessageForm sendMessageForm="true" }}}
      </div>
    </main>
    `;
  }
}
