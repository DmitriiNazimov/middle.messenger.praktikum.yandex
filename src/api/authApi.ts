/* eslint-disable no-unused-vars */
import BaseApi from './baseApi';

type SignUp = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

type SignIn = {
  login: string;
  password: string;
}

class AuthAPI extends BaseApi {
  constructor() {
    super('/auth');
  }

  public signUp(data: SignUp): Promise<XMLHttpRequest> {
    return this.http.post('/signup', { data });
  }

  public signIn(data: SignIn): Promise<XMLHttpRequest> {
    return this.http.post('/signin', { data });
  }

  public getUser(): Promise<XMLHttpRequest> {
    return this.http.get('/user', {});
  }

  public signOut(): Promise<XMLHttpRequest> {
    return this.http.post('/logout', {});
  }
}
