import { Block } from '../../utils';
import './button.css';

export default class Button extends Block<ButtonProps> {
  static componentName: string = 'Button';

  render() {
    return `
      {{#if typeFull}}
        <button type="submit"{{#if id}} id="{{id}}"{{/if}} class="button button__full">{{text}}</button>
      {{else}}
        <a href="{{link}}"{{#if id}} id="{{id}}"{{/if}} class="button button__empty">{{text}}</a>
      {{/if}}
     `;
  }
}
