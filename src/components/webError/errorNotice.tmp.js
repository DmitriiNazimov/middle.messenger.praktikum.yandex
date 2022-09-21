import "../logo/logo.tmp";
import "./webError.css";

export default `
{{> logo }}
<div class="web_error">
    <p class="err_paragraph err_header">{{ code }}</p>
    <p class="err_paragraph err_msg">{{ message }}</p>
    <p class="err_paragraph err_link">
        <a href="{{ url }}" class="button_form button_form__empty">{{ linkText }}</a>
    </p>
</div>
`;
