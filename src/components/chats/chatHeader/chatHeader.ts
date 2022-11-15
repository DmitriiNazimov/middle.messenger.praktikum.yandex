import { SELECTOR } from '../../../consts';
import Block from '../../../utils/Rendering/Block';
import './chatHeader.css';

export default class ChatHeader extends Block<ChatHeaderProps> {
  static componentName = 'ChatHeader';

  render() {
    return `
    <div class="${SELECTOR.chatHeader.wrapper} feed__opened__mobile">
      <p class="chat-header__back-link"><a href="#">< Назад</a></p>
      <div class="chat-header">
          <div class="chat-header__avatar">
              <img src="{{ avatarPath }}" alt="{{ displayName }}">
          </div>
          <div class="chat-header__username">{{ displayName }}</div>
          {{{ChatMenu}}}
      </div>
      <div class="delimiter__line"></div>
    </div>
     `;
  }
}
