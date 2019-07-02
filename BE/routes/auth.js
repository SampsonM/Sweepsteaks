import exJwt from 'express-jwt';
import fs from 'fs';
import path from 'path';

const KEY = process.env.NODE_ENV === 'production'
  ? process.env.KEY
  : fs.readFileSync(path.resolve(__dirname, '../config/certs/rootCA.key'));

const getTokenFromHeaders = (req) => req.headers.authorisation;

const auth = {
  required: exJwt({
    secret: KEY,
    getToken: getTokenFromHeaders
  }),
  optional: exJwt({
    secret: KEY,
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

export default auth;