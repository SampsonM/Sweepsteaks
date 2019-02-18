import app from './app.js';
import http from 'http';
const { PORT } = process.env || require('../config');

http.createServer(app).listen(PORT, () => {
  console.log(`listening on PORT: ${PORT} https://localhost:${PORT}/api/`)
});
