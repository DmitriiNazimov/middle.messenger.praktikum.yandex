import hbs from 'handlebars';
import './logo.css';

const template: string = `
<div class="logo">
    <a class="logo-link" href="/"><span class="accent-wrapper">EASY</span>TOUCH</a>
</div>
`;

hbs.registerPartial('logo', template);
