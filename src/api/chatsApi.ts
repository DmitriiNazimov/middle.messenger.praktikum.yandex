import { addNotice } from '../utils/Helpers/viewHelpers';
import BaseApi from './baseApi';

export type GetChats = {
  offset?: number,
  limit?: number,
  title?: string;
}

export type CreateChat = {
  title: string;
};

export type DeleteChat = {
  chatId: number;
};

export type UsersInChat = {
  users: unknown[],
  chatId: number;
};

export type GetChatUsers = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

class ChatsAPI extends BaseApi {
  constructor() {
    super('/chats');
  }

  public getChatsApi(data: GetChats): Promise<XMLHttpRequest> {
    return this.http.get('/', { data });
  }

  public createChatApi(data: CreateChat): Promise<XMLHttpRequest> {
    return this.http.post('/', { data });
  }

  public deleteChatByIdApi(data: DeleteChat): Promise<XMLHttpRequest> {
    return this.http.delete('/', { data });
  }

  public addUsersToChatApi(data: UsersInChat): Promise<XMLHttpRequest> {
    return this.http.put('/users', { data });
  }

  public deleteUsersFromChatApi(data: UsersInChat): Promise<XMLHttpRequest> {
    return this.http.delete('/users', { data });
  }

  public getChatUsersApi(data: GetChatUsers) {
    const chatId: number = data.id;
    return this.http.get(`/${chatId}/users`, { data });
  }

  public getChatTokenApi(chatId: number): Promise<string> {
    try {
      return this.http.post(`/token/${chatId}`).then(({ response }) => JSON.parse(response).token);
    } catch (err) {
      addNotice('Ошибка при подключении к серверу.', 'error');
      console.error(err);
      throw new Error('Ошибка при подключении к WebSocket');
    }
  }
}

export default new ChatsAPI();
