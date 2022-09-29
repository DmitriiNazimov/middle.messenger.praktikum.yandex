/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _meta: {props: {}, events?: {[key: string]: Function}};

  protected children: {[id: string]: Block} = {};

  protected _element: HTMLElement | null = null;

  public id = nanoid(6);

  protected props: any;

  protected state: any = {};

  protected refs: {[key: string]: Block} = {};

  private eventBus: () => EventBus<string, Function>;

  constructor(props?: any) {
    const eventBus = new EventBus();

    this._meta = {
      props,
    };

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props);
    // console.log(this.props);

    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<string, Function>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: any) {
    this.componentDidMount(props);
  }

  // Может переопределять пользователь
  componentDidMount(props: any) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Object, newProps: Object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь
  componentDidUpdate(oldProps: Object, newProps: Object) {
    return true;
  }

  setProps = (nextProps: Object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element(): HTMLElement {
    return this._element!;
  }

  _render() {
    // TODO сюда вернутся и скопировать от Моргунова.

    const fragment = this._compile();

    this._removeEvents();

    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  // Может переопределять пользователь
  protected render():string {
    return '';
  }

  getContent(): HTMLElement {
    // TODO у моргунова много написано, но вроде как не надо это. Какой-то хак.
    return this.element;
  }

  _makePropsProxy(props: Object) {
    const self = this;

    return new Proxy(props, {
      get(objProps: Object, prop: keyof Object) {
        if (typeof objProps[prop] === 'function') {
          return objProps[prop].bind(objProps);
        }

        return objProps[prop];
      },
      set(objProps: Object, prop: keyof Object, value) {
        // eslint-disable-next-line no-param-reassign
        objProps[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...objProps }, objProps);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener as any);
    });
  }

  _addEvents() {
    const { events }: {[key: string]: Function} = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener as any, true);
    });
  }

  show() {
    this._element?.classList.remove('hide');
  }

  hide() {
    this._element?.classList.add('hide');
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());

    // console.log(this.props);

    fragment.innerHTML = template({
      ...this.state, ...this.props, children: this.children, refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }
}
