/* eslint-disable class-methods-use-this */
import './createChatForm.css';
import Block from '../../../utils/Rendering/Block';
import { formIsValid, toggle } from '../../../utils/Helpers/viewHelpers';
import { CreateChat } from '../../../api';
import { chatsController } from '../../../controllers';
import { data, Selector } from './defaultProps';

export default class CreateChatForm extends Block<FormProps> {
  static componentName: string = 'CreateChatForm';

  constructor(props: FormProps) {
    super({
      ...data,
      ...props,
      events: {
        click: (event: Event) => this.clickHandler(event),
        submit: (event: Event) => this.submitHandler(event),
      },
    });
  }

  // По клику открывается форма создания нового чата.
  clickHandler(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest(`.${Selector.createButton}`)) {
      const formWrapper: HTMLFormElement = document.querySelector(`.${Selector.formWrapper}`)!;
      toggle(formWrapper);
      toggle(target);
      (formWrapper.querySelector(`#${Selector.inputId}`) as HTMLInputElement).focus();
    }
  }

  // Форма отправки данных для создания нового чата.
  submitHandler(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input: HTMLInputElement = form.querySelector(`#${Selector.inputId}`)!;

    if (formIsValid(form) && input) {
      const formData = Object.fromEntries(new FormData(form)) as CreateChat;
      chatsController.createChat(formData);
    }
  }

  render() {
    return `
    <section>
      <div class="delimiter__line"></div>
        <div class="create-chat__wrapper">
            <button class="button button__full ${Selector.createButton}">Создать чат</button>
            <div class="${Selector.formWrapper} hide">
            {{{ Form 
              inputs=inputs 
              buttons=buttons
            }}}
            </div>
        </div>
        <div class="delimiter__line"></div>
    </section>
     `;
  }
}
