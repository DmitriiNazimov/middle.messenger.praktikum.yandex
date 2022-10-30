// eslint-disable-next-line no-restricted-exports
export { default as authAPI, SignUp, SignIn } from './authApi';

export {
  default as userAPI, UpdateProfile, UpdatePassword, SearchUserByLogin, UpdateAvatar,
} from './userApi';

export {
  default as chatsAPI, GetChats, CreateChat, DeleteChat, UsersInChat, GetChatUsers,
} from './chatsApi';
