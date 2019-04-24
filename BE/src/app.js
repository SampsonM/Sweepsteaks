"use strict";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import apiRouter from "../routes/api.js";
import mongoose from "mongoose";
import helmet from "helmet";
import utils from "../utils";

const app = express();
const DB_URL = process.env.DB_URL || require("../config").DB_URL;

mongoose.Promise = Promise;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(bodyparser.json());
app.use(helmet());
app.use(
  cors({
    origin: "www.sweepstakes.co.uk",
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    credentials: true
  })
);

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true },
  () => {
    console.log("connected at app.js to mongo");
  }
);

app.use("/*", (req, res, next) => {
  if (utils.isGetRequest(req)) {
    return next();
  }

  if (utils.timestampValid(req)) {
    return next();
  }

  return res.status(403).send({
    message: "Forbidden request",
    root: "forbiddenRequest"
  });
});

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  if (err.status === 404) return res.status(404).send({ errooorrrrr: err });
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error", err.message, err.root);
  return res.status(500).send(err);
});

export default app;
