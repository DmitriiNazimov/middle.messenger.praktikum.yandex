import "../styles.css";

import hbs from "handlebars";
import form from "../components/form/form.tmp";

const data = {
	header: "Регистрация",
	formRows: [
		{
			title: "Email",
			type: "email",
			id: "email",
			placeholder: "ivan@mail.ru",
			required: true,
		},
		{
			title: "Логин",
			type: "text",
			id: "login",
			placeholder: "ivanIvanov",
			required: true,
		},
		{
			title: "Имя",
			type: "text",
			id: "first_name",
			placeholder: "Иван",
			required: true,
		},
		{
			title: "Фамилия",
			type: "text",
			id: "second_name",
			placeholder: "Иванов",
			required: true,
		},
		{
			title: "Телефон",
			type: "tel",
			id: "phone",
			pattern: "+\7[0-9]{3}-[0-9]{3}-[0-9]{4}",
			placeholder: "+7 999 777 55 22",
			required: true,
		},
		{
			title: "Пароль",
			type: "password",
			id: "password",
			placeholder: "Латинские буквы и цифры",
			required: true,
		},
		{
			title: "Пароль (ещё раз)",
			type: "password",
			id: "passwordAgain",
			placeholder: "Латинские буквы и цифры",
			required: true,
		},
	],
	buttons: [
		{
			typeFull: true,
			text: "Зарегистрироваться",
			link: "./chats.html",
		},
		{
			typeEmpty: true,
			text: "Вход",
			link: "./login.html",
		},
	],
};

const template = hbs.compile("{{> logo }}" + form);
const html = template(data);

document.getElementsByTagName("MAIN")[0].innerHTML += html;
