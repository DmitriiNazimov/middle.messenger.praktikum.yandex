import { MENU_CHAT_SCREEN } from '../../../consts';

export type FoundUser = UserData & { alreadyInChat?: boolean };

export type Props = {
  chatId: number;
  activeChat: number | null;
  users: FoundUser[];
  chatMenuScreen?: string;
  events?: Object;
};

export type PropsChatMenu = FormProps & { chatMenuScreen: string; activeChat?: number | null };

// eslint-disable-next-line import/prefer-default-export
export const data: PropsChatMenu = {
  chatMenuScreen: MENU_CHAT_SCREEN.start,
  inputs: [
    {
      title: 'Поиск пользователя',
      type: 'text',
      id: 'login',
      placeholder: 'Укажите логин',
      required: true,
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Найти',
    },
  ],
};
