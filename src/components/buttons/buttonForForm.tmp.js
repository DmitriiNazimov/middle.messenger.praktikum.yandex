import hbs from 'handlebars';
import './buttons.css';



const template = `
{{#if typeFull }}
    <button type="submit" class="hide button_form button_form_full">{{ text }}</button>
    <a href="{{link}}" class="button_form button_form_full">{{ text }}</a>
{{/if}}

{{#if typeEmpty }}
    <a href="{{link}}" class="button_form button_form_empty">{{ text }}</a>
{{/if}}
`

hbs.registerPartial('buttonForForm', template);