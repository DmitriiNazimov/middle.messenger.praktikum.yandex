import Block from '../../../utils/Block';
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
  events: Object;
}

export default class Input extends Block {
  static componentName: string = 'Input';

  constructor({
    id, title, required, type, pattern, placeholder, value, error,
  }: Props) {
    super({
      placeholder,
      id,
      title,
      required,
      type,
      pattern,
      value,
      error,
    });
  }

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
