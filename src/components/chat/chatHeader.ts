import Block from '../../utils/Block';

interface Props {
  avatarPath: string;
  displayName: string;
  events: Object;
}

export default class ChatHeader extends Block {
  constructor({ avatarPath, displayName }: Props) {
    super({ avatarPath, displayName });
  }

  render() {
    return `
      <div class="chat-header">
          <div class="contact-avatar">
              <img src="{{ avatarPath }}" alt="{{ displayName }}">
          </div>
          <div class="contact-username">{{ displayName }}</div>
          <div class="dotsmenu__large">.<br>.<br>.</div>
      </div>
     `;
  }
}
