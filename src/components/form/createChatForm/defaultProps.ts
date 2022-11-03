/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum Selector {
  formWrapper = 'create-chat__form-wrapper',
  createButton = 'create-chat__button',
  inputId = 'title',
}

// eslint-disable-next-line import/prefer-default-export
export const data: FormProps = {
  inputs: [
    {
      title: 'Название чата',
      type: 'text',
      id: Selector.inputId,
      placeholder: 'Введите название чата',
      required: true,
    },
  ],
  buttons: [
    {
      typeFull: true,
      text: 'Создать чат',
      link: './messenger',
    },
  ],
};
