/* eslint-disable class-methods-use-this */
import chatsApi from '../api/chatsApi';
import { MENU_CHAT_SCREEN, PATH } from '../consts';
import { store } from '../utils';
import { addNotice, loaderToggle } from '../utils/Helpers/viewHelpers';
import chatsController from './chatsController';

class MessagesController {
  private _userId!: number;

  private _chatId!: string | number;

  private _token!: string;

  private _socket: WebSocket | null = null;

  private _pingIntervalFunc!: NodeJS.Timer;

  async connect(chatId: number) {
    loaderToggle({ show: true });
    store.setState({ isLoading: true });

    this._closeConnection();
    this._userId = store.state.user?.id!;
    this._chatId = chatId;
    this._token = await chatsApi.getChatTokenApi(chatId);
    this._socket = await new WebSocket(`${PATH.socket}/${this._userId}/${this._chatId}/${this._token}`);
    this._setListeners();
    this._socket.onopen = () => this._openHandler();
    this._socket.onclose = () => this._closeHandler();
  }

  getMessages(num: number = 0) {
    if (this._socket) {
      this._socket.send(JSON.stringify({ content: num, type: 'get old' }));
    }
  }

  // eslint-disable-next-line consistent-return
  async sendMessage(messageText: string) {
    try {
      if (this._socket) {
        await this._socket.send(JSON.stringify({
          content: messageText,
          type: 'message',
        }));
        chatsController.getChats({ data: {}, withLoader: false });

        return true;
      }
    } catch (error) {
      addNotice(error as string, 'error');
      return false;
    }
  }

  private _closeConnection() {
    if (this._socket) {
      clearInterval(this._pingIntervalFunc);
      this._socket.close();
      this._removeListeners();
    }
  }

  private _setListeners() {
    if (this._socket) {
      this._socket.addEventListener('message', this._messageHandler);
      this._socket.addEventListener('error', this._errorHandler);
    }
  }

  private async _openHandler() {
    if (this._socket) {
      await this.getMessages();
      loaderToggle();

      this._pingIntervalFunc = setInterval(() => {
        this._socket?.send(JSON.stringify({ type: 'ping' }));
      }, 10000);
    }
  }

  private _closeHandler(event?: any) {
    this._removeListeners();
    clearInterval(this._pingIntervalFunc);

    if (event && !event.wasClean) {
      addNotice('Возникли проблемы с подключением к чату. Обновите страницу.', 'error');
    }
  }

  private async _messageHandler(event: any) {
    const serverMessages: MessageServer = JSON.parse(event.data);

    if (serverMessages.type !== 'pong') {
      if (Array.isArray(serverMessages)) {
        store.setState({
          messages: serverMessages.reverse(),
          isLoading: false,
          chatMenuScreen: MENU_CHAT_SCREEN.start,
        });
      } else {
        store.setState({
          lastMessageEffect: true,
          isLoading: false,
          chatMenuScreen: MENU_CHAT_SCREEN.start,
        });

        if (serverMessages.type === 'user connected') {
          serverMessages.time = new Date().toJSON();
          serverMessages.user_id = +serverMessages.content;
          serverMessages.content = 'Подключился новый пользователь...';
          serverMessages.is_read = false;
        }

        const stateMessages = store.getState()?.messages as MessageServer[];
        stateMessages?.push(serverMessages);

        const chatsUpdated = await chatsController.getChats({
          data: {}, withLoader: false, returnValue: true,
        });

        store.setState({ messages: stateMessages, chats: chatsUpdated });
      }
    }
  }

  private _errorHandler(event: any) {
    store.setState({ isLoading: false });

    addNotice(event.message, 'error');
  }

  private _removeListeners() {
    if (this._socket) {
      this._socket.removeEventListener('message', this._messageHandler);
      this._socket.removeEventListener('error', this._errorHandler);
    }
  }
}

export default new MessagesController();
