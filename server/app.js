const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { validate, errorHandler } = require('./middlewares');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(validate)
app.use(routes);
app.use(express.static('public'));
app.use(errorHandler);

module.exports = app;
