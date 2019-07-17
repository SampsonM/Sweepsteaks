"use strict";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import apiRouter from "../routes/api/api.js";
import mongoose from "mongoose";
import mongooseConnect from '../src/connectMongoose'
import helmet from "helmet"
import passport from 'passport'
import path from 'path'
import '../config/passport'

// Configure mongoose
mongoose.Promise = Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Init app
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../views')))

// Configure the app
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));
app.use(cors({
  origin: ["www.sweepsteaks.co.uk", "http://localhost:8080"],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  credentials: true
}));
app.use(passport.initialize())
app.use(passport.session())

process.env.NODE_ENV !== 'test' && mongooseConnect()

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) return res.status(404).send({ errooorrrrr: err });
  next(err);
});

app.use((err, req, res, next) => {
  return res.status(500).send(err);
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((err, user) => {
      done(err, user);
    });
});

export default app;
