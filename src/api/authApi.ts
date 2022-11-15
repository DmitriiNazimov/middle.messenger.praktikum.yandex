import BaseApi from './baseApi';

export type SignUp = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export type SignIn = {
  login: string;
  password: string;
}

class AuthAPI extends BaseApi {
  constructor() {
    super('/auth');
  }

  public signUpApi(data: SignUp): Promise<XMLHttpRequest> {
    return this.http.post('/signup', { data });
  }

  public signInApi(data: SignIn): Promise<XMLHttpRequest> {
    return this.http.post('/signin', { data });
  }

  public getUserApi(): Promise<XMLHttpRequest> {
    return this.http.get('/user');
  }

  public logoutApi(): Promise<XMLHttpRequest> {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
