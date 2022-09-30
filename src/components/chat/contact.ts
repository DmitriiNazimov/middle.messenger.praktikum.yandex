import Block from '../../utils/Block';

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
      <div class="contact_row">
        <div class="contact-info {{#if active}}contact-info__active{{/if}}">
            <div class="contact-avatar">
                <div class="contact-pointer"></div>
                <img src="{{ avatarPath }}" alt="{{ displayName }}">
            </div>
            <div class="contact-main-info">
                <div class="contact-username">{{ displayName }}</div>
                <div class="contact-message">{{ lastMsgText }}</div>
            </div>
            <div class="contact-extra-info">
                <div class="contact-message-date">{{ lastMsgDate }}</div>
                {{#if msgCounter}}
                    <div class="contact-message-counter">{{ msgCounter }}</div>
                {{/if}}
            </div>
        </div>
      </div>
     `;
  }
}
