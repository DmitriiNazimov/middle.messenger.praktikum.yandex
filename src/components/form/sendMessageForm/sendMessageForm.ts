import { SELECTOR } from '../../../consts';
import { messagesController } from '../../../controllers';
import Form from '../form';
import '../form.css';
import './sendMessageForm.css';

export default class SendMessageForm extends Form {
  static componentName = 'SendMessageForm';

  constructor(props: FormProps) {
    super({
      ...props,
      events: { submit: (event: Event) => this.submitHandler(event) },
    });
  }

  async submitHandler(event: Event) {
    super.submitHandler(event);

    const form = event.target as HTMLFormElement;
    const textArea = form.querySelector(`#${SELECTOR.message}`) as HTMLTextAreaElement;

    const response = await messagesController.sendMessage(textArea.value);

    if (response) {
      textArea.value = '';
    }
  }

  render() {
    return `
    <form class="form send-message__form feed__opened__mobile">
      <span class="send-message__wrapper">
        <textarea required
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
