//Modules
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = require("express")();
const winston = require("winston");

// Logging All App Errors and Info
require("./startup/logging")();

// MongoDB Connections
require("./startup/db")();

// All Routes/Middlewares
require("./startup/routes")(app);

// Set a env to pass this error
require("./startup/config")();

// Node Server Connections
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Node Server is Running on PORT: ${port}...`)
);

module.exports = server;
