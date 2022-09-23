import './message.tmp';
import './messages.css';

export default `
{{#if days}}
    {{#each days}}
            <div class="correspondence-daily">
                <div class="correspondence-date">{{ date }}</div>
                {{#each messages}}
                    {{> message this}}
                {{/each}}
            </div>
    {{/each}}
{{else}}
    <p class="messages__empty">Начните беседу!</p>
{{/if}}
`;
