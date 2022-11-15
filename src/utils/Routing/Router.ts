/* eslint-disable no-use-before-define */

import Route from './Route';
import { sanitizeUrl } from '../Helpers/myDash';
import { routes, store } from '..';
import { authController } from '../../controllers';
import { SELECTOR } from '../../consts';

class Router {
  _routes: RouteType[] = [];

  history: History = window.history;

  private _currentRoute: RouteType = null;

  private _rootSelector = SELECTOR.rootId;

  static __instance: Router;

  constructor(rootSelector = SELECTOR.rootId) {
    /* eslint-disable no-constructor-return */
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootSelector = rootSelector;

    Router.__instance = this;
  }

  // Регистрирует роуты связывая их с компонентами.
  use(props: RouteProps) {
    if (!Object.prototype.hasOwnProperty.call(props, 'rootSelector')) {
      Object.assign(props, { rootSelector: `#${this._rootSelector}` });
    }

    const route: RouteType = new Route(props);

    this._routes.push(route);
    return this;
  }

  // Запускает роутинг и потом реагирует на изменения в адресной строке вызывая перерисовку
  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);

    // Отменяем дефолтный переход по ссылкам. Активируем переход через router.go()
    document.querySelector(`#${this._rootSelector}`)?.addEventListener('click', this.сlickLinkHandler);
  }

  private async _onRoute(locationPathname: string) {
    const sanitizedPath = sanitizeUrl(locationPathname);
    const route = this._getRoute(sanitizedPath) || this._getRoute('/404');

    if (!route) {
      throw new Error(`Route по пути ${sanitizedPath} не обнаружен.`);
    }

    // Проверка авторизации.
    // Если не залогинен - отправляем на страницу логина.
    if (route.requestAuthorization && store.state.isAuthenticated === false) {
      const isMainPage = route.pathname === routes.index.pathname;

      const response: boolean = await authController.getUser({ isAuthPage: isMainPage });

      if (!response) {
        this.go(routes.login.pathname);
        return;
      }
      // Если залогинен страницы авторизации и регистрации д.б. недоступны.
    } else if (route.pathname === routes.login.pathname
      || route.pathname === routes.registration.pathname) {
      if (store.state.isAuthenticated === true
        || await authController.getUser({ isAuthPage: true })) {
        this.go(routes.alreadyAuthorized.pathname);
        return;
      }
    }

    this._currentRoute = route;
    route.render();
  }

  // Переходит на роут и отображает нужный блок.
  go(pathname: string) {
    const sanitizedPath = sanitizeUrl(pathname);

    if (this._currentRoute?.pathname === sanitizedPath) {
      return;
    }

    this.history.pushState({}, '', sanitizedPath);
    this._onRoute(sanitizedPath);
  }

  // Обновляет содержимое страницы переходом на текущий роут.
  refresh() {
    if (this._currentRoute?.pathname) {
      this._onRoute(this._currentRoute?.pathname);
    }
  }

  // Возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию
  back() {
    this.history.back();
  }

  // Переходит в следующие состояние и показывает соответствующий блок
  forward() {
    this.history.forward();
  }

  // Возвращает конкретный роут
  private _getRoute(pathname: string): RouteType {
    const sanitizedPath = sanitizeUrl(pathname);
    // @ts-expect-error Type 'undefined' is not assignable to type 'RouteType'
    return this._routes.find((route: RouteType) => route.match(sanitizedPath));
  }

  // Отменяет дефолтный переход по ссылке. Активирует переход через router.go().
  сlickLinkHandler = (event: Event) => {
    const link = (event.target as HTMLElement).closest('A');

    if (link instanceof HTMLAnchorElement) {
      event.preventDefault();
      const sanitizedPath = sanitizeUrl(link.pathname);
      this.go(sanitizedPath);
    }
  };
}

export default new Router();
