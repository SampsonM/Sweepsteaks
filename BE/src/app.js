const app = require('express')();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('../routes/router');

app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(cors());

app.use('/register', apiRouter)

module.exports = app;