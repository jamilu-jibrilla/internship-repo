module.exports = (sequelize, DataTypes) => {
    const email = sequelize.define(
      "email",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        slug: DataTypes.STRING,
        subject: DataTypes.STRING,
        body: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive'],
            defaultValue: 'inactive'
        },
        created_at: DataTypes.DATEONLY,
        updated_at: DataTypes.DATE,
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "email",
      },
      {
        underscoredAll: false,
        underscored: false,
      }
    );
  
    return email;
  };