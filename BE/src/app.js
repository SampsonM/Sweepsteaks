const app = require('express')();
const bodyparser = require('body-parser');
const cors = require('cors');
const apiRouter = require('../routes/api.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const { DB_URL } = (process.env.NODE_ENV === 'production') ? process.env : require('../config');

app.use(bodyparser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(DB_URL,  {useNewUrlParser: true}, () => {
  console.log('connected at app.js to mongo')
});

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  next({ status: 404 });
})

app.use((err, req, res, next) => {
  if (err.status === 404) return res.status(404).send({'errooorrrrr': err});
  next(err)
})

app.use((err, req, res, next) => {
  console.log(err.status)
  return res.status(500).send(err)
})

module.exports = app;
