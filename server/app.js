const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { validate, errorHandler } = require('./middlewares');
const path = require('path');

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(validate)
app.use(routes);
app.use(errorHandler);

module.exports = app;
