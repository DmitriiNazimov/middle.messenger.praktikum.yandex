import hbs from 'handlebars';
import './form.css';


const template = `
<div class="form_row">
    <label for="{{ id }}">{{ title }}{{#if required}}<em>*</em>{{/if}}</label>
    <input type="{{ type }}" id="{{ id }}" name="{{ id }}" 
    {{#if pattern}}pattern="pattern"{{/if}} 
    {{#if placeholder}}placeholder="{{ placeholder }}" {{/if}}
    {{#if value}}value="{{ value }}" {{/if}}
    {{#if required}}required{{/if}}>
</div>
`

hbs.registerPartial('formRow', template);
