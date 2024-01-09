// - id
// - email
// - name
// - status ENUM(active, inactive) (integer mapping)

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "user",
      },
      {
        underscoredAll: false,
        underscored: false,
      }
    );
  
    return user;
  };