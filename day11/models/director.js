module.exports  = (sequelize, DataTypes) => {
  const Director = sequelize.define('Director', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
  
    return Director
}


