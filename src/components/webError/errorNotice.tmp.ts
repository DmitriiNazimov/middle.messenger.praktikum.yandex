import '../logo/logo.tmp';
import './webError.css';

export default `
{{> logo }}
<div class="web-error">
    <p class="err-paragraph err-header">{{ code }}</p>
    <p class="err-paragraph err-msg">{{ message }}</p>
    <p class="err-paragraph err-link">
        <a href="{{ url }}" class="button-form button-form__empty">{{ linkText }}</a>
    </p>
</div>
`;
