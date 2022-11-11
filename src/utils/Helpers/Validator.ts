type InputValue = HTMLInputElement[] & string;

enum Rules {
  login = 'loginRules',
  password = 'passwordRules',
  oldPassword = 'passwordRules',
  newPassword = 'passwordRules',
  first_name = 'firstNameRules',
  second_name = 'secondNameRules',
  email = 'emailRules',
  phone = 'phoneRules',
  message = 'notEmptyRules',
  title = 'notEmptyRules',
}

export enum ErrorMessage {
  notEmptyRules = 'Поле не может быть пустым.',
  phoneRulesLength = 'Длина номера телефона должна быть от 10 до 15 символов.',
  phoneRulesFormat = 'Телефон может состоять только из цифр и знака + в начале.',
  emailRulesCompound = 'Email может состоять только из латинских символов, цифр, дефиса, точки и символа @',
  emailRulesFormat = 'Email должен быть указан в формате yyy<b>@</b>xxx<b>.</b>zz',
  firstNameRulesCompound = 'Имя и фамилия могут состоять только из русских или латинских букв, а также дефиса.',
  firstNameRulesBegin = 'Первая буква должна быть заглавной',
  passwordRulesLength = 'Пароль должен быть от 8 до 40 символов.',
  passwordRulesNum = 'Пароль должен содержать хотя бы одну цифру.',
  passwordRulesCapitalChar = 'Пароль должен содержать хотя бы одну заглавную букву.',
  loginRulesLength = 'Логин должен быть от 3 до 20 символов.',
  loginRulesCompound = 'Логин может состоять только из латинских символов, цифр, знаков дефиса и нижнего подчеркивания.',
  loginRulesFormat = 'Логин не может состоять только из цифр.',
}

type Rule = keyof typeof Rules;

export default class Validator {
  check(formItems: HTMLInputElement[] | HTMLTextAreaElement[]): ValidateResult {
    const result: ValidateResult = { isCorrect: true };

    formItems.forEach((item) => {
      if (!item.hasAttribute('required') && !item.value) {
        return;
      }

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
      errors.push(ErrorMessage.loginRulesLength);
    }

    if (!/^[a-zA-Z0-9\-_]+$/i.test(value)) {
      errors.push(ErrorMessage.loginRulesCompound);
    }

    if (/^[\d]+$/.test(value)) {
      errors.push(ErrorMessage.loginRulesFormat);
    }

    return errors;
  }

  passwordRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^(?=.{8,40}$)/.test(value)) {
      errors.push(ErrorMessage.passwordRulesLength);
    }

    if (!/\d{1,}/.test(value)) {
      errors.push(ErrorMessage.passwordRulesNum);
    }

    if (!/[A-ZА-ЯЁ]{1,}/.test(value)) {
      errors.push(ErrorMessage.passwordRulesCapitalChar);
    }

    return errors;
  }

  firstNameRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^[а-яёА-ЯЁa-zA-Z-]+$/i.test(value)) {
      errors.push(ErrorMessage.firstNameRulesCompound);
    }

    if (!/^[A-ZА-ЯЁ]{1}/.test(value)) {
      errors.push(ErrorMessage.firstNameRulesBegin);
    }

    return errors;
  }

  secondNameRules(value: string): string[] {
    return this.firstNameRules(value);
  }

  emailRules(value: string) {
    const errors: string[] = [];

    if (!/^[a-zA-Z0-9\-.@]+$/i.test(value)) {
      errors.push(ErrorMessage.emailRulesCompound);
    }

    // После собаки обязательно точка, а перед точкой обязательно буквы
    if (!/@\w+\./.test(value)) {
      errors.push(ErrorMessage.emailRulesFormat);
    }

    return errors;
  }

  phoneRules(value: string): string[] {
    const errors: string[] = [];

    if (!/^(?=.{10,15}$)/.test(value)) {
      errors.push(ErrorMessage.phoneRulesLength);
    }

    if (!/^(\+|\d)[0-9]+$/i.test(value)) {
      errors.push(ErrorMessage.phoneRulesFormat);
    }

    return errors;
  }

  notEmptyRules(value: string): string[] {
    const errors: string[] = [];

    if (!value.length) {
      errors.push(ErrorMessage.notEmptyRules);
    }

    return errors;
  }
}
