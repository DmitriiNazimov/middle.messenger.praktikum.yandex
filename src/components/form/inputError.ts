import Block from '../../utils/Block';
import './form.css';

interface Props {
  error: string;
  messageError: boolean;
}

export default class InputError extends Block {
  constructor({ error, messageError }: Props) {
    super({ error, messageError });
  }

  render() {
    return `
        <div class="input-error
        {{#unless error}} hide{{/unless}}
        {{#if messageError}} message-validate-error{{/if}}">
          {{{error}}}
        </div>
     `;
  }
}
