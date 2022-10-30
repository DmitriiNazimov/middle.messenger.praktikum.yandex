import { Block, Route } from '../src/utils';

declare global {
  export type InputProps = {
    title: string;
    type: string;
    id: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    inputHeader?: string;
    errorRefName?: string;
    pattern?: string;
    error?: string;
    events?: Object;
  };

  export type ButtonProps = {
    typeFull: boolean;
    text: string;
    link?: string;
    id?: string;
    events?: Object;
  };

  export type FormProps = {
    header?: string;
    inputs: InputProps[];
    buttons: ButtonProps[];
    events?: {}
  };

  export type ChatHeaderProps = {
    avatarPath: string;
    displayName: string;
    chatId: number;
    events?: Object;
  };

  export type ContactProps = {
    active: boolean;
    avatarPath: string;
    displayName: string;
    lastMsgPrefix: string;
    lastMsgText: string;
    lastMsgDate: string;
    msgCounter: number;
    chatId: number;
    events?: Object;
  };

  export type RouteType = null | Route;

  export type RouteProps = {
    pathname: string;
    blockClass: typeof Block<{}>;
    requestAuthorization: boolean;
    title?: string;
    data?: {};
    rootSelector?: string;
  };

  export type Routes = Record<string, RouteProps>;

  export type BlockComponent = Block<{}>;
  export type BlockClass = typeof Block<{}>;

  export type ValidateResult = Record<string, string[] | boolean>;

  export type UserData = {
    first_name?: string;
    avatar?: string;
    display_name?: string;
    email?: string;
    login?: string;
    phone?: string;
    second_name?: string;
    id?: number | null;
  }

  export type Chat = {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: {
      content: string;
      id: number;
      time: string;
      user: UserData;
    };
    title: '';
    unread_count: 0;
  };

  export type MessageServer = {
    chat_id: number;
    content: string;
    file: null | {};
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
  };

  export type MessageToProps = {
    date: string;
    time: string;
    outgoing: boolean;
    text: string;
    readed?: boolean;
    imgPath?: string;
    isLast?: boolean;
  };

  export type Day = {
    date: string;
    messages: MessageToProps[];
  };
}
export {};
