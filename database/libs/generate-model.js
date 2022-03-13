module.exports = ({ name, attributes, options }, associateCallback) => sequelize => {
  const result = sequelize.define(name, attributes, options);
  result.associate = associateCallback ? () => associateCallback(sequelize.models) : () => { };
  return result;
};