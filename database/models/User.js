const { DataTypes } = require('sequelize');
const generateModel = require('../libs/generate-model');

module.exports = generateModel({
  name: 'User',
  attributes: {
    name: {
      type: DataTypes.STRING
    }
  }
}, ({ User, Movie }) => {
  User.belongsToMany(Movie, { through: 'Users_Movies' });
});