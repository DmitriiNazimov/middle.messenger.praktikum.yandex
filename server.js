const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
