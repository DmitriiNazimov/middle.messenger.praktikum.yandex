import "../styles.css";
import "./profile.css";

import hbs from "handlebars";
import form from "../components/form/form.tmp";

const data = {
	header: "Иван",
	formRows: [
		{
			title: "Email",
			type: "email",
			id: "email",
			value: "ivan@mail.ru",
		},
		{
			title: "Логин",
			type: "text",
			id: "login",
			value: "ivanIvanov",
		},
		{
			title: "Имя",
			type: "text",
			id: "first_name",
			value: "Иван",
		},
		{
			title: "Фамилия",
			type: "text",
			id: "second_name",
			value: "Иванов",
		},
		{
			title: "Имя в чате",
			type: "text",
			id: "display_name",
			value: "Иван Грозный",
		},
		{
			title: "Телефон",
			type: "tel",
			id: "phone",
			pattern: "+\7[0-9]{3}-[0-9]{3}-[0-9]{4}",
			value: "+7 999 777 55 22",
		},
	],
	changePasswords: [
		{
			title: "Пароль",
			type: "password",
			id: "password",
			placeholder: "Латинские буквы и цифры",
		},
		{
			title: "Пароль (ещё раз)",
			type: "password",
			id: "passwordAgain",
			placeholder: "Латинские буквы и цифры",
		},
	],
	avatarChange: true,
	buttons: [
		{
			typeFull: true,
			text: "Сохранить изменения",
			link: "./chats.html",
		},
		{
			typeEmpty: true,
			text: "Выйти из аккаунта",
			link: "./index.html",
		},
	],
};

const template = hbs.compile(form);
const html = template(data);

document.getElementsByTagName("MAIN")[0].innerHTML += html;
