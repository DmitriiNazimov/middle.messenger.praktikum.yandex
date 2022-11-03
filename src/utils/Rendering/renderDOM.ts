import { DEFAULT_TITLE } from '../../consts';

export default async function renderDOM(block: BlockComponent, title?: string, selector: string = '#app') {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`RenderDOM: root element not found. Selector: "${selector}"`);
  }

  root!.innerHTML = '';

  document.title = title || DEFAULT_TITLE;

  root!.appendChild(block.getContent());

  return root;
}
