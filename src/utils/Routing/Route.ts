import renderDOM from '../Rendering/renderDOM';

export default class Route {
  pathname: string;

  private _blockClass: BlockClass;

  private _block: BlockComponent | null;

  private _rootSelector?: string;

  private _title?: string;

  private _blockData: Record<string, unknown>;

  requestAuthorization: boolean;

  constructor(props: RouteProps) {
    this.pathname = props.pathname;
    this._blockClass = props.blockClass;
    this._blockData = props.data || {};
    this._rootSelector = props.rootSelector;
    this._title = props.title;
    this._block = null;
    this.requestAuthorization = props.requestAuthorization;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._blockData);
    }

    if (!this._block) {
      throw new Error(`Route.render(): this._block is not a Component. this._blockClass: ${this._blockClass}`);
    }

    renderDOM(this._block, this._title, this._rootSelector);
  }
}
