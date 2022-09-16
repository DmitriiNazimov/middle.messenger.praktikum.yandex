import hbs from 'handlebars';
import './logo.css';


const template = `
<logo>
    <a href="/"><span class="accent_wrapper">EASY</span>TOUCH</a>
</logo>
`

hbs.registerPartial('logo', template);
