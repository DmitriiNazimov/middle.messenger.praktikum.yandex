import hbs from "handlebars";
import "./buttons.css";

const template = `
{{#if typeFull }}
    <button type="submit" class="hide button_form button_form__full">{{ text }}</button>
    <a href="{{link}}" class="button_form button_form__full">{{ text }}</a>
{{/if}}

{{#if typeEmpty }}
    <a href="{{link}}" class="button_form button_form__empty">{{ text }}</a>
{{/if}}
`;

hbs.registerPartial("buttonForForm", template);
