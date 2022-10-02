import Block from '../../../utils/Block';
import './inputError.css';

interface Props {
  error: string;
  sendMessageError: boolean;
}

export default class InputError extends Block {
  constructor({ error, sendMessageError }: Props) {
    super({ error, sendMessageError });
  }

  render() {
    return `
        <div class="input-error
        {{#unless error}} hide{{/unless}}
        {{#if sendMessageError}} send-message__validate-error{{/if}}">
          {{{error}}}
        </div>
     `;
  }
}
