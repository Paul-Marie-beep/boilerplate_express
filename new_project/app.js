const express = require("express");

const morgan = require("morgan");

const app = express();

const userRouter = require('./routes/userRoutes');

// 1°) Middlewares

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log("----------------------------------------------");
  // eslint-disable-next-line no-console
  console.log("Hello from the middleware💥");
  next();
});

// Middleware to add the time of the request to the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log("log time in middleware:", req.requestTime);
  next();
});

app.use('/api/v1/users', userRouter);

module.exports = app;