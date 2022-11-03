import Block from '../../utils/Rendering/Block';
import './logo.css';

export default class Logo extends Block {
  static componentName = 'Logo';

  render() {
    return `
    <div class="logo">
      <a class="logo__link" href="/"><span class="logo__accent-wrapper">EASY</span>TOUCH</a>
    </div>
    `;
  }
}
