import Block from '../../utils/Block';
import './form.css';

interface Props {
  id: string;
  title: string;
  required: boolean;
  type: string;
  pattern: string;
  placeholder: string;
  value: string;
  error: string;
  events: Object;
}

export default class InputError extends Block {
  constructor({
    id, title, required, type, pattern, placeholder, value, error,
  }: Props) {
    super({
      placeholder,
      id,
      title,
      required,
      type,
      pattern,
      value,
      error,
    });
  }

  render() {
    return `
        <div class="input-error{{#unless error}} hide{{/unless}}">{{error}}</div>
     `;
  }
}
