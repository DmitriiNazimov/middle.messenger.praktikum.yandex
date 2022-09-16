import './formRow.tmp';
import '../buttons/buttonForForm.tmp';
import '../logo/logo.tmp';
import './form.css';


export default `
<form class="form">
    <h1>{{ header }}</h1>

    {{#each formRows}}
        {{> formRow this}}
    {{/each}}

    {{#if changePasswords}}
        <h3 class="form_header3">Если хотите поменять пароль:</h3>
        {{#each changePasswords}}
            {{> formRow this}}
        {{/each}}
    {{/if}}

    {{#if avatarChange}}
        <h3 class="form_header3">Если хотите поменять аватар:</h3>
        <div class="form_row">
            <label class="form_label" for="avatar_input">Фото</label>
            <input type="file" class="standart_input" id="avatar_input" name="avatar_input">
        </div>
    {{/if}}

    {{#if buttons}}
        <div class="form_buttons">
            {{#each buttons}}
                {{> buttonForForm this}}
            {{/each}}
        </div>
    {{/if}}
</form>
`
