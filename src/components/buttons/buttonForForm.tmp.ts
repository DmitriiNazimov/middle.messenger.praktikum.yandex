import hbs from 'handlebars';
import './buttons.css';

const template: string = `
{{#if typeFull }}
    <button type="submit" class=" button-form button-form__full">{{ text }}</button>
{{/if}}

{{#if typeEmpty }}
    <a href="{{link}}" class="button-form button-form__empty">{{ text }}</a>
    <a href="/" class="button-form button-form__empty">На главную</a>
{{/if}}

`;

hbs.registerPartial('buttonForForm', template);
