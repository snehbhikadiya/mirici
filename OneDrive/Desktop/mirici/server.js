require("dotenv").config();
require("./config/db");
const express = require("express");
const session = require("express-session");
const mongostore = require("connect-mongo");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const cluster = require("cluster");
const os = require("os");
const index = require("./routers/index");

// Clustering Setup
if (cluster.isMaster) {
  const numCPUs = os.cpus().length; // Number of CPU cores

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart workers if they die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new worker...`);
    cluster.fork();
  });
} else {
  // This code will be executed by each worker

  const app = express();

  app.use(express.json());
  app.use(express.static("./public/img"));
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ limit: "1000mb", extended: false }));
  app.use(express.static(path.join(__dirname, "public")));

  const MongoStore = mongostore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 7 * 24 * 60 * 60 * 1000,
    crypto: { secret: process.env.SECREAT_KEY },
  });

  // Session setup
  app.use(
    session({
      secret: process.env.SECREAT_KEY,
      resave: false,
      saveUninitialized: false,
      store: MongoStore,
      cookie: {
        secure: false,
        sameSite: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

  // Message handling middleware
  app.use((req, res, next) => {
    res.locals.message = req.session.message; // Pass message to locals
    delete req.session.message; // Clear message after passing to locals
    next();
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    const message = err.message;
    const status = err.statusCode || 500;
    res.status(status).json({
      message,
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(index);
  app.use((req, res) => {
    res.status(404).render("404.ejs");
  });
  // Server setup
  app.listen(process.env.PORT|| 3000, () => {
    console.log(`Worker ${process.pid} connected successfully`);
  });
}
