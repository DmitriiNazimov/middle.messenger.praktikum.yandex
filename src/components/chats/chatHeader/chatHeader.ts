import Block from '../../../utils/Block';
import './chatHeader.css';

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
    <div class="chat-header__wrapper">
      <div class="chat-header">
          <div class="chat-header__avatar">
              <img src="{{ avatarPath }}" alt="{{ displayName }}">
          </div>
          <div class="chat-header__username">{{ displayName }}</div>
          <div class="dotsmenu__large">.<br>.<br>.</div>
      </div>
      <div class="delimiter__line"></div>
    </div>
     `;
  }
}
