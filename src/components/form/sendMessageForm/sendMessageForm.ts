/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Form from '../form';
import '../form.css';
import './sendMessageForm.css';

export default class SendMessageForm extends Form {
  render() {
    return `
    <form class="form send-message__form">
      <span class="send-message__wrapper">
        <textarea
          id="message"
          name="message"
          rows="1"
          placeholder="Напишите ваше сообщение здесь..."
        ></textarea>
        <div class="send-message__button-wrapper">
          <button type="submit" class="button button__full button-send-msg">
            <span class="icon-send-msg">↳</span>
          </button>
        </div>
      </span>
      {{{ InputError error=error ref="messageError" sendMessageError="true" }}}
    </form>
     `;
  }
}
