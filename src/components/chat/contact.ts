import Block from '../../utils/Block';
import './contact.css';

interface Props {
  active: boolean;
  avatarPath: string;
  displayName: string;
  lastMsgText: string;
  lastMsgDate: string;
  msgCounter: number;
  events: Object;
}

export default class Contact extends Block {
  constructor({
    active, avatarPath, displayName, lastMsgText, lastMsgDate, msgCounter,
  }: Props) {
    super({
      active,
      avatarPath,
      displayName,
      lastMsgText,
      lastMsgDate,
      msgCounter,
    });
  }

  render() {
    return `
        <div class="contact__row {{#if active}}contact__row__active{{/if}}">
            <div class="contact__avatar">
                <div class="contact-pointer"></div>
                <img src="{{ avatarPath }}" alt="{{ displayName }}">
            </div>
            <div class="contact__main-info">
                <div class="contact__username">{{ displayName }}</div>
                <div class="contact__message">{{ lastMsgText }}</div>
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
