/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import './form.css';

interface Props {
  header: string;
  inputs: unknown[];
  buttons: unknown[];
  sendMessageForm: boolean;
  events: Object;
}

type InputRef = { errorRefName: string; id: string; };

export default class Form extends Block {
  private validator: Validator;

  constructor({
    header, inputs, buttons, sendMessageForm,
  }: Props) {
    super({
      header,
      inputs,
      buttons,
      sendMessageForm,
      events: {
        submit: (event: Event) => this.submitHandler(event),
        blur: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
        input: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
        focus: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
      },
    });

    this.validator = new Validator();

    // Добавляем инпутам наименования refs для элемента с ошибками
    if (inputs) this.addErrorRefNamesToProps();
  }

  inputChangeHandler(target: HTMLInputElement) {
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const errors: Object = this.validator.check([target] as HTMLInputElement[]);

      this.updatePropsAfterValidation(errors);
    }
  }

  submitHandler(event: Event) {
    if (document.querySelectorAll('.input-error-list')?.length) {
      event.preventDefault();
    }

    // Выводим данные формы в консоль.
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));

    // Проводим валидацию всех элементов формы
    const form = event.target as HTMLFormElement;

    let formItems: Element[] = Array.from(form.querySelectorAll('INPUT'));

    if (!this.props.inputs) {
      formItems = Array.from(form.querySelectorAll('TEXTAREA'));
    }

    const errors: Object = this.validator.check(formItems as HTMLInputElement[]);
    this.updatePropsAfterValidation(errors);
    this.paintErrorsInRed(form);
  }

  updatePropsAfterValidation(errors: Object) {
    Object.entries(errors).forEach(([name, errorText]) => {
      this.refs[`${name}Error`].setProps({ error: errorText });
    });
  }

  addErrorRefNamesToProps() {
    const newProps = this.props;
    // eslint-disable-next-line no-param-reassign
    newProps.inputs.forEach((input: InputRef) => { input.errorRefName = `${input.id}Error`; });
    this.setProps(newProps);
  }

  paintErrorsInRed(form: HTMLFormElement) {
    const errElems = Array.from(form.querySelectorAll('.input-error'));
    errElems.forEach((elem) => {
      elem.classList.add('input-error__submitted');
    });
  }

  render() {
    return `
    <form class="form">
    {{#if header}}
      <h1>{{ header }}</h1>
    {{/if}} 

    {{#each inputs}}
      {{#if header3}}
        <h3 class="form_header3">{{header3}}</h3>
      {{/if}}  
      <div class="form-row">
        <label class="form_label" for="{{ id }}">{{ title }}{{#if required}}<em>*</em>{{/if}}</label>
          {{{ Input
              placeholder="{{placeholder}}" 
              title="{{title}}" 
              type="{{type}}" 
              id="{{id}}"
              required=required
              value=value
          }}}
          {{{ InputError error=error ref=errorRefName }}}
      </div>
    {{/each}}

    {{#if buttons}}
        <div class="form-buttons">
            {{#each buttons}}
                {{{ Button text="{{text}}" typeFull=typeFull link="{{link}}"}}}
            {{/each}}
        </div>
    {{/if}}

    {{#if sendMessageForm }}
        <div class="send-message-wrapper">
          <span class="send-message-wrapper-inner">
            <textarea
              id="message"
              name="message"
              rows="1"
              placeholder="Напишите ваше сообщение здесь..."
            ></textarea>
            <div class="button-wrapper">
              <button type="submit" class="button-form button-form__full button-send-msg">
                <span class="icon-send-msg">↳</span>
              </button>
            </div>
          </span>
        {{{ InputError error=error ref="messageError" messageError="true" }}}
        </div>
    {{/if}}
</form>
     `;
  }
}
