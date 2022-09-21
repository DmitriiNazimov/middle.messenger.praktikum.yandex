import hbs from 'handlebars';
import './buttons.css';

const template: string = `
{{#if typeFull }}
    <button type="submit" class="hide button-form button-form__full">{{ text }}</button>
    <a href="{{link}}" class="button-form button-form__full">{{ text }}</a>
{{/if}}

{{#if typeEmpty }}
    <a href="{{link}}" class="button-form button-form__empty">{{ text }}</a>
{{/if}}
`;

hbs.registerPartial('buttonForForm', template);
