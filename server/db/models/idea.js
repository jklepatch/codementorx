'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    content: DataTypes.STRING,
    impact: DataTypes.INTEGER,
    ease: DataTypes.INTEGER,
    confidence: DataTypes.INTEGER
  }, {});
  Idea.associate = models => {
    Idea.belongsTo(models.User);
  };
  return Idea;
};
