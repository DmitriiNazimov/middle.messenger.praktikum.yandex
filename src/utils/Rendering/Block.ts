/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block<Props extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static componentName: string;

  protected _children: {[id: string]: Block<Props>} = {};

  protected _element: HTMLElement | null = null;

  public id = nanoid(6);

  protected _props: Props;

  protected _refs: Record<string, Block<Props>> = {};

  private _eventBus: () => EventBus<string, Function>;

  constructor(props?: Props) {
    const eventBus = new EventBus();

    this._props = this.makePropsProxy(props) as Props;

    this._eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this._props);
  }

  private registerEvents(eventBus: EventBus<string, Function>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    this._element = this.createDocumentElement('div');
  }

  protected init() {
    this.createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this._props);
  }

  private _componentDidMount(props: any) {
    this.componentDidMount(props);
  }

  // Может переопределять пользователь
  protected componentDidMount(props: any) {}

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Object, newProps: Object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь
  protected componentDidUpdate(oldProps: Object, newProps: Object) {
    return true;
  }

  public setProps = (nextProps: Object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._props, nextProps);
  };

  private _render() {
    const fragment = this.compile();

    this.removeEvents();

    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this.addEvents();
  }

  // Может переопределять пользователь
  protected render(): string {
    return '';
  }

  get element(): HTMLElement {
    return this._element!;
  }

  getContent(): HTMLElement {
    return this.element;
  }

  private makePropsProxy(props: Object = {}) {
    return new Proxy(props, {
      get: (objProps: Object, prop: keyof Object) => {
        if (typeof objProps[prop] === 'function') {
          return objProps[prop].bind(objProps);
        }

        return objProps[prop];
      },

      set: (objProps: Object, prop: keyof Object, value) => {
        // eslint-disable-next-line no-param-reassign
        objProps[prop] = value;
        this._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...objProps }, objProps);
        return true;
      },

      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private removeEvents() {
    const { events } = this._props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener as any);
    });
  }

  private addEvents() {
    const { events }: Record<string, Function> = this._props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener, true);
    });
  }

  public show() {
    this._element?.classList.remove('hide');
  }

  public hide() {
    this._element?.classList.add('hide');
  }

  private compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
      ...this._props, children: this._children, refs: this._refs,
    });

    // Заменяем заглушки на компоненты
    Object.entries(this._children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      // Заменяем заглушку на component._element
      const content = component.getContent();
      stub.replaceWith(content);

      // Ищем элемент layout-а, куда вставлять детей
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }
}
