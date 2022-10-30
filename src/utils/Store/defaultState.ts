import { MENU_CHAT_SCREEN } from '../../consts';

export type DefaultState = {
  isAuthenticated?: boolean;
  chatMenuScreen?: string;
  activeChat?: number | null;
  lastMessageEffect?: boolean;
  isLoading?: boolean;
  chats?: Chat[];
  user?: UserData;
  users?: UserData[];
  messages?: MessageServer[];
};

export const defaultState: DefaultState = {
  isAuthenticated: false,
  chatMenuScreen: MENU_CHAT_SCREEN.start,
  activeChat: null,
  isLoading: true,
  chats: [
    {
      avatar: null,
      created_by: 0,
      id: 0,
      last_message: {
        content: '',
        id: 0,
        time: '',
        user: {
          avatar: '',
          display_name: '',
          email: '',
          first_name: '',
          login: '',
          phone: '',
          second_name: '',
          id: 0,
        },
      },
      title: '',
      unread_count: 0,
    },
  ],
  user: {
    avatar: '',
    display_name: '',
    email: '',
    first_name: '',
    login: '',
    phone: '',
    second_name: '',
    id: null,
  },
  users: [],
  messages: [],
};
