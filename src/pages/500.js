import "../styles.css";

import hbs from "handlebars";
import errorNotice from "../components/webError/errorNotice.tmp";

const data = {
	code: "500",
	message: "Мы уже чиним",
	url: "chats.html",
	linkText: "Назад к чатам",
};

const template = hbs.compile(errorNotice);
const html = template(data);

document.getElementsByTagName("MAIN")[0].innerHTML += html;
