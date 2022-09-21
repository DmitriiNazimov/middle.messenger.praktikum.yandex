import "../styles.css";

import hbs from "handlebars";
import errorNotice from "../components/webError/errorNotice.tmp";

const data: object = {
	code: "500",
	message: "Мы уже чиним",
	url: "chats.html",
	linkText: "Назад к чатам",
};

const template: HandlebarsTemplateDelegate = hbs.compile(errorNotice);
const html: string = template(data);

document.getElementsByTagName("MAIN")[0]!.innerHTML += html;
