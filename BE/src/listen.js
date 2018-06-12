const app = require('./app.js');
const { PORT } = (process.env.NODE_ENV === 'production') ? process.env : require('../config');

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})