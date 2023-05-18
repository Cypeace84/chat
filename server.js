const express = require('express');
const app = express();
const port = 8001;

const messages = [];

app.use(express.static('client'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
