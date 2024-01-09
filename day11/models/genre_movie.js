module.exports  = (sequelize, DataTypes) => {
  const GenreMovie = sequelize.define('GenreMovie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movie_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  });
    return GenreMovie
}






