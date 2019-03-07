const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: Sequelize.STRING, unique: true, allowNull: false},
    name: { type: Sequelize.STRING, allowNull: false},
    password: { type: Sequelize.STRING, allowNull: false},
  });
  User.associate = models => {
    User.hasMany(models.Idea);
  };
  return User;
};
