module.exports  = (sequelize, DataTypes) => {
  const MovieActor = sequelize.define('MovieActor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    actor_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  });
  
    return MovieActor
}

