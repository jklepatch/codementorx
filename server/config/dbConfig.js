const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../db.development.sqlite'),
    operatorsAliases: false
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    operatorsAliases: false
  },
  production: {
    dialect: 'sqlite',
    storage: ':memory', 
    operatorsAliases: false
  }
};
