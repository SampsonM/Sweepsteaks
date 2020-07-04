import app from './app.js'
import http from 'http'
import https from 'https'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

const currentEnv = process.env.NODE_ENV

dotenv.config({ path: path.join(__dirname, `../.env.${currentEnv}`)})

const PORT = process.env.PORT || require('../config/environment').PORT

if (currentEnv === 'production') {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP listening on PORT: ${PORT} http://localhost:${PORT}/api`)
  })
}

// Keep HTTPS to run localhost on chrome
// due to chrome updating the scheme from HTTP to HTTPS
// Heroku does not require this however so we keep HTTP
if (currentEnv === 'development') {
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.pem'), 'utf8'),
    passphrase: fs.readFileSync(path.resolve(__dirname, '../config/certs/passphrase.txt'), 'utf8'),
  }

  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS listening on PORT: ${PORT} https://localhost:${PORT}/api`)
  })
}
