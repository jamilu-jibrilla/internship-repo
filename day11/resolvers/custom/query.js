const Sequelize = require('sequelize');
const sequelize = require('../../models/index').sequelize
const DataTypes = Sequelize.DataTypes;
let Genre = require('../../models/genre')(sequelize, DataTypes);
let Movie = require('../../models/movies')(sequelize, DataTypes);
let Actor = require('../../models/actors')(sequelize, DataTypes);
let Director = require('../../models/director')(sequelize, DataTypes);
let Review = require('../../models/review')(sequelize, DataTypes);
const {Op} = require('sequelize');


module.exports = {
  Query: {
    async movie(_, reviewCount ) {
      return await Movie.findAll();
    },
    async getMovieWithReview(_, { reviewCount }) {
      return await Movie.findAll({
        where: {
          review: {
            [Op.gt]: reviewCount
          }
        }
      });
    },
    async Review() {
      return await Review.findAll();
    },
    async Genre() {
      return await Genre.findAll();
    },
    async Actor() {
      return await Actor.findAll();
    },
    async Director() {
      return await Director.findAll();
    },    
  },

  Mutation: {
    async createActor(_, { actorId, name, genre }) {
      const g = await Genre.findOne({ where: { name: genre } });
      const movies = await Movie.findAll();
      for (let movie of movies) {
        await Movie.create({ movie_id: movie.id, name: name, actor_id: actorId });
      }
      return movies;
    }
  },
};
