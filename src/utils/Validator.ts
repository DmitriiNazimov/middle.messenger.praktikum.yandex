/* eslint-disable class-methods-use-this */

type InputValue = HTMLInputElement[] & string;
type Errors = {[key: string]: string };

export default class Validator {
  check(formItems: HTMLInputElement[] | HTMLTextAreaElement[]): {} {
    const errors: Errors = {};

    formItems.forEach((item) => {
      const rules = `${item.name}Rules` as keyof Validator;
      if (this[rules]) {
        // @ts-expect-error
        errors[item.name] = this[rules](item.value as InputValue);
      }
    });

    return errors;
  }

  loginRules(value: string) {
    let errorText: string = '';
    const errorArr: string[] = [];

    if (!/^(?=.{3,20}$)/.test(value)) {
      errorArr.push('Логин должен быть от 3 до 20 символов.');
    }

    if (!/^[a-zA-Z0-9\-_]+$/i.test(value)) {
      errorArr.push('Логин может состоять только из латинских символов, цифр, знаков дефиса и нижнего подчеркивания.');
    }

    if (/^[\d]+$/.test(value)) {
      errorArr.push('Логин не может состоять только из цифр.');
    }

    if (errorArr.length) errorText = this.stringifyErrors(errorArr);

    return errorText;
  }

  passwordRules(value: string) {
    let errorText: string = '';
    const errorArr: string[] = [];

    if (!/^(?=.{8,40}$)/.test(value)) {
      errorArr.push('Пароль должен быть от 8 до 40 символов.');
    }

    if (!/\d{1,}/.test(value)) {
      errorArr.push('Пароль должен содержать хотя бы одну цифру.');
    }

    if (!/[A-ZА-ЯЁ]{1,}/.test(value)) {
      errorArr.push('Пароль должен содержать хотя бы одну заглавную букву.');
    }

    if (errorArr.length) errorText = this.stringifyErrors(errorArr);

    return errorText;
  }

  first_nameRules(value: string) {
    let errorText: string = '';
    const errorArr: string[] = [];

    if (!/^[а-яёА-ЯЁa-zA-Z-]+$/i.test(value)) {
      errorArr.push('Имя и фамилия могут состоять только из русских или латинских букв, а также дефиса.\r\n');
    }

    if (!/^[A-ZА-ЯЁ]{1}/.test(value)) {
      errorArr.push('Первая буква должна быть заглавной');
    }

    if (errorArr.length) errorText = this.stringifyErrors(errorArr);

    return errorText;
  }

  second_nameRules(value: string) {
    return this.first_nameRules(value);
  }

  emailRules(value: string) {
    let errorText: string = '';
    const errorArr: string[] = [];

    if (!/^[a-zA-Z0-9\-.@]+$/i.test(value)) {
      errorArr.push('Email может состоять только из латинских символов, цифр, дефиса, точки и символа @');
    }

    // После собаки обязательно точка, а перед точкой обязательно буквы
    if (!/@\w+\./.test(value)) {
      errorArr.push('Email должен быть указан в формате yyy<b>@</b>xxx<b>.</b>zz');
    }

    if (errorArr.length) errorText = this.stringifyErrors(errorArr);

    return errorText;
  }

  phoneRules(value: string) {
    let errorText: string = '';
    const errorArr: string[] = [];

    if (!/^(?=.{10,15}$)/.test(value)) {
      errorArr.push('Длина номера телефона должна быть от 10 до 15 символов.');
    }

    if (!/^(\+|\d)[0-9]+$/i.test(value)) {
      errorArr.push('Телефон может состоять только из цифр и знака + в начале.');
    }

    if (errorArr.length) errorText = this.stringifyErrors(errorArr);

    return errorText;
  }

  messageRules(value: string) {
    let errorText: string = '';

    if (!value.length) {
      errorText = 'Поле для отправки сообщения не может быть пустым.';
    }

    return errorText;
  }

  stringifyErrors(errArr: string[]): string {
    const lines = errArr.map((string) => `<li>${string}</li>`).join('');
    return `<ul class='input-error__list'>${lines}</ul>`;
  }
}
