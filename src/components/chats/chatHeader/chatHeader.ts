import Block from '../../../utils/Rendering/Block';
import './chatHeader.css';

type Props = {
  avatarPath: string;
  displayName: string;
  events?: Object;
}

export default class ChatHeader extends Block<Props> {
  static componentName: string = 'ChatHeader';

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
