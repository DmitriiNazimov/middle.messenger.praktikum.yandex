/* eslint-disable import/prefer-default-export */
import Block from '../../utils/Block';
import './logo.css';

export class Logo extends Block {
  static componentName: string = 'Logo';

  render() {
    return `
    <div class="logo">
      <a class="logo__link" href="/"><span class="logo__accent-wrapper">EASY</span>TOUCH</a>
    </div>
    `;
  }
}
