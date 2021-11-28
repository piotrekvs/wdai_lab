const express = require('express');
const cors = require('cors');
const productsA = require('./productsA.json');
const productsB = require('./productsB.json');
const productsC = require('./productsC.json');

// Server settings

const PORT = 8080;
const app = express();
app.use(cors());
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port: \n http://localhost:${PORT}/ ...`);
});

app.get('/productsA', (req, res) => {
    res.status(200).send(productsA);
});

app.get('/productsB', (req, res) => {
    res.status(200).send(productsB);
});

app.get('/productsC', (req, res) => {
    res.status(200).send(productsC);
});
