import '../../styles.css';
import { authController } from '../../controllers';
import { formIsValid } from '../../utils/Helpers/viewHelpers';
import { Block } from '../../utils';
import { SignIn } from '../../api';
import { data } from './defaultProps';

export default class LoginPage extends Block<FormProps> {
  constructor() {
    super({
      ...data,
      events: { submit: (event: Event) => this.submitHandler(event) },
    });
  }

  submitHandler(event: Event) {
    const form = event.target;

    if (form instanceof HTMLFormElement && formIsValid(form)) {
      const formData = Object.fromEntries(new FormData(form)) as SignIn;
      authController.signIn(formData);
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
