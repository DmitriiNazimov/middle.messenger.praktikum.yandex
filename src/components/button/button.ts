import Block from '../../utils/Block';
import './button.css';

interface Props {
  text: string;
  typeFull: boolean;
  link: string;
  events?: Object;
}

export default class Button extends Block<Props> {
  static componentName: string = 'Button';

  render() {
    return `
      {{#if typeFull}}
        <button type="submit" class="button button__full">{{text}}</button>
      {{else}}
        <a href="{{link}}" class="button button__empty">{{text}}</a>
      {{/if}}
     `;
  }
}
