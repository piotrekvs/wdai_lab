const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');
const productsA = require('./productsA.json');
const productsB = require('./productsB.json');

// Server settings

const PORT = 8080;
const app = express();
app.use(cors());
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port: \n http://localhost:${PORT}/ ...`);
});

app.use('/api/productsA', jsonServer.router(productsA));

app.get('/productsA', (req, res) => {
    res.status(200).send(productsA);
});

app.use('/api/productsB', jsonServer.router(productsB));

app.get('/productsB', (req, res) => {
    res.status(200).send(productsB);
});
