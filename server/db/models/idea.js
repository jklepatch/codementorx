module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id'
    },
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
