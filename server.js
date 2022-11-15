// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const distDir = `${__dirname}/dist/`;

app.use(express.static(distDir));

app.get('*', (req, res) => {
  res.sendFile(`${distDir}/index.html`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
