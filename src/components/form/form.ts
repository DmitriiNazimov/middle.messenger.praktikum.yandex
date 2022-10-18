/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { Block } from '../../utils';
import Validator from '../../utils/Helpers/Validator';
import './form.css';

type Props = {
  header: string,
  inputs: {
    title: string,
    type: string,
    id: string,
    placeholder?: string,
    value?: string,
    required?: boolean
    inputHeader?: string,
    errorRefName: string
  }[],
  buttons: {
    typeFull: boolean,
    text: string,
    link: string
  }[]
  events?: {};
}

type InputRef = { errorRefName: string; id: string; };

export default class Form extends Block<Props> {
  static componentName: string = 'Form';

  protected validator: Validator;

  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (event: Event) => this.submitHandler(event),
        blur: (event: Event) => this.inputFocusBlurHandler(event.target as HTMLInputElement),
        input: (event: Event) => this.inputFocusBlurHandler(event.target as HTMLInputElement),
        focus: (event: Event) => this.inputFocusBlurHandler(event.target as HTMLInputElement),
      },
    });

    this.validator = new Validator();

    // Добавляем инпутам наименования refs для элемента с выводом ошибок
    if (props.inputs) {
      this.addErrorRefNamesToProps();
    }
  }

  inputFocusBlurHandler(target: HTMLInputElement) {
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const validateData: Object = this.validator.check([target] as HTMLInputElement[]);
      this.updatePropsAfterValidation(validateData);
    }
  }

  submitHandler(event: Event) {
    if (document.querySelectorAll('.input-error__list')?.length) {
      event.preventDefault();
    }

    // Выводим данные формы в консоль.
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));

    // Проводим валидацию всех элементов формы
    const form = event.target as HTMLFormElement;

    const formItems: Element[] = Array.from(form.querySelectorAll('INPUT, TEXTAREA'));

    const validateData: Object = this.validator.check(formItems as HTMLInputElement[]);

    this.updatePropsAfterValidation(validateData, true);
  }

  updatePropsAfterValidation(props: Object, formSubmitted: boolean = false) {
    // Обновление props вызывает перерендер элемента и ошибка выводится/исчезает на странице.
    Object.entries(props).forEach(([name, errors]) => {
      if (name === 'isCorrect') {
        return;
      }

      this._refs[`${name}Error`].setProps({ errors, formSubmitted });
    });
  }

  addErrorRefNamesToProps() {
    const newProps = this._props;

    // eslint-disable-next-line no-param-reassign
    newProps.inputs.forEach((input: InputRef) => { input.errorRefName = `${input.id}Error`; });

    this.setProps(newProps.inputs);
  }

  render() {
    return `
    <form class="form">
      {{#if header}}
        <h1>{{ header }}</h1>
      {{/if}} 

      {{#each inputs}}
        {{#if inputHeader}}
          <h3 class="form__input-header">{{inputHeader}}</h3>
        {{/if}}  
        <div class="form__row">
          <label class="form__label" for="{{ id }}">{{ title }}{{#if required}}<em>*</em>{{/if}}</label>
            {{{ Input
                placeholder="{{placeholder}}" 
                title="{{title}}" 
                type="{{type}}" 
                id="{{id}}"
                required=required
                value=value
            }}}
            {{{ InputError errors=errors formSubmitted=formSubmitted ref=errorRefName }}}
        </div>
      {{/each}}

      {{#if buttons}}
          <div class="form__buttons-wrapper">
              {{#each buttons}}
                  {{{ Button text="{{text}}" typeFull=typeFull link="{{link}}"}}}
              {{/each}}
          </div>
      {{/if}}
    </form>
     `;
  }
}
