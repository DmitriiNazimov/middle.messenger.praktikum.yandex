/* eslint-disable no-use-before-define */

import Route from './Route';

export default class Router {
  _routes: RouteType[] = [];

  history: History = window.history;

  private _currentRoute: RouteType = null;

  private _rootSelector?: string;

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
    Object.assign(props, { rootSelector: this._rootSelector });

    const route: RouteType = new Route(props);

    this._routes.push(route);
    return this;
  }

  // Запускает роутинг и потом реагирует на изменения в адресной строке вызывая перерисовку
  start() {
    // eslint-disable-next-line no-unused-vars
    window.onpopstate = (event: Event) => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);

    // Отменяем дефолтный переход по ссылкам. Активируем переход через router.go()
    document.querySelector(this._rootSelector!)?.addEventListener('click', this.сlickLinkHandler);
  }

  private _onRoute(locationPathname: string) {
    const route = this.getRoute(locationPathname) || this.getRoute('/404');


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
    if (this._currentRoute?.pathname === pathname) {
      return;
    }

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
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
    const target = event.target as HTMLElement;
    const link = (target.tagName === 'A') ? target : target.parentNode;

    if (link instanceof HTMLAnchorElement) {
      event.preventDefault();
      this.go(link.pathname);
    }
  };
}
