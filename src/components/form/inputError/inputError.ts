import { SELECTOR } from '../../../consts';
import Block from '../../../utils/Rendering/Block';
import './inputError.css';

type Props = {
  errors: string[];
  sendMessageError: boolean;
}

export default class InputError extends Block<Props> {
  static componentName = 'InputError';

  render() {
    return (
      '<div class="input-error'
      + '{{#unless errors}} hide{{/unless}}'
      + '{{#if sendMessageError}} send-message__validate-error{{/if}}'
      + '{{#if formSubmitted}} input-error__submitted{{/if}}'
      + `">
          {{#if errors}}
            <ul class='${SELECTOR.input.errorList}'>
              {{#each errors}}
                <li class="${SELECTOR.input.errorList}-row">{{{ [] }}}</li>
              {{/each}}
            </ul> 
          {{/if}}
        </div>
     `
    );
  }
}
