import Block from '../../../utils/Rendering/Block';
import './message.css';

type Props = {
  time: string;
  text: string;
  imgPath: string;
  outgoing: boolean;
  readed: boolean;
  events?: Record<string, unknown>;
};

export default class Message extends Block<Props> {
  static componentName = 'Message';

  render() {
    return `
     <div class="msg{{#if outgoing }} msg__outgoing {{else}} msg__incoming{{/if}}{{#if isLast }} msg__last-msg{{/if}}">
        {{#if text }}
          <div class="msg__text">{{ text }}</div>
        {{/if}}
        {{#if imgPath }}
          <img src="{{ imgPath }}" alt="Изображение от собеседника" class="msg__image">
        {{/if}}
        <div class="msg__info">
            {{#if outgoing }}
                <span class="msg__readed {{#if readed }} msg__readed__active {{/if}} ">.</span>
            {{/if}}
            <span class="msg__time">{{ time }}</span>
        </div>
     </div>
     `;
  }
}
