/* eslint-disable import/prefer-default-export */
import Block from '../../utils/Block';

// import './layout.css';

export class Layout extends Block {
  protected render(): string {
    return `
      <div>
        <div data-layout=1></div>
      </div>
    `;
  }
}
