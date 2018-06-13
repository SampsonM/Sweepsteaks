const app = require('./app.js');
const { sequelize } = require('../models');
const { PORT } = require('../config');

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`)
    })
  })
