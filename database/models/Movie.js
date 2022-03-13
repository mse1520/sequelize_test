const { DataTypes } = require('sequelize');
const generateModel = require('../libs/generate-model');

module.exports = generateModel({
  name: 'Movie',
  attributes: {
    name: {
      type: DataTypes.STRING
    }
  }
}, ({ User, Movie }) => {
  Movie.belongsToMany(User, { through: 'Users_Movies' });
});