const dotenv = require("dotenv").config();
const database = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const originUrl = process.env.ORIGIN || "http://localhost:5173";

const User = require("./models/User.model");
const Baby = require("./models/Baby.model");
const Event = require("./models/Event.model");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();

app.use(
  cors({
    origin: [originUrl],
  })
);

const config = require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const babyRoutes = require("./routes/baby.routes")
app.use("/api", isAuthenticated, babyRoutes) //ADD ISAUTHENTICATED

const eventRoutes = require("./routes/event.routes")
app.use("/api", eventRoutes) //ADD ISAUTHENTICATED

require("./error-handling")(app);

module.exports = app;
