// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, waitFor } from '@testing-library/dom';
import Form from './form';
import Button from '../button';
import { data } from './createChatForm/defaultProps';
import { registerComponent } from '../../utils';
import Input from './input/input';
import InputError from './inputError/inputError';
import { ErrorMessage } from '../../utils/Helpers/Validator';
import { SELECTOR } from '../../consts';
import { sleep } from '../../utils/Helpers/myDash';

registerComponent(Form);
registerComponent(Button);
registerComponent(Input);
registerComponent(InputError);

const form = new Form(data);

document.body.innerHTML = `<div id="${SELECTOR.rootId}"></div><div class="notice-wrapper"></div>`;
document.querySelector(`#${SELECTOR.rootId}`)?.appendChild(form.getContent());

describe('components/Form', () => {
  it('should compile form', async () => {
    const labelText = data.inputs[0].title;

    if (!labelText) {
      throw new Error('labelText doesn`t exist');
    }

    await screen.findByText(labelText);
  });

  it('should show a validation error message on the focus event', async () => {
    await sleep(); // Ждем пока компонент отрисуется.

    // Имитируем событие фокусa на инпуте, что должно триггерить валидацию
    const input = document.querySelector(`.${SELECTOR.input.node}`) as HTMLInputElement;
    input.value = '';
    input.focus();

    // Проверяем, что сообщение о провале валидации из-за пустого поля появилось.
    await waitFor(async () => {
      const errMsgNode = document.querySelector(`.${SELECTOR.input.errorRow}`);
      expect(errMsgNode).toBeTruthy();
      expect(errMsgNode?.textContent).toBe(ErrorMessage.notEmptyRules);
    });
  });

  it('should hide a validation error message when the input was filled in correctly', async () => {
    const input = document.querySelector(`.${SELECTOR.input.node}`) as HTMLInputElement;
    input.value = 'notEmptyString';
    input.blur();

    // Проверяем, что сообщение о валидации исчезло при корректном заполнении инпута
    await waitFor(async () => {
      const errMsgNode = document.querySelector(`.${SELECTOR.input.errorRow}`);
      expect(errMsgNode).toBeFalsy();
      const errMsgText = screen.queryByText(ErrorMessage.notEmptyRules);
      expect(errMsgText).toBeNull();
    });
  });

  it('should show a validation error message on the submit event', async () => {
    const input = document.querySelector(`.${SELECTOR.input.node}`) as HTMLInputElement;
    input.value = '';

    // Отправляем форму с пустым инпутом, что должно триггерить ошибку валидации
    const formNode = document.querySelector('FORM');
    formNode?.dispatchEvent(new CustomEvent('submit'));

    // Проверяем, что сообщение о валидации появилось, т.к. инпут был пустым.
    await waitFor(async () => {
      const errMsgNode = document.querySelector(`.${SELECTOR.input.errorRow}`);
      expect(errMsgNode).toBeTruthy();
      expect(errMsgNode?.textContent).toBe(ErrorMessage.notEmptyRules);
    });
  });
});
