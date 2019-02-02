'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: DataTypes.STRING
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Address;
};