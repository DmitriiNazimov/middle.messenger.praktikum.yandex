import Handlebars from 'handlebars';
import { registerComponent, store } from '../../../utils';
import Button from '../../button';
import { Form, Input, InputError } from '../../form';
import ChatMenu from './chatMenu';
import { data, Props, PropsChatMenu } from './defaultProps';
import { Selector } from './supportMethods';
import { sleep } from '../../../utils/Helpers/myDash';
import { isHide } from '../../../utils/Helpers/viewHelpers';
import { MENU_CHAT_SCREEN, SELECTOR } from '../../../consts';

registerComponent(Form);
registerComponent(Button);
registerComponent(Input);
registerComponent(InputError);

// Хелперы Handlebars
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('notEq', (a, b) => a !== b);

type testProps = Props & PropsChatMenu;

Object.assign(data, {
  users: [
    {
      avatar: '',
      display_name: 'Ivan',
      email: 'ivan@mail.ru',
      first_name: 'ivan',
      login: 'ivan',
      phone: '',
      second_name: 'ivanov',
      id: 123,
    },
  ],
  chatId: 586,
});

const chatMenu = new ChatMenu(data as testProps);

document.body.innerHTML = `<div id="${SELECTOR.rootId}"></div><div class="notice-wrapper"></div>`;
document.querySelector(`#${SELECTOR.rootId}`)?.appendChild(chatMenu.getContent());

describe('components/ChatMenu', () => {
  const menuIcon = document.querySelector(`.${Selector.menuIcon}`) as HTMLElement;
  let menuWrapper = document.querySelector(`.${Selector.menuWrapper}`) as HTMLElement;

  if (!menuIcon || !menuWrapper) {
    throw new Error('menu elements doesn`t exist');
  }

  it('menu wrapper is hidden by default', async () => {
    // Проверка, что при первой отрисовке меню скрыто.
    expect(isHide(menuWrapper.classList)).toBe(true);
  });

  it('menu icon click: should show menu wrapper and menu items', async () => {
    menuIcon.click(); // триггерим раскрытие меню

    await sleep(); // Ждем пока компонент отрисуется.
    menuWrapper = document.querySelector(`.${Selector.menuWrapper}`) as HTMLElement;

    // Проверка, что меню не скрыто.
    expect(isHide(menuWrapper.classList)).toBe(false);
  });

  it('add user link click: should show add user form and hide menu items', async () => {
    const addUserLink = document.querySelector(`.${Selector.addUserLink}`) as HTMLElement;

    if (!addUserLink) {
      throw new Error('addUserLink doesn`t exist');
    }

    addUserLink.click();
    await sleep(); // Ждем пока компонент отрисуется.

    // Проверяем, что блок поиска и добавления юзера отрисовался.
    const usersWrapper = document.querySelector(`.${Selector.usersWrapper}`) as HTMLElement;
    const addUserWrapper = usersWrapper.querySelector(`.${Selector.addUserBlockWrapper}`) as HTMLElement;

    expect(isHide(usersWrapper.classList)).toBe(false);
    expect(isHide(addUserWrapper.classList)).toBe(false);

    // Блок с элементами меню скрылся.
    const menuItemsWrapper = document.querySelector(`.${Selector.menuItemsWrapper}`) as HTMLElement;
    expect(isHide(menuItemsWrapper.classList)).toBe(true);
  });

  it('back link click: should show menu items and hide add user form', async () => {
    const backLink = document.querySelector(`#${Selector.backLinkId}`) as HTMLElement;

    if (!backLink) {
      throw new Error('backLink doesn`t exist');
    }

    backLink.click();
    await sleep(); // Ждем пока компонент отрисуется.

    // Блок с элементами меню больше не скрыт.
    const menuItemsWrapper = document.querySelector(`.${Selector.menuItemsWrapper}`) as HTMLElement;
    expect(isHide(menuItemsWrapper.classList)).toBe(false);

    // Блок с формой поиска и добавления пользователей скрылся.
    const usersWrapper = document.querySelector(`.${Selector.usersWrapper}`) as HTMLElement;
    expect(isHide(usersWrapper.classList)).toBe(true);
  });

  it('delete user link click: should show delete user block and hide menu items', async () => {
    const deleteUserLink = document.querySelector(`.${Selector.deleteUserLink}`) as HTMLElement;

    if (!deleteUserLink) {
      throw new Error('deleteUserLink doesn`t exist');
    }

    // Клик не имитируем, т.к. он вызывает длинную цепь действий с запросом на сервер, а ответа нет.
    // Вручную обновляем store как-будто это произошло после клика и успешного запроса на сервер.
    store.setState({ chatMenuScreen: MENU_CHAT_SCREEN.deleteUser });
    await sleep(200); // Ждем пока компонент отрисуется.

    // Проверяем, что блок удаления юзера отрисовался.
    const usersWrapper = document.querySelector(`.${Selector.usersWrapper}`) as HTMLElement;
    const deleteUserWrapper = usersWrapper.querySelector(`.${Selector.deleteUserBlockWrapper}`) as HTMLElement;

    expect(isHide(usersWrapper.classList)).toBe(false);
    expect(isHide(deleteUserWrapper.classList)).toBe(false);

    // Блок с элементами меню скрылся.
    const menuItemsWrapper = document.querySelector(`.${Selector.menuItemsWrapper}`) as HTMLElement;
    expect(isHide(menuItemsWrapper.classList)).toBe(true);
  });
});
