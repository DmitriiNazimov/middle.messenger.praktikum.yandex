const forms: Element[] = Array.from(document.getElementsByTagName('FORM'));

forms.forEach((form: Element) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));
  });
});
