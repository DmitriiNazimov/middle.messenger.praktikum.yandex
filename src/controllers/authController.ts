/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

import { router, store } from '../utils';
import authAPI, { SignUp, SignIn } from '../api';
import { addNotice, loaderToggle } from '../utils/Helpers/domHelpers';
import { DefaultState } from '../utils/Store/defaultState';

class AuthController {
  // Регистрация
  signUp(data: SignUp): void {
    loaderToggle({ show: true });

    authAPI
      .signUpApi(data)
      .then(({ response }) => {
        store.setState({ isAuthenticated: true, user: { id: JSON.parse(response).id } });
        router.go('/messenger');
        addNotice('Успешная регистрация!', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Авторизация
  signIn(data: SignIn): void {
    loaderToggle({ show: true });

    authAPI
      .signInApi(data)
      .then(() => {
        store.setState({ isAuthenticated: true });
        router.go('/messenger');
        addNotice('Успешная авторизация!', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Разлогинивание
  logout(): void {
    loaderToggle({ show: true });

    authAPI
      .logoutApi()
      .then(() => {
        store.setState({ isAuthenticated: false });
        router.go('/');
        addNotice('Вы вышли из аккаунта', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Получить данные пользователя с сервера.
  getUser({ withLoader = true } = {}): Promise<boolean> {
    if (withLoader) {
      loaderToggle({ show: true });
    }

    return authAPI
      .getUserApi()
      .then(({ response }) => {
        const userData: DefaultState['user'] = JSON.parse(response);
        store.setState({ isAuthenticated: true, user: { ...userData } });

        return true;
      })
      .catch(({ response }) => {
        let noticeText: string = JSON.parse(response).reason;

        // Если куки не валидные - проблемы с авторизацией.
        if (noticeText === 'Cookie is not valid') {
          authAPI.logoutApi();
          router.go('/sign-in');
          noticeText += '\r\n\r\nВойдите в аккаунт или зарегистрируйтесь';
        }

        addNotice(noticeText, 'error');

        return false;
      })
      .finally(() => loaderToggle());
  }
}

export default new AuthController();
