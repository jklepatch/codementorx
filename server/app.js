const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { validate, errorHandler } = require('./middlewares');

const app = express();
app.use(bodyParser.json());
app.use(validate)
app.use(routes);
app.use(errorHandler);

module.exports = app;
