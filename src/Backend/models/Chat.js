module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Chat", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  });
};
