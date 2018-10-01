import app from './app.js';
import https from 'https';
import { PORT } from '../config';
import { tlsConfig } from '../config';

https.createServer(tlsConfig, app).listen(4000, () => {
  console.log('listening on PORT: 4000 https://localhost:4000/api/')
});
