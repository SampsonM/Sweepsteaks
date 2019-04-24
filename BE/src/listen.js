import app from './app.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { PORT } from '../config';
import path from 'path';

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.pem'), 'utf8'),
    passphrase: 'B@gbrush1'
  };
  
  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS listening on PORT: ${PORT} https://localhost:${PORT}/api`)
  });
}

// Runs on test to avoid HTTPS config using supertest
if (process.env.NODE_ENV === "test") {
  http.createServer(app).listen(8081, () => {
    console.log(`HTTP listening on PORT: 8081 http://localhost:8081/api`)
  });
}
