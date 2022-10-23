/* eslint-disable import/prefer-default-export */
export type DefaultState = {
  isAuthenticated?: boolean;
  chats?: unknown[];
  user?: {
    first_name?: string;
    avatar?: string;
    display_name?: string;
    email?: string;
    login?: string;
    phone?: string;
    second_name?: string;
    id?: number | null;
  };
  usersFromChats?: string;
  users?: string;
  messages?: any;
};

export const defaultState: DefaultState = {
  isAuthenticated: false,
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
  usersFromChats: '',
  users: '',
  messages: [],
};
