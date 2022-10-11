import Block from '../../utils/Rendering/Block';
import './logo.css';

type Props = {};

export default class Logo extends Block<Props> {
  static componentName: string = 'Logo';

  render() {
    return `
    <div class="logo">
      <a class="logo__link" href="/"><span class="logo__accent-wrapper">EASY</span>TOUCH</a>
    </div>
    `;
  }
}
