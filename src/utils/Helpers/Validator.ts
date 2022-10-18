/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

type InputValue = HTMLInputElement[] & string;
type Result = Record<string, string[] | boolean>;

// eslint-disable-next-line no-shadow
enum Rules {
        login = 'loginRules',
        password = 'passwordRules',
        first_name = 'firstNameRules',
        second_name = 'secondNameRules',
        email = 'emailRules',
        phone = 'phoneRules',
        message = 'messageRules'
}

type Rule = keyof typeof Rules;

export default class Validator {
  check(formItems: HTMLInputElement[] | HTMLTextAreaElement[]): {} {
    const result: Result = { isCorrect: true };

    formItems.forEach((item) => {
      const rules = `${Rules[item.name as Rule]}` as keyof Validator;

      if (this[rules]) {
        const ruleChecked = this[rules](item.value as InputValue) as string[];
        result[item.name] = ruleChecked;
        if (ruleChecked.length) result.isCorrect = false;
      }
    });

    return result;
  }

  loginRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^(?=.{3,20}$)/.test(value)) {
      errors.push('Логин должен быть от 3 до 20 символов.');
    }

    if (!/^[a-zA-Z0-9\-_]+$/i.test(value)) {
      errors.push('Логин может состоять только из латинских символов, цифр, знаков дефиса и нижнего подчеркивания.');
    }

    if (/^[\d]+$/.test(value)) {
      errors.push('Логин не может состоять только из цифр.');
    }

    return errors;
  }

  passwordRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^(?=.{8,40}$)/.test(value)) {
      errors.push('Пароль должен быть от 8 до 40 символов.');
    }

    if (!/\d{1,}/.test(value)) {
      errors.push('Пароль должен содержать хотя бы одну цифру.');
    }

    if (!/[A-ZА-ЯЁ]{1,}/.test(value)) {
      errors.push('Пароль должен содержать хотя бы одну заглавную букву.');
    }

    return errors;
  }

  firstNameRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^[а-яёА-ЯЁa-zA-Z-]+$/i.test(value)) {
      errors.push('Имя и фамилия могут состоять только из русских или латинских букв, а также дефиса.');
    }

    if (!/^[A-ZА-ЯЁ]{1}/.test(value)) {
      errors.push('Первая буква должна быть заглавной');
    }

    return errors;
  }

  secondNameRules(value: string): string[] {
    return this.firstNameRules(value);
  }

  emailRules(value: string) {
    const errors: string[] = [];

    if (!/^[a-zA-Z0-9\-.@]+$/i.test(value)) {
      errors.push('Email может состоять только из латинских символов, цифр, дефиса, точки и символа @');
    }

    // После собаки обязательно точка, а перед точкой обязательно буквы
    if (!/@\w+\./.test(value)) {
      errors.push('Email должен быть указан в формате yyy<b>@</b>xxx<b>.</b>zz');
    }

    return errors;
  }

  phoneRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^(?=.{10,15}$)/.test(value)) {
      errors.push('Длина номера телефона должна быть от 10 до 15 символов.');
    }

    if (!/^(\+|\d)[0-9]+$/i.test(value)) {
      errors.push('Телефон может состоять только из цифр и знака + в начале.');
    }

    return errors;
  }

  messageRules(value: string): string[] {
    const errors: string[] = [];

    if (!value.length) {
      errors.push('Поле для отправки сообщения не может быть пустым.');
    }

    return errors;
  }
}
