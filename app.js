const dotenv = require("dotenv").config();
const database = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const originUrl = process.env.ORIGIN || "http://localhost:3000";

const User = require("./models/User.model");
const Album = require("./models/Album.model");
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

const albumRoutes = require("./routes/album.routes")
app.use("/api", isAuthenticated, albumRoutes) 

const eventRoutes = require("./routes/event.routes")
app.use("/api", isAuthenticated, eventRoutes)

require("./error-handling")(app);

module.exports = app;
