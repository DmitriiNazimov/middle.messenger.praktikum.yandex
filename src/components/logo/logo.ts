/* eslint-disable import/prefer-default-export */
import Block from '../../utils/Block';
import './logo.css';

export class Logo extends Block {
  render() {
    return `
    <div class="logo">
      <a class="logo-link" href="/"><span class="accent-wrapper">EASY</span>TOUCH</a>
    </div>
    `;
  }
}
