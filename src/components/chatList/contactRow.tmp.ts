export default `
{{#each peoples}}
    <div class="contact_row">
        <div class="contact-info {{#if active}}contact-info__active{{/if}}">
            <div class="contact-avatar">
                <div class="contact-pointer"></div>
                <img src="{{ avatarPath }}" alt="{{ display_name }}">
            </div>
            <div class="contact-main-info">
                <div class="contact-username">{{ display_name }}</div>
                <div class="contact-message">{{ lastMsgText }}</div>
            </div>
            <div class="contact-extra-info">
                <div class="contact-message-date">{{ lastMsgData }}</div>
                {{#if msgCounter}}
                    <div class="contact-message-counter">{{ msgCounter }}</div>
                {{/if}}
            </div>
        </div>
    </div>
    <div class="delimiter_line"></div>
{{/each}}
`;
