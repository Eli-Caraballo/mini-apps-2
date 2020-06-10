const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.get('/bit', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then((data) => { res.status(200).send(data.data).end(); })
    .catch(() => { res.status(400).end(); });
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
