const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const originUrl = process.env.ORIGIN || "http://localhost:3000";

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(
    cors({
      credentials: true,
      origin: [originUrl],
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
