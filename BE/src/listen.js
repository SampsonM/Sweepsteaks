import app from './app.js';
import https from 'https';
import { PORT } from '../config';
import { tlsConfig } from '../config';

https.createServer(tlsConfig, app).listen(PORT, () => {
  console.log(`listening on PORT: ${PORT} https://localhost:${PORT}/api/`)
});
