import { router, routes, store } from '../utils';
import { authAPI, SignUp, SignIn } from '../api';
import { addNotice, loaderToggle } from '../utils/Helpers/viewHelpers';
import { DefaultState } from '../utils/Store/defaultState';

class AuthController {
  // Регистрация
  signUp(data: SignUp): void {
    loaderToggle({ show: true });

    authAPI
      .signUpApi(data)
      .then(({ response }): void => {
        store.setState({ isAuthenticated: true, user: { id: JSON.parse(response).id } });
        router.go(routes.chats.pathname);
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
        router.go(routes.chats.pathname);
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
        router.go(routes.login.pathname);
        addNotice('Вы вышли из аккаунта', 'success');
      })
      .catch(({ response }) => addNotice(JSON.parse(response).reason, 'error'))
      .finally(() => loaderToggle());
  }

  // Получить данные пользователя с сервера.
  getUser({ withLoader = true, isAuthPage = false } = {}): Promise<boolean> {
    if (withLoader) {
      loaderToggle({ show: true });
    }

    return authAPI
      .getUserApi()
      .then(({ response }): boolean => {
        const userData: DefaultState['user'] = JSON.parse(response);
        store.setState({ isAuthenticated: true, user: { ...userData } });

        return true;
      })
      .catch(({ response }): boolean => {
        let noticeText: string = JSON.parse(response).reason;

        // Если куки не валидные - проблемы с авторизацией.
        if (noticeText === 'Cookie is not valid' && !isAuthPage) {
          authAPI.logoutApi();
          router.go(routes.login.pathname);
          noticeText += '\r\n\r\nВойдите в аккаунт или зарегистрируйтесь';
        } else if (noticeText === 'Cookie is not valid' && isAuthPage) {
          return false;
        }

        addNotice(noticeText, 'error');

        return false;
      })
      .finally(() => loaderToggle());
  }
}

export default new AuthController();
