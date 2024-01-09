module.exports = (sequelize, DataTypes) => {
    const email_queue = sequelize.define(
      "email_queue",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        status: {
            type: DataTypes.ENUM,
            values: ['sent', 'not sent'],
            defaultValue: 'not sent'
        },
        created_at: DataTypes.DATEONLY,
        updated_at: DataTypes.DATE,
        send_at: DataTypes.DATE,
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "email_queue",
      },
      {
        underscoredAll: false,
        underscored: false,
      }
    );
  
    return email_queue;
  };