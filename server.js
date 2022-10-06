const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('dist'));

// FIXME временное решение чтобы работала навигация
// до того, как в 3 спринте сделаем нормальный роутинг.
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
