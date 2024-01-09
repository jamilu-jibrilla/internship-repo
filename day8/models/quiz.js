module.exports = (sequelize, DataTypes) => {
    const quiz = sequelize.define("quiz", 
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        answers: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        correct_answer: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quiz',
      }
    )

    return quiz
}