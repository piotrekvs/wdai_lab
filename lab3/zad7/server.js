const express = require('express');
const cors = require('cors');
const cities = require('./cities.json');

// Server settings

const PORT = 8080;
const app = express();

app.use(cors());
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port: \n http://localhost:${PORT}/ ...`);
});

app.get('/cities', (req, res) => {
    res.status(200).send(cities);
});
