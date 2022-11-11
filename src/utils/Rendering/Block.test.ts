// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from '@testing-library/dom';
import Button from '../../components/button';
import { SELECTOR } from '../../consts';
import { Block, registerComponent } from '../index';

registerComponent(Button);

const props: FormProps = {
  header: 'Test header text',
  inputs: [],
  buttons: [
    {
      typeFull: false,
      text: 'Test button',
      link: '/#',
      id: 'testButton',
    },
  ],
};

class TestComponent extends Block {
  static componentName = 'TestComponent';

  render() {
    return `<div>
    <h1>${TestComponent.componentName}</h1>
    <h2>{{header}}</h2>
    {{#each buttons}}
      {{{ Button text="{{text}}" typeFull=typeFull link="{{link}}" id=id}}}
    {{/each}}
    </div>`;
  }
}

const component = new TestComponent(props);

document.body.innerHTML = `<div id="${SELECTOR.rootId}"></div>`;
document.querySelector(`#${SELECTOR.rootId}`)?.appendChild(component.getContent());

describe('utils/Block', () => {
  it('should render Component and stubs {{ template }}', async () => {
    await screen.findByText(TestComponent.componentName);
    await screen.findByText(props.header as string);
  });

  it('should render inner Component {{{ Component }}}', async () => {
    const innerComponentText = props.buttons[0].text as string;
    await screen.findByText(innerComponentText);
  });

  it('should rerender Component after setting new props', async () => {
    const newHeaderString = 'New test header';

    // Проверяем что новой строки нет в изначальном рендере
    const header = await screen.queryByText(newHeaderString);
    expect(header).toBeNull();

    // Обновляем пропсы
    component.setProps({ header: newHeaderString });

    // Проверяем что новая строка появилась в новом рендере после обновления пропсов
    await screen.findByText(newHeaderString);
  });
});
