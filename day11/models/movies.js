module.exports  = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    director_id: DataTypes.INTEGER,
    main_genre: DataTypes.STRING,
    status: DataTypes.STRING,
    review: DataTypes.TEXT
  });
  

    return Movie
}