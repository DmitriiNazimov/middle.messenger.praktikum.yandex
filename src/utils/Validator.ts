/* eslint-disable class-methods-use-this */

type InputValue = HTMLInputElement[] & string;
type Errors = {[key: string]: string };

export default class Validator {
  run(inputs: HTMLInputElement[]): {} {
    const errors: Errors = {};

    inputs.forEach((input) => {
      const methodName = `${input.name}Check` as keyof Validator;

      if (this[methodName]) {
        // @ts-ignore
        errors[input.name] = this[methodName](input.value as InputValue);
      }
    });

    return errors;
  }

  loginCheck(value: string) {
    let errorText: string = '';

    if (!/^(?=.{3,20}$)/.test(value)) {
      errorText += 'Логин должен быть от 3 до 20 символов.\r\n';
    }

    if (!/^[a-zA-Z0-9\-_]+$/i.test(value)) {
      errorText += 'Логин может состоять только из латинских символов, цифр, знаков дефиса и нижнего подчеркивания.\r\n';
    }

    if (/^[\d]+$/.test(value)) {
      errorText += 'Логин не может состоять только из цифр.\r\n';
    }

    return errorText;
  }
}
