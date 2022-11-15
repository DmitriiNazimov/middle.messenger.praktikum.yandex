export { default as authAPI } from './authApi';
export type { SignUp, SignIn } from './authApi';

export { default as userAPI } from './userApi';
export type {
  UpdateProfile, UpdatePassword, SearchUserByLogin, UpdateAvatar,
} from './userApi';

export { default as chatsAPI } from './chatsApi';
export type {
  GetChats, CreateChat, DeleteChat, UsersInChat, GetChatUsers,
} from './chatsApi';
