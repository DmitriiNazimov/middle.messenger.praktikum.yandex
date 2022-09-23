import hbs from 'handlebars';

const template: string = `
<div class="msg {{#if outgoing }} msg__outgoing {{else}} msg__incoming {{/if}}">
    <div class="msg__text">{{ text }}</div>
    <div class="msg__info">
        {{#if outgoing }}
            <span class="msg__delivered {{#if delivered }} msg__delivered__active {{/if}}">.</span>
            <span class="msg__readed {{#if readed }} msg__readed__active {{/if}} ">.</span>
        {{/if}}
        <span class="msg__time">{{ time }}</span>
    </div>
</div>
`;

hbs.registerPartial('message', template);
