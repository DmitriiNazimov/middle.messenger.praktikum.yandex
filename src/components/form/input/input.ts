import Block from '../../../utils/Rendering/Block';
import './input.css';

type Props = {
  id: string;
  title: string;
  required: boolean;
  type: string;
  pattern: string;
  placeholder: string;
  value: string;
  error: string;
  events?: Object;
}

export default class Input extends Block<Props> {
  static componentName: string = 'Input';

  render() {
    return `
      <input class="standart-input" type="{{ type }}" id="{{ id }}" name="{{ id }}" 
      {{#if pattern}}pattern="{{pattern}}"{{/if}} 
      {{#if placeholder}}placeholder="{{ placeholder }}" {{/if}}
      {{#if value}}value="{{ value }}" {{/if}}
      {{#if required}}required{{/if}}>
     `;
  }
}
