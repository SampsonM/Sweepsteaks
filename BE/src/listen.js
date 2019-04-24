import app from './app.js';
import http from 'http';

const PORT = process.env.PORT || require('../config').PORT;

http.createServer(app).listen(PORT, () => {
  console.log(`HTTP listening on PORT: ${PORT} http://localhost:${PORT}/api`)
});
