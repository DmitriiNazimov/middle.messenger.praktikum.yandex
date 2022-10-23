import { SELECTORS } from '../../../consts';
import Block from '../../../utils/Rendering/Block';
import './inputError.css';

type Props = {
  errors: string[];
  sendMessageError: boolean;
}

export default class InputError extends Block<Props> {
  static componentName: string = 'InputError';

  render() {
    return (
      '<div class="input-error'
      + '{{#unless errors}} hide{{/unless}}'
      + '{{#if sendMessageError}} send-message__validate-error{{/if}}'
      + '{{#if formSubmitted}} input-error__submitted{{/if}}'
      + `">
          {{#if errors}}
            <ul class='${SELECTORS.INPUT_ERROR_LIST}'>
              {{#each errors}}
                <li class="${SELECTORS.INPUT_ERROR_LIST}-row">{{{ [] }}}</li>
              {{/each}}
            </ul> 
          {{/if}}
        </div>
     `
    );
  }
}
