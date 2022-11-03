/* eslint-disable no-unused-vars */
import BaseApi from './baseApi';

export type UpdateProfile = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export type UpdateAvatar = {
  data: FormData;
  headers: Record<string, string>;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserByLogin = {
    login: string;
};

class UserAPI extends BaseApi {
  constructor() {
    super('/user');
  }

  public changeUserProfileDataApi(data: UpdateProfile): Promise<XMLHttpRequest> {
    return this.http.put('/profile', { data });
  }

  public changeUserAvatarApi(data: UpdateAvatar): Promise<XMLHttpRequest> {
    return this.http.put('/profile/avatar', data);
  }

  public changeUserPasswordApi(data: UpdatePassword): Promise<XMLHttpRequest> {
    return this.http.put('/password', { data });
  }

  public getUserByIdApi(id: number): Promise<XMLHttpRequest> {
    return this.http.get(`/${id}`, {});
  }

  public searchUserByLogin(data: SearchUserByLogin): Promise<XMLHttpRequest> {
    return this.http.post('/search', { data });
  }
}

export default new UserAPI();
