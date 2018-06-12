const app = require('express')();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('../routes/router');

app.use(morgan('combined'));
app.use(bodyparser.json());

app.use('/', apiRouter)

module.exports = app;