module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      wallet_id: DataTypes.INTEGER,

    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "user",
    }
  );

  return user;
};