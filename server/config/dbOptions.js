const path = require('path');

module.exports = {
  "config": path.join(__dirname, 'dbConfig.js'),
  "migrations-path": path.join(__dirname, "../db/migrations"),
  "models-path": path.join(__dirname, "../db/models")
};
