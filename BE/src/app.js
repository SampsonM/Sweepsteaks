"use strict";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import apiRouter from "../routes/api/api.js";
import mongoose from "mongoose";
import helmet from "helmet";
import utils from "../utils";
import passport from 'passport'
import '../config/passport';
const DB_URL = process.env.DB_URL || require("../config/environment").DB_URL;

// Configure mongoose
mongoose.Promise = Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Init app
const app = express();

// Configure the app
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));
app.use(cors({
  origin: "www.sweepstakes.co.uk",
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  credentials: true
}));
app.use(passport.initialize())
app.use(passport.session())

// Connect mongoose
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true },
  () => {
    console.log("connected at app.js to mongo");
  }
);

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

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user);
  });
});

export default app;
