/* eslint-disable no-unused-vars */
export type ChatsProps = {
  contacts: ContactProps[];
  activeChat: null | number;
  chatHeader?: ChatHeaderProps;
  isLoading?: boolean;
  days?: {
    date: string;
    messages: {
      time: string;
      text: string;
      imgPath?: string;
      outgoing?: boolean;
      delivered?: boolean;
      readed?: boolean;
    }[];
  }[];
  events?: {};
};

export type PropsContactsUpdate = {
  contacts: ChatsProps['contacts'];
};

export const data: ChatsProps = {
  activeChat: null,
  contacts: [],
  isLoading: true,
};
