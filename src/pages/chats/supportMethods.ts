/* eslint-disable no-param-reassign */
import { PATH } from '../../consts';
import { DefaultState, store } from '../../utils';
import { last } from '../../utils/Helpers/myDash';
import { getLastMessageDate, trimLongString } from '../../utils/Helpers/viewHelpers';
import { PropsContactsUpdate } from './defaultProps';

export type ChatHeaderWrapper = {
  chatHeader: ChatHeaderProps;
}

export function convertStateMessagesToProps(stateMessages: MessageServer[]): Day[] {
  const days: Day[] = [];

  if (!stateMessages.length) {
    return [];
  }

  stateMessages.forEach((item) => {
    const message = {
      date: new Date(item.time).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }),
      time: new Date(item.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      text: item.content,
      outgoing: item.user_id === store.state.user?.id,
      readed: item.is_read,
    };

    const dayExist = days.find((day) => day.date === message.date);

    if (dayExist) {
      dayExist.messages.push(message);
      return;
    }

    const newDay = {
      date: message.date,
      messages: [message],
    };

    days.push(newDay);
  });

  if (store.state.lastMessageEffect) {
    const lastDay = last(days) as Day;
    const lastMsg = last(lastDay.messages) as MessageToProps;
    lastMsg.isLast = true;
  }

  return days.reverse();
}

export function convertStateChatsToProps(freshStateChats: DefaultState['chats']): PropsContactsUpdate {
  const props: PropsContactsUpdate = { contacts: [] };
  const chats: Chat[] = Object.values(freshStateChats!);

  if (chats.length) {
    chats.forEach((chat: Chat) => {
      let lastMsgPrefix: string = '';

      if (chat.last_message && chat.last_message.user.login === store.state.user!.login) {
        lastMsgPrefix = 'Вы:';
      }

      props.contacts.push({
        avatarPath: chat.avatar || PATH.defaultAvatar,
        displayName: chat.title,
        lastMsgPrefix,
        lastMsgText: chat.last_message ? trimLongString(chat.last_message.content, 55) : '',
        lastMsgDate: getLastMessageDate(chat),
        msgCounter: chat.unread_count,
        active: false,
        chatId: chat.id,
      });
    });
  }

  return props;
}

// Обновляем пропсы шапки ленты сообщений значениями выбранного чата.
export function getChatHeaderProps(chatFromState: Chat, chatId: number): ChatHeaderWrapper {
  return {
    chatHeader: {
      avatarPath: chatFromState.avatar || PATH.defaultAvatar,
      displayName: chatFromState.title,
      chatId,
    },
  };
}

// Визуально выделяем строку выбранного чата.
export function markActiveChat(chatsFromProps: ContactProps[], chatId: number) {
  chatsFromProps.map((item) => {
    item.active = false;
    if (item.chatId === chatId) {
      item.active = true;
    }
    return item;
  });
}

// Помечаем все чаты как не активные (т.е. у пользователя никакой чат не выбран)
export function markAllChatsAsUnactive(chatsFromProps: ContactProps[]) {
  chatsFromProps.map((item: ContactProps): ContactProps => {
    item.active = false;
    return item;
  });
}
