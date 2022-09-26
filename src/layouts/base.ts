/* eslint-disable class-methods-use-this */

class Validator {
  run(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const methodName = `${input.name}Check` as keyof Validator;

      if (this[methodName]) this[methodName](input as HTMLInputElement & HTMLInputElement[]);
    });
  }

  loginCheck(input: HTMLInputElement): boolean {
    const { value } = input;
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

    const errNode: HTMLElement = this.getErrNode(input);

    if (errorText.length) {
      errNode.textContent = errorText;
      errNode.classList.remove('hide');
      return false;
    }

    errNode.classList.add('hide');
    return true;
  }

  getErrNode(input: HTMLInputElement): HTMLElement {
    return [...input.parentElement!.children].filter((node) => node.classList.contains('input-error'))[0] as HTMLElement;
  }
}

const forms: Element[] = Array.from(document.forms);

if (forms.length) {
  const validator = new Validator();
  forms.forEach((form: Element) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      // eslint-disable-next-line no-console
      console.log(Object.fromEntries(formData));

      const inputs: Element[] = Array.from(form.getElementsByTagName('INPUT'));
      validator.run(inputs as HTMLInputElement[]);
    });

    function focusBlurHandler(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.className === 'standart-input') {
        validator.run([event.target] as HTMLInputElement[]);
      }
    }

    ['focus', 'blur'].forEach((event) => form.addEventListener(event, focusBlurHandler, true));
  });
}
