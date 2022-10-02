/* eslint-disable import/prefer-default-export */
import Block from '../../utils/Block';
import './button.css';

interface Props {
  text: string;
  typeFull: boolean;
  link: string;
  events: Object;
}

export class Button extends Block {
  constructor({
    text, typeFull, link,
  }: Props) {
    super({
      text,
      typeFull,
      link,
    });
  }

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
