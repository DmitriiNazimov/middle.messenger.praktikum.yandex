/* eslint-disable no-use-before-define */

import Route from './Route';
import { sanitizeUrl } from '../Helpers/myDash';
import { store } from '..';
import authController from '../../controllers';

class Router {
  _routes: RouteType[] = [];

  history: History = window.history;

  private _currentRoute: RouteType = null;

  private _rootSelector: string = '#app';

  static __instance: Router;

  constructor(rootSelector: string = '#app') {
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
      Object.assign(props, { rootSelector: this._rootSelector });
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
    document.querySelector(this._rootSelector)?.addEventListener('click', this.сlickLinkHandler);
  }

  private async _onRoute(locationPathname: string) {
    const sanitizedPath = sanitizeUrl(locationPathname);
    const route = this._getRoute(sanitizedPath) || this._getRoute('/404');

    if (!route) {
      return;
    }

    // Проверка авторизации.
    if (route.requestAuthorization && store.state.isAuthenticated === false) {
      const response: boolean = await authController.getUser();

      if (!response) {
        return;
      }
    }

    this._currentRoute = route;
    route.render();
  }

  // Переходит на роут и отображает нужный блок
  go(pathname: string) {
    const sanitizedPath = sanitizeUrl(pathname);

    if (this._currentRoute?.pathname === sanitizedPath) {
      return;
    }

    this.history.pushState({}, '', sanitizedPath);
    this._onRoute(sanitizedPath);
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
    // @ts-expect-error
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
