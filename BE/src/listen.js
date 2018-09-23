import app from './app.js';
import { PORT } from '../config';

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}, view on http://localhost:${PORT}/api/`)
});
