

export default `
{{#each peoples}}
    <div class="contact_row">
        <div class="contact_info {{#if active}}contact_info_active{{/if}}">
            <div class="contact_avatar">
                <div class="pointer"></div>
                <img src="{{ avatarPath }}" alt="{{ display_name }}">
            </div>
            <div class="contact_mainInfo">
                <div class="contact_username">{{ display_name }}</div>
                <div class="contact_message">{{ lastMsgText }}</div>
            </div>
            <div class="contact_extraInfo">
                <div class="contact_messageDate">{{ lastMsgData }}</div>
                {{#if msgCounter}}
                    <div class="contact_messageCounter">{{ msgCounter }}</div>
                {{/if}}
            </div>
        </div>
    </div>
    <div class="delimiter_line"></div>
{{/each}}
`