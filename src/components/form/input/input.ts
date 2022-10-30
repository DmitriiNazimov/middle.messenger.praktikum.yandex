import Block from '../../../utils/Rendering/Block';
import './input.css';

export default class Input extends Block<InputProps> {
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
