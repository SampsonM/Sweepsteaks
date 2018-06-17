const app = require('express')();
const bodyparser = require('body-parser');
const cors = require('cors');
const apiRouter = require('../routes/router');

app.use(bodyparser.json());
app.use(cors());s

app.use('/register', apiRouter)

module.exports = app;