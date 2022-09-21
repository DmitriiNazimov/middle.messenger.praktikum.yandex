import hbs from 'handlebars';
import './form.css';

const template: string = `
<div class="form-row">
    <label class="form_label" for="{{ id }}">{{ title }}{{#if required}}<em>*</em>{{/if}}</label>
    <input class="standart-input" type="{{ type }}" id="{{ id }}" name="{{ id }}" 
    {{#if pattern}}pattern="pattern"{{/if}} 
    {{#if placeholder}}placeholder="{{ placeholder }}" {{/if}}
    {{#if value}}value="{{ value }}" {{/if}}
    {{#if required}}required{{/if}}>
</div>
`;

hbs.registerPartial('formRow', template);
