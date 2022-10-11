import Block from '../../../utils/Rendering/Block';
import './inputError.css';

type Props = {
  errors: string[];
  sendMessageError: boolean;
}

export default class InputError extends Block<Props> {
  static componentName: string = 'InputError';

  render() {
    return `
        <div class="input-error{{#unless errors}} hide{{/unless}}{{#if sendMessageError}} send-message__validate-error{{/if}}">
          {{#if errors}}
            <ul class='input-error__list'>
              {{#each errors}}
                <li class="input-error__list-row">{{{ [] }}}</li>
              {{/each}}
            </ul> 
          {{/if}}
        </div>
     `;
  }
}
