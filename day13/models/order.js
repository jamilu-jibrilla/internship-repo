module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define(
      "order",
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        product_id: DataTypes.INTEGER,
        total: DataTypes.DECIMAL,
        stripe_id: DataTypes.STRING,
        status: DataTypes.ENUM('paid', 'failed')
        }
    );
  
    return order;
  };