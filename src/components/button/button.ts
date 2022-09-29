/* eslint-disable import/prefer-default-export */
import Block from '../../utils/Block';
import './button.css';

interface Props {
  text: string;
  typeEmpty: boolean;
  typeFull: boolean;
  link: string;
  events: Object;
}

export class Button extends Block {
  constructor({
    text, typeEmpty, typeFull, link,
  }: Props) {
    super({
      text,
      typeEmpty,
      typeFull,
      link,
    });
  }

  render() {
    return `
      {{#if typeFull}}
        <button type="submit" class=" button-form button-form__full">{{text}}</button>
      {{else}}
        <a href="{{link}}" class="button-form button-form__empty">{{text}}</a>
      {{/if}}
     `;
  }
}
