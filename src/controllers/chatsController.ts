import { store } from '../utils';
import { chatsAPI, GetChats, CreateChat, DeleteChat, UsersInChat, GetChatUsers } from '../api';
import { addNotice, loaderToggle } from '../utils/Helpers/viewHelpers';

type GetChatsArgs = {
  data?: GetChats;
  withLoader?: boolean;
  returnValue?: boolean;
};

class ChatsController {
  // С сервера получаем чаты конкретного пользователя (пользователь определяется по кукам)
  getChats({ data = {}, withLoader = true, returnValue = false }: GetChatsArgs = {}):
  Promise<boolean | Chat[] | void> {
    if (withLoader) {
      loaderToggle({ show: true });
    }

    return chatsAPI
      .getChatsApi(data)
      .then(({ response }) => {
        if (returnValue) {
          return JSON.parse(response);
        }

        store.setState({ chats: [...JSON.parse(response)] });
        return true;
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Создание чата
  createChat(data: CreateChat): void {
    loaderToggle({ show: true });

    chatsAPI
      .createChatApi(data)
      .then(() => {
        this.getChats(); // Чтобы обновился список чатов и там появился созданный чат.
        addNotice('Чат успешно создан!', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Удаление чата
  deleteChat(data: DeleteChat): Promise<boolean> {
    loaderToggle({ show: true });

    return chatsAPI
      .deleteChatByIdApi(data)
      .then(() => {
        this.getChats(); // Чтобы обновился список чатов и исчез удаленный чат.
        addNotice('Чат успешно удален!', 'success');
        return true;
      })
      .catch(({ response }) => {
        addNotice(JSON.parse(response).reason, 'error');
        return false;
      })
      .finally(() => loaderToggle());
  }

  // Добавление юзера в чат
  async addUser(data: UsersInChat): Promise<boolean> {
    loaderToggle({ show: true });

    const usersList = await this.getUsersList({ id: data.chatId });

    if (!usersList) {
      return false;
    }

    const isUserAlreadyInChat = (usersList as UserData[]).find((item) => item.id === data.users[0]);

    if (isUserAlreadyInChat) {
      addNotice('Пользователь уже был добавлен в чат ранее!', 'error');
      return false;
    }

    return chatsAPI
      .addUsersToChatApi(data)
      .then(() => {
        addNotice('Пользователь успешно добавлен в чат!', 'success');
        return true;
      })
      .catch(({ response }) => {
        addNotice(JSON.parse(response).reason, 'error');
        return false;
      })
      .finally(() => loaderToggle());
  }

  // Удаление юзера из чата
  async deleteUser(data: UsersInChat): Promise<UserData[] | boolean> {
    loaderToggle({ show: true });

    return chatsAPI
      .deleteUsersFromChatApi(data)
      .then(() => {
        if (store.state.user?.id === (data.users[0] as number)) {
          this.getChats(); // Пользователь удалил себя из чата - убираем у него этот чат
          addNotice('Вы успешно удалили себя из чата!', 'success');
          return true;
        }

        addNotice('Пользователь успешно удален из чата!', 'success');
        return this.getUsersList({ id: data.chatId });
      })
      .then((response) => response)
      .catch(({ response }) => {
        addNotice(JSON.parse(response).reason, 'error');
        return false;
      })
      .finally(() => loaderToggle());
  }

  // Получение списка юзеров чата по id чата
  getUsersList(data: GetChatUsers): Promise<UserData[] | boolean> {
    loaderToggle({ show: true });

    return chatsAPI
      .getChatUsersApi(data)
      .then(({ response }) => JSON.parse(response))
      .catch(({ response }) => {
        addNotice(JSON.parse(response).reason, 'error');
        return false;
      })
      .finally(() => loaderToggle());
  }
}

export default new ChatsController();
