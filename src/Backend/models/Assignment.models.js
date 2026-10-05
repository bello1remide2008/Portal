module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Assignment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE
  });
};
