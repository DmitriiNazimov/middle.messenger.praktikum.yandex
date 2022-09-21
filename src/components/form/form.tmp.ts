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
        <div class="form-row">
            <label class="form_label" for="avatar-input">Фото</label>
            <input type="file" class="standart-input" id="avatar-input" name="avatar-input">
        </div>
    {{/if}}

    {{#if buttons}}
        <div class="form-buttons">
            {{#each buttons}}
                {{> buttonForForm this}}
            {{/each}}
        </div>
    {{/if}}
</form>
`;
