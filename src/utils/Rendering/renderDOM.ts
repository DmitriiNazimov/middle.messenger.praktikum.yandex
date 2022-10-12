export default function renderDOM(block: BlockComponent, title?: string, selector: string = '#app') {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`RenderDOM: root element not found. Selector: "${selector}"`);
  }

  root!.innerHTML = '';

  document.title = title || 'Easy Touch';

  root!.appendChild(block.getContent());
  return root;
}
