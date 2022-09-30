import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import './form.css';

interface Props {
  header: string;
  inputs: unknown[];
  buttons: unknown[];
  events: Object;
}

type InputRef = { errorRefName: string; id: string; };

export default class Form extends Block {
  private validator: Validator;

  constructor({ header, inputs, buttons }: Props) {
    super({
      header,
      inputs,
      buttons,
      events: {
        submit: (event: Event) => this.submitHandler(event),
        blur: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
        input: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
        focus: (event: Event) => this.inputChangeHandler(event.target as HTMLInputElement),
      },
    });

    this.validator = new Validator();
    this.addErrorRefNamesToProps();
  }

  inputChangeHandler(target: HTMLInputElement) {
    if (target.tagName === 'INPUT') {
      const errors: Object = this.validator.check([target] as HTMLInputElement[]);

      this.updatePropsAfterValidation(errors);
    }
  }

  submitHandler(event: Event) {
    if (document.querySelectorAll('.input-error-list')?.length) {
      event.preventDefault();
    }

    event.preventDefault();// FIXME временно, пока данные формы выводятся в консоль. Потом убрать.

    const formData = new FormData(event.target as HTMLFormElement);
    // eslint-disable-next-line no-console
    console.log(Object.fromEntries(formData));

    const form = event.target as HTMLFormElement;
    const inputs: Element[] = Array.from(form.querySelectorAll('INPUT'));
    const errors: Object = this.validator.check(inputs as HTMLInputElement[]);
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

  // eslint-disable-next-line class-methods-use-this
  paintErrorsInRed(form: HTMLFormElement) {
    const errElems = Array.from(form.querySelectorAll('.input-error'));
    errElems.forEach((elem) => {
      elem.classList.add('input-error__submitted');
    });
  }

  render() {
    // TODO h3 вынести в данные и тогда changePasswords, avatarChange будут не нужны .
    return `
    <form class="form">
    <h1>{{ header }}</h1>
    
    {{#each inputs}}
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

    {{#if changePasswords}}
        <h3 class="form_header3">Если хотите поменять пароль:</h3>
        {{#each changePasswords}}
            {{> input this}}
        {{/each}}
    {{/if}}

    {{#if avatarChange}}
        <h3 class="form_header3">Если хотите поменять аватар:</h3>
        <div class="form-row">
            <label class="form_label" for="avatar-input">Фото</label>
            <input type="file" class="standart-input" id="avatar-input" name="avatar-input">
        </div>
    {{/if}}

    {{#if buttons}}
        <div class="form-buttons">
            {{#each buttons}}
                {{{ Button text="{{text}}" typeFull=typeFull link="{{link}}"}}}
            {{/each}}
        </div>
    {{/if}}
</form>
     `;
  }
}
