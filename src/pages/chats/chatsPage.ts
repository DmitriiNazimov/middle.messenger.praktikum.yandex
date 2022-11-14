import '../../styles.css';
import './chats.css';

import { Block, DefaultState, store } from '../../utils';
import { chatsController, messagesController } from '../../controllers';
import { MENU_CHAT_SCREEN, SELECTOR, StoreEvents } from '../../consts';
import { cloneDeep, isEqual } from '../../utils/Helpers/myDash';
import { data, ChatsProps, PropsContactsUpdate } from './defaultProps';
import {
  ChatHeaderWrapper,
  markAllChatsAsUnactive,
  markActiveChat,
  getChatHeaderProps,
  convertStateChatsToProps,
  convertStateMessagesToProps,
} from './supportMethods';

export default class ChatsPage extends Block<ChatsProps> {
  constructor() {
    // activeChat = id чата, который открыт у пользователя.
    let activeChatOldState: DefaultState['activeChat'] = store.state.activeChat;
    let chatsOldState = cloneDeep(store.state.chats as Chat[]);
    let messagesOldState = store.state.messages;
    let isLoadingOldState: DefaultState['isLoading'] = store.state.isLoading as boolean;

    super({
      ...data,
      events: { click: (event: Event) => this.clickHandler(event) },
    });

    store.on(StoreEvents.updated, () => {
      const activeChatFreshState: DefaultState['activeChat'] = store.state.activeChat;
      const chatsFreshState: DefaultState['chats'] = store.state.chats;
      const messagesFreshState: DefaultState['messages'] = store.state.messages;
      const isLoadingFreshState: DefaultState['isLoading'] = store.state.isLoading;

      let newProps = {};

      if (messagesOldState && messagesFreshState
        && !isEqual(messagesOldState, messagesFreshState)) {
        const days: Day[] = convertStateMessagesToProps(messagesFreshState);
        newProps = { ...newProps, days };
        messagesOldState = cloneDeep(messagesFreshState) as MessageServer[];
      }

      if (activeChatOldState !== activeChatFreshState) {
        newProps = { ...newProps, activeChat: activeChatFreshState };
        activeChatOldState = activeChatFreshState;
      }

      if (chatsOldState && chatsFreshState && !isEqual(chatsOldState, chatsFreshState)) {
        const chatsProps: PropsContactsUpdate = convertStateChatsToProps(chatsFreshState);

        // Помечаем активный чат, т.е.который открыт у пользователя (записан в props)
        if (this._props.activeChat) {
          const propsActiveChat = this._props.activeChat;
          const activeChat = chatsProps.contacts.find((chat) => chat.chatId === propsActiveChat);

          if (activeChat) {
            activeChat.active = true;
          }
        }

        newProps = { ...newProps, ...chatsProps };
        chatsOldState = cloneDeep(chatsFreshState) as Chat[];
      }

      if (isLoadingOldState !== isLoadingFreshState) {
        newProps = { ...newProps, isLoading: isLoadingFreshState };
        isLoadingOldState = isLoadingFreshState;
      }

      this.setProps(newProps);
    });
  }

  getContent(): HTMLElement {
    chatsController.getChats();

    return this.element;
  }

  async clickHandler(event: Event) {
    const target = event.target as HTMLElement;
    const chat = target.closest(`.${SELECTOR.contact.row}`) as HTMLElement;

    // Обработка клика на конкретный чат в списке контактов.
    if (chat instanceof HTMLElement) {
      const chatId: number = +(chat.dataset.chatId as string);
      const chatState = (store.state.chats as Chat[]).find((item) => item.id === chatId);
      const chatsProps: ContactProps[] = this._props.contacts;

      if (chatId === store.state.activeChat || chatState === undefined) {
        return;
      }

      const newChatHeaderProps: ChatHeaderWrapper = getChatHeaderProps(chatState, chatId);

      this.setProps({ ...newChatHeaderProps, days: [] });

      await messagesController.connect(chatId);

      markActiveChat(chatsProps, chatId);

      store.setState({
        activeChat: chatId, chatMenuScreen: MENU_CHAT_SCREEN.start, lastMessageEffect: false,
      });
    }

    // Возврат из ленты сообщений к списку чатов (актуально для мобильной версии)
    if (target.closest(`.${SELECTOR.chatHeader.backLink}`)) {
      const chatsFromProps: ContactProps[] = this._props.contacts;

      markAllChatsAsUnactive(chatsFromProps);

      store.setState({
        activeChat: null, chatMenuScreen: MENU_CHAT_SCREEN.start, messages: [],
      });
    }
  }

  render() {
    return `
    <main>
      <div class="chat-side contacts-list{{#if activeChat}} hide__mobile{{/if}}">
        <p class="chat-side__profile-link"><a href="./settings">Профиль ></a></p>
            {{{CreateChatForm}}}
        <div class="contacts">
          {{#if contacts}}
            {{#each contacts}}
              {{{ Contact 
                active=active
                avatarPath=avatarPath
                displayName=displayName
                lastMsgPrefix=lastMsgPrefix
                lastMsgText=lastMsgText
                lastMsgDate=lastMsgDate
                msgCounter=msgCounter
                chatId=chatId
              }}}
              <div class="delimiter__line"></div>
            {{/each}}
          {{else}}
            <div class="contacts__empty">Самое время создать новый чат!</div>
          {{/if}}
        </div>
      </div>
      <div class="chat-side feed{{#if activeChat}} feed__opened__mobile{{/if}}">
        {{#if activeChat}}
          {{#with chatHeader}}
            {{{ ChatHeader avatarPath=avatarPath displayName=displayName chatId=chatId }}}
          {{/with}}
        {{/if}}
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
                              readed=readed
                              imgPath=imgPath
                              isLast=isLast
                            }}}
                        {{/each}}
                    </div>
            {{/each}}
        {{else}}
            {{#if activeChat}}
              {{#if isLoading}}
                <p class="messages__empty">Идет загрузка...</p>
              {{else}}
                <p class="messages__empty">Напишите первое сообщение!</p>
              {{/if}}
            {{else}}
              <p class="messages__empty">Выберите чат, чтобы отправить сообщение.</p>
            {{/if}}
        {{/if}}
        </div>
        {{#if activeChat}}
          {{{ SendMessageForm sendMessageForm="true"}}}
        {{/if}}
      </div>
    </main>
    `;
  }
}
