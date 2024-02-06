'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      field: 'firstName', // Specify the database column name
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'lastName', // Specify the database column name
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {
      type:DataTypes.DATE,
      field: 'createdAt', // Specify the database column name
    },
    updatedAt:  {
      type: DataTypes.DATE,
      field: 'updatedAt', // Specify the database column name
    },  
  }, {
    sequelize,
    modelName: 'User',
    tableName:'Users'
  });
  return User;
};