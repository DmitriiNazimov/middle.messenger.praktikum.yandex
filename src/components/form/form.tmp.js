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
    <h3>Если вы хотите поменять пароль:</h3>
    {{#each changePasswords}}
        {{> formRow this}}
    {{/each}}
{{/if}}

{{#if avatarChange}}
<h3>Если хотите поменять аватар:</h3>
    <div class="form_row">
        <label for="avatar_input">Фото</label>
        <input type="file" id="avatar_input" name="avatar_input">
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
