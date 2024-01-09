module.exports  = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    notes: DataTypes.TEXT,
    movie_id: DataTypes.INTEGER
  });

    return Review
}



