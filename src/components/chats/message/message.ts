import Block from '../../../utils/Block';
import './message.css';

type Props = {
  time: string;
  text: string;
  imgPath: string;
  outgoing: boolean;
  delivered: boolean;
  readed: boolean;
  events: Object;
}

export default class Message extends Block {
  static componentName: string = 'Message';

  constructor({
    time, text, imgPath, outgoing, delivered, readed,
  }: Props) {
    super({
      time, text, imgPath, outgoing, delivered, readed,
    });
  }

  render() {
    return `
     <div class="msg {{#if outgoing }} msg__outgoing {{else}} msg__incoming {{/if}}">
        {{#if text }}
          <div class="msg__text">{{ text }}</div>
        {{/if}}
        {{#if imgPath }}
          <img src="{{ imgPath }}" alt="Изображение от собеседника" class="msg__image">
        {{/if}}
        <div class="msg__info">
            {{#if outgoing }}
                <span class="msg__delivered {{#if delivered }} msg__delivered__active {{/if}}">.</span>
                <span class="msg__readed {{#if readed }} msg__readed__active {{/if}} ">.</span>
            {{/if}}
            <span class="msg__time">{{ time }}</span>
        </div>
     </div>
     `;
  }
}
