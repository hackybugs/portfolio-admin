'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Module extends Model {
    static associate(models) {
      // Define associations
      Module.belongsToMany(models.User, { through: 'UserPermission',foreignKey:'module_id' });
    }
  }

  Module.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt', // Specify the database column name
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt', // Specify the database column name
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules'
  });

  return Module;
};
