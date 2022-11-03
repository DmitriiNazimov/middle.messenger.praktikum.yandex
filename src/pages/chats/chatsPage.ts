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
    let chatsOldState = cloneDeep(store.state.chats!) as Chat[];
    let messagesOldState: DefaultState['messages'] = store.state.messages!;
    let isLoadingOldState: DefaultState['isLoading'] = store.state.isLoading!;

    super({
      ...data,
      events: { click: (event: Event) => this.clickHandler(event) },
    });

    store.on(StoreEvents.updated, () => {
      const activeChatFreshState: DefaultState['activeChat'] = store.state.activeChat;
      const chatsFreshState: DefaultState['chats'] = store.state.chats!;
      const messagesFreshState: DefaultState['messages'] = store.state.messages!;
      const isLoadingFreshState: DefaultState['isLoading'] = store.state.isLoading!;

      if (!isEqual(messagesOldState!, messagesFreshState)) {
        const days: Day[] = convertStateMessagesToProps(messagesFreshState);
        this.setProps({ days });
        messagesOldState = cloneDeep(messagesFreshState) as MessageServer[];
      }

      if (activeChatOldState !== activeChatFreshState) {
        this.setProps({ activeChat: activeChatFreshState });
        activeChatOldState = activeChatFreshState;
      }

      if (!isEqual(chatsOldState, chatsFreshState)) {
        const chatsProps: PropsContactsUpdate = convertStateChatsToProps(chatsFreshState);

        // Помечаем активный чат, т.е.который открыт у пользователя (записан в props)
        if (this._props.activeChat) {
          chatsProps.contacts.find((chat) => chat.chatId === this._props.activeChat)!.active = true;
        }

        this.setProps(chatsProps);
        chatsOldState = cloneDeep(chatsFreshState) as Chat[];
      }

      if (isLoadingOldState !== isLoadingFreshState) {
        this.setProps({ isLoading: isLoadingFreshState });
        isLoadingOldState = isLoadingFreshState;
      }
    });
  }

  getContent(): HTMLElement {
    chatsController.getChats({ data: {} });

    return this.element;
  }

  async clickHandler(event: Event) {
    const target = event.target as HTMLElement;
    const chat = target.closest(`.${SELECTOR.contact.row}`) as HTMLElement;

    // Обработка клика на конкретный чат в списке контактов.
    if (chat instanceof HTMLElement) {
      const chatId: number = +chat.dataset.chatId!;
      const chatFromState: Chat = store.state.chats!.find((item) => item.id === chatId)!;
      const chatsFromProps: ContactProps[] = this._props.contacts;

      if (chatId === store.state.activeChat) {
        return;
      }

      const newChatHeaderProps: ChatHeaderWrapper = getChatHeaderProps(chatFromState, chatId);
      this.setProps({ ...newChatHeaderProps, days: [] });

      await messagesController.connect(chatId);

      markActiveChat(chatsFromProps, chatId);

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
        <form class="search-form form__round-wrapper">
          <div class="form__round-wrapper-row">
            {{{ Input
              type="text"
              id="search-contacts"
              placeholder="Поиск"
            }}}
            </div>
        </form>
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
            {{{ ChatHeader avatarPath=avatarPath displayName=displayName chatId=chatId chatsPage=chatsPage }}}
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
