module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    "products",
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.FLOAT
      }
  );

  return products;
};