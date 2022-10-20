/* eslint-disable no-use-before-define */

import Route from './Route';
import { sanitizeUrl } from '../Helpers/myDash';

export default class Router {
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

  private _onRoute(locationPathname: string) {
    const sanitizedPath = sanitizeUrl(locationPathname);
    const route = this.getRoute(sanitizedPath) || this.getRoute('/404');

    // TODO сделать проверку нужна ли роуту авторизация и првоеритть авторизован ли юзер
    // Если не авторизован - отправлять юзера на страницу с ошибкой "401 - требуется авторизация".

    if (!route) {
      return;
    }

    this._currentRoute = route;
    route.render();
  }

  // Переходит на нужный роут и отображает нужный блок
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
  getRoute(pathname: string): RouteType {
    // @ts-expect-error
    return this._routes.find((route: RouteType) => route.match(pathname));
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
