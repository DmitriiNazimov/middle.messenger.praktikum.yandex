import hbs from "handlebars";
import "./logo.css";

const template: string = `
<logo>
    <a class="logo_link" href="/"><span class="accent_wrapper">EASY</span>TOUCH</a>
</logo>
`;

hbs.registerPartial("logo", template);
