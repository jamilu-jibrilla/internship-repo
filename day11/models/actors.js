module.exports  = (sequelize, DataTypes) => {
  const Actor = sequelize.define('actor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });

    return Actor
}


