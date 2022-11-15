import Block from '../../../utils/Rendering/Block';
import './contact.css';

export default class Contact extends Block<ContactProps> {
  static componentName = 'Contact';

  render() {
    return `
        <div class="contact__row{{#if active}} contact__row__active{{/if}}"{{#if chatId}} data-chat-id="{{chatId}}"{{/if}}>
            <div class="contact__avatar">
                <div class="contact__pointer {{#unless active}}hide{{/unless}}"></div>
                <img src="{{ avatarPath }}" alt="{{ displayName }}">
            </div>
            <div class="contact__main-info">
                <div class="contact__username">{{ displayName }}</div>
                <div class="contact__message">{{#if lastMsgPrefix}}<strong>{{lastMsgPrefix}}</strong>{{/if}} {{ lastMsgText }}</div>
            </div>
            <div class="contact__extra-info">
                <div class="contact__message-date">{{ lastMsgDate }}</div>
                {{#if msgCounter}}
                    <div class="contact__message-counter">{{ msgCounter }}</div>
                {{/if}}
            </div>
        </div>
     `;
  }
}
