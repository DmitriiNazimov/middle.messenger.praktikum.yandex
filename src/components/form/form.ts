import { Block } from '../../utils';
import { addNotice } from '../../utils/Helpers/viewHelpers';
import Validator from '../../utils/Helpers/Validator';
import './form.css';

type InputRef = { errorRefName?: string; id: string; };

export default class Form extends Block<FormProps> {
  static componentName = 'Form';

  protected validator: Validator;

  constructor(props: FormProps) {
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
      const validateData: UnknownObj = this.validator.check([target]);
      this.updatePropsAfterValidation(validateData);
    }
  }

  submitHandler(event: Event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }

    // Проводим валидацию всех элементов формы
    const form = event.target;

    const formItems: HTMLInputElement[] = Array.from(form.querySelectorAll('INPUT, TEXTAREA'));

    const validateData: ValidateResult = this.validator.check(formItems);

    if (!validateData.isCorrect) {
      addNotice('Данные формы заполнены некорректно', 'error');
    }

    this.updatePropsAfterValidation(validateData, true);
  }

  updatePropsAfterValidation(props: Record<string, unknown>, formSubmitted = false) {
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

    newProps.inputs.forEach((input: InputRef) => {
      input.errorRefName = `${input.id}Error`;
    });

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
                  {{{ Button text="{{text}}" typeFull=typeFull link="{{link}}" id=id}}}
              {{/each}}
          </div>
      {{/if}}
    </form>
     `;
  }
}
