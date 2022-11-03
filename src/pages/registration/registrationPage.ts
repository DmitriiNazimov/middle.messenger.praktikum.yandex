import { SignUp } from '../../api';
import { authController } from '../../controllers';
import '../../styles.css';

import { Block } from '../../utils';
import { formIsValid } from '../../utils/Helpers/viewHelpers';
import { data } from './defaultProps';

export default class RegistrationPage extends Block<FormProps> {
  constructor() {
    super({
      ...data,
      events: { submit: (event: Event) => this.submitHandler(event) },
    });
  }

  submitHandler(event: Event) {
    const form = event.target;
    if (form instanceof HTMLFormElement && formIsValid(form)) {
      const formData = Object.fromEntries(new FormData(form)) as SignUp;
      authController.signUp(formData);
    }
  }

  render() {
    return `
    <main>
      {{{ Logo }}}
      {{{ Form 
          header="{{header}}" 
          inputs=inputs 
          buttons=buttons 
      }}}
    </main>
    `;
  }
}
